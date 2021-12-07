import React from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions } from "react-native";

export default function Prompt({ route, navigation }) {
	return (
		<View style={styles.trueCenter}>
			<ImageBackground
				style={[styles.background, styles.trueCenter]}
				source={require("../assets/background.jpg")}>
				<View style={styles.textContainer}>
					<Text style={styles.text}>
						This is a Prompt. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi autem sint
						earum facilis unde aspernatur esse saepe, accusamus quidem iusto veniam neque, ipsa omnis?
						Dignissimos dolorum aliquid ex ratione consequatur?
					</Text>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	trueCenter: {
		justifyContent: "center",
		alignItems: "center",
	},
	background: {
		// paddingTop: 75,
		width: "100%",
		height: "100%",
		justifyContent: "space-between",
	},
	textContainer: {
		padding: 10,
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(25,25,25,0.86)",
		borderRadius: 5,
	},
	text: {
		color: "white",
		fontSize: 20,
		textAlign: "center",
	},
});
