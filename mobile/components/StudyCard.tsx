import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default function StudyCard(props) {
	const handleClick = () => {
		props.select(props.id, props.name);
	};

	return (
		<View style={styles.main}>
			<Pressable
				style={({ pressed }) => [
					styles.button,
					{
						backgroundColor: pressed ? "#ccc" : "#fff",
					},
				]}
				onPress={() => {
					handleClick();
				}}>
				<Text style={{ fontSize: 16 }}>{props.name}</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	main: {
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: 60,
	},
	button: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "100%",
	},
	leftAction: {
		flex: 1,
		backgroundColor: "cyan",
		justifyContent: "center",
	},
	actionText: {
		color: "black",
		fontSize: 16,
	},
});
