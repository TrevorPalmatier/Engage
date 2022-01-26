import React from "react";
import { View, Text, StyleSheet, Image, Pressable, Dimensions } from "react-native";

export default function Block({ title, image, navigation }) {
	return (
		<View style={styles.blockContainer}>
			<Pressable
				style={styles.center}
				onPress={() => {
					navigation.navigate("PromptTabs", { title: title });
				}}>
				<Image style={styles.image} source={{ uri: image }} />
				<View style={styles.textContainer}>
					<Text style={styles.text}>{title}</Text>
				</View>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	blockContainer: {
		width: 155,
		height: 155,
		shadowRadius: 4,
		shadowOpacity: 0.45,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		margin: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: 125,
		height: 125,
		// borderWidth: 0.5,
		borderRadius: 10,
	},
	textContainer: {
		height: 20,
		width: 110,
		position: "relative",
		bottom: 25,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.7)",
		borderRadius: 5,
	},
	text: {
		color: "black",
	},
	center: {
		justifyContent: "center",
		alignItems: "center",
	},
});
