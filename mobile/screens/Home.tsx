import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useAppDispatch } from "../app/hooks";
import { setName, setToken } from "../features/user/userSlice";

export default function home() {
	const dispatch = useAppDispatch();

	return (
		<View style={styles.container}>
			<Text>You are logged In</Text>
			<Button
				title='Log Out'
				onPress={() => {
					dispatch(setToken({ token: null }));
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
