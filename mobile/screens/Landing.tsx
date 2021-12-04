import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Pressable } from "react-native";
import * as Linking from "expo-linking";
import axios from "axios";
import { useAppDispatch } from "../app/hooks";
import { setName, setToken } from "../features/user/userSlice";

export default function Landing({ navigation }) {
	const dispatch = useAppDispatch();

	const handleLogIn = () => {
		navigation.navigate("Home");
	};

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Philosophy App</Text>
			</View>
			<Pressable
				style={styles.button}
				onPress={() => {
					handleLogIn();
				}}>
				<Text style={{ color: "white" }}>Log In</Text>
			</Pressable>
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
	button: {
		height: 50,
		width: "60%",
		backgroundColor: "#33BBFF",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
	},
});
