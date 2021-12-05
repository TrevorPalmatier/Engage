import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function Landing({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Philosophy App</Text>
			</View>
			<View style={styles.buttonContainer}>
				<Pressable
					style={styles.button}
					onPress={() => {
						navigation.navigate("Signup");
					}}>
					<Text style={styles.buttonText}>Sign Up</Text>
				</Pressable>
				<Pressable
					style={styles.button}
					onPress={() => {
						navigation.navigate("Login");
					}}>
					<Text style={styles.buttonText}>Log In</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		// justifyContent: "center",
	},
	textInput: {
		borderColor: "black",
		borderWidth: 1,
		margin: 10,
		padding: 10,
		width: "60%",
	},
	titleContainer: {
		marginTop: 150,
		marginBottom: 250,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 35,
	},
	buttonContainer: {
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
	},
	button: {
		margin: 15,
		padding: 5,
		height: 50,
		width: "60%",
		backgroundColor: "#33BBFF",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
	},
});
