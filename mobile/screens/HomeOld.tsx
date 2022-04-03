import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, Platform, Image, Dimensions, ActivityIndicator } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { logout, selectCurrentUser } from "../features/auth/authSlice";
import { ArrayResponse, useBlocksQuery, useUserEntriesQuery } from "../app/services/engage";
import * as Progress from "react-native-progress";
import Block from "../components/Block";
import Slide from "../components/slides/Slide";
const img = require("../assets/landscape.jpg");
const imgURI = Image.resolveAssetSource(img).uri;

export default function home({ route, navigation }) {
	const [completed, setCompleted] = useState([]);
	const [working, setWorking] = useState(false);
	const user = useAppSelector(selectCurrentUser);
	const { id, name } = route.params;
	const dispatch = useAppDispatch();
	const { data: blocks = [], isFetching, refetch } = useBlocksQuery(id, { refetchOnFocus: true });
	const {
		data: entries = [],
		isFetching: isEntryFecthing,
		refetch: entityRefetch,
	} = useUserEntriesQuery(user.id, { refetchOnFocus: true });

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Button
					color='black'
					title='Sign Out'
					onPress={() => {
						dispatch(logout());
					}}
				/>
			),
			title: name,
		});
	}, [navigation]);

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			// The screen is focused
			// Call any action and update data
			entityRefetch();
		});

		// Return the function to unsubscribe from the event so it gets removed on unmount
		return unsubscribe;
	}, [navigation]);

	// This does not work at all. But you are getting closer
	useEffect(() => {
		setWorking(true);
		if (!isFetching && !isEntryFecthing) {
			// console.log("Blocks: ", blocks);
			// console.log("Entries", entries);
			let newArray = (blocks as Array<any>).map((block) => {
				for (let entry of entries as Array<any>) {
					if (entry.id === block.id) {
						return { ...block, hasSubmit: true };
					}
				}
				return { ...block, hasSubmit: false };
			});
			// console.log("New Array: ", newArray);
			setWorking(false);
			setCompleted(newArray);
			// console.log(completed);
		}
	}, [entries, blocks]);

	const renderItem = ({ item, index }) => {
		const title = item.title;
		const image = item.imageID;
		const completed = item.hasSubmit;
		return (
			<Block
				id={item.id}
				complete={completed as boolean}
				title={title as String}
				image={image as String}
				navigation={navigation}
			/>
		);
	};

	return (
		<>
			{isFetching || isEntryFecthing || working ? (
				<View style={styles.spinnerContainer}>
					<Progress.Circle
						style={styles.spinner}
						size={100}
						indeterminate={true}
						borderWidth={5}
						color={"#33BBFF"}
					/>
				</View>
			) : (
				<View style={styles.container}>
					<FlatList
						style={{ width: "100%" }}
						horizontal
						snapToInterval={175}
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.listContainer}
						showsVerticalScrollIndicator={false}
						data={completed}
						keyExtractor={(item) => item.id}
						renderItem={renderItem}
					/>
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	separator: {
		borderBottomColor: "#666",
		borderBottomWidth: 1,
	},
	listContainer: {
		paddingLeft: Dimensions.get("window").width / 2 - 87.5,
		paddingRight: Dimensions.get("window").width / 2 - 87.5,
		padding: 30,
	},
	spinner: {
		position: "absolute",
		top: Dimensions.get("window").height / 2 - 180,
		left: Dimensions.get("window").width / 2 - 50,
		opacity: 1,
		zIndex: 3,
	},
	spinnerContainer: {
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
		backgroundColor: "grey",
		opacity: 0.4,
		zIndex: 2,
	},
});
