import React, { useState } from "react";
import { Pressable, TextInput, View, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useLoginMutation } from "../app/services/auth";
import type { LoginRequest } from "../app/services/auth";

function Login({ navigation }) {
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const [login, { isLoading }] = useLoginMutation();

	const handleLogin = () => {
		const payload = {
			email,
			password,
		} as LoginRequest;
		login(payload)
			.unwrap()
			.catch((err) => {
				// console.log(err);
				setError(err.data.message);
			});
	};

	return (
		<KeyboardAwareScrollView
			// keyboardDismissMode='on-drag'
			bounces={false}
			contentContainerStyle={styles.main}
			showsVerticalScrollIndicator={false}
			resetScrollToCoords={{ x: 0, y: 0 }}
			extraScrollHeight={20}>
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					keyboardType='email-address'
					placeholder='Email'
					placeholderTextColor='#a6a6a6'
					onChangeText={(email) => setEmail(email)}
				/>
				<TextInput
					style={styles.input}
					placeholder='Password'
					placeholderTextColor='#a6a6a6'
					secureTextEntry={true}
					onChangeText={(pw) => setPassword(pw)}
				/>
				<View style={error ? styles.errorBox : styles.blank}>
					<Text style={styles.errorText}>{error}</Text>
				</View>
				<Pressable
					style={styles.button}
					onPress={() => {
						handleLogin();
					}}>
					<Text style={styles.buttonText}>Log In</Text>
				</Pressable>
			</View>
		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	main: {
		width: "100%",
		alignItems: "center",
	},
	container: {
		width: "100%",
		paddingTop: 50,
		alignItems: "center",
	},
	input: {
		width: "80%",
		padding: 10,
		margin: 10,
		borderWidth: 1,
		borderColor: "black",
		color: "black",
	},
	buttonText: {
		color: "white",
		fontSize: 16,
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
	errorBox: {
		backgroundColor: "#FF8080",
		width: "80%",
		height: 70,
		justifyContent: "center",
		alignItems: "center",
		padding: 5,
	},
	errorText: {
		color: "white",
		fontSize: 15,
	},
	blank: {},
});

export default Login;