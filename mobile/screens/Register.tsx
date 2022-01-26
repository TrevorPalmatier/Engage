import React, { useState } from "react";
import { TextInput, View, StyleSheet, Alert, Text, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SignupRequest, useSignupMutation } from "../app/services/auth";

function Register({ navigation }) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repassword, setRepassword] = useState("");
	const [signup, { isLoading }] = useSignupMutation();

	const onSignUp = () => {
		const payload = {
			email,
			password,
			repassword,
		} as SignupRequest;
		signup(payload)
			.unwrap()
			.then(() => {
				Alert.alert("Success", "User has been registered. Please Log-in.");
				navigation.replace("Login");
			})
			.catch((err) => {
				console.log(err);
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
					placeholder='email'
					placeholderTextColor='#a6a6a6'
					onChangeText={(email) => setEmail(email)}
				/>
				<TextInput
					style={styles.input}
					placeholder='password'
					placeholderTextColor='#a6a6a6'
					secureTextEntry={true}
					onChangeText={(pw) => setPassword(pw)}
				/>
				<TextInput
					style={styles.input}
					placeholder='re-enter password'
					placeholderTextColor='#a6a6a6'
					secureTextEntry={true}
					onChangeText={(pw) => setRepassword(pw)}
				/>
				<View style={error ? styles.errorBox : styles.blank}>
					<Text style={styles.errorText}>{error}</Text>
				</View>
				<Pressable
					style={styles.button}
					onPress={() => {
						onSignUp();
					}}>
					<Text style={{ color: "white" }}>Register</Text>
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

export default Register;
