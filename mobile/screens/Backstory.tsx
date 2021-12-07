import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Backstory() {
	return (
		<View style={[styles.center, styles.container]}>
			<Text style={styles.text}>Some Details about the Prompt</Text>
			<Text style={styles.text}>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta sit maxime cum quibusdam excepturi
				tenetur! Dolor, autem, ea necessitatibus perspiciatis obcaecati laboriosam, vitae soluta aperiam iusto
				et iure in illum.
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	center: {
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		padding: 15,
		flex: 1,
		// backgroundColor: "#101010",
	},
	text: {
		// color: "white",
		fontSize: 18,
	},
});
