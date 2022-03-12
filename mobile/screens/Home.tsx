import React, { useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, Platform, Image, Dimensions, ActivityIndicator } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { logout, selectCurrentUser } from "../features/auth/authSlice";
import { useBlocksQuery } from "../app/services/engage";
import Block from "../components/Block";
import Slide from "../components/Slide";
const img = require("../assets/landscape.jpg");
const imgURI = Image.resolveAssetSource(img).uri;

export default function home({ route, navigation }) {
	const { id } = route.params;
	const dispatch = useAppDispatch();
	const { data = [], isFetching } = useBlocksQuery(id);

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
		});
	}, [navigation]);

	const renderItem = ({ item, index }) => {
		const title = item.title;
		const image = item.imageID;
		return <Block id={item.id} title={title as String} image={image as String} navigation={navigation} />;
	};

	return (
		<View style={styles.container}>
			<FlatList
				style={{ width: "100%" }}
				horizontal
				snapToInterval={175}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.listContainer}
				showsVerticalScrollIndicator={false}
				data={data as any}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
			/>
		</View>
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
});
