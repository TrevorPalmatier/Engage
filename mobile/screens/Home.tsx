import React, { useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, Platform, Image, Dimensions, ActivityIndicator } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { logout, selectCurrentUser } from "../features/auth/authSlice";
import Block from "../components/Block";
const img = require("../assets/landscape.jpg");
const imgURI = Image.resolveAssetSource(img).uri;

export default function home({ navigation }) {
	const [isLoading, setIsLoading] = useState(true);
	const user = useAppSelector(selectCurrentUser);
	const dispatch = useAppDispatch();

	const blocks = [
		{ title: "Landscapes", image: imgURI, key: 1 },
		{ title: "Landscapes", image: imgURI, key: 2 },
		{ title: "Landscapes", image: imgURI, key: 3 },
		{ title: "Landscapes", image: imgURI, key: 4 },
		{ title: "Landscapes", image: imgURI, key: 5 },
		{ title: "Landscapes", image: imgURI, key: 6 },
		{ title: "Landscapes", image: imgURI, key: 7 },
		{ title: "Landscapes", image: imgURI, key: 8 },
		{ title: "Landscapes", image: imgURI, key: 9 },
		{ title: "Landscapes", image: imgURI, key: 10 },
		{ title: "Landscapes", image: imgURI, key: 11 },
	];

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
		const image = item.image;
		return <Block title={title as String} image={image as String} navigation={navigation} />;
	};

	return (
		<View style={styles.container}>
			<FlatList
				// ItemSeparatorComponent={Platform.OS !== "android" && (() => <View style={[styles.separator]} />)}
				style={{ width: "100%" }}
				horizontal
				// pagingEnabled
				snapToInterval={145}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.listContainer}
				showsVerticalScrollIndicator={false}
				data={blocks}
				keyExtractor={(item) => item.key}
				renderItem={renderItem}></FlatList>
			<Text style={{ flex: 1, fontSize: 20 }}>
				Welcome {user.firstName} {user.lastName}
			</Text>
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
		paddingLeft: Dimensions.get("window").width / 2 - 72.5,
		paddingRight: Dimensions.get("window").width / 2 - 72.5,
		padding: 30,
	},
});
