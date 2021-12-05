import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useAppDispatch } from "../hooks/store";
import { logout } from "../features/auth/authSlice";

export default function home() {
	const dispatch = useAppDispatch();

	return (
		<View style={styles.container}>
			<Text>You are logged In</Text>
			<Button
				title='Log Out'
				onPress={() => {
					dispatch(logout());
				}}
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
});
