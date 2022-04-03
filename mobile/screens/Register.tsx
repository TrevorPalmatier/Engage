import React, { useState } from "react";
import * as Progress from "react-native-progress";
import { TextInput, View, StyleSheet, Alert, Text, Pressable, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SignupRequest, useSignupMutation } from "../app/services/engage";

function Register({ navigation }) {
	const [loading, setLoading] = useState(true);
	// Use object for state. 3 or more is what feels right for that.
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
				// console.log(err);
				setError(err.data.message);
			});
	};

	return (
		<>
			{isLoading ? (
				<View style={styles.spinnerContainer}>
					<Progress.Circle
						style={styles.spinner}
						size={100}
						indeterminate={true}
						borderWidth={5}
						color={"#33BBFF"}
					/>
				</View>
			) : (
				<></>
			)}
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
						onChangeText={setEmail}
					/>
					<TextInput
						style={styles.input}
						placeholder='password'
						placeholderTextColor='#a6a6a6'
						secureTextEntry
						onChangeText={setPassword}
					/>
					<TextInput
						style={styles.input}
						placeholder='re-enter password'
						placeholderTextColor='#a6a6a6'
						secureTextEntry
						onChangeText={setRepassword}
					/>
					<View style={error ? styles.errorBox : styles.blank}>
						<Text style={styles.errorText}>{error}</Text>
					</View>
					<Pressable
						style={({ pressed }) => [{ backgroundColor: pressed ? "#1199DD" : "#33BBFF" }, styles.button]}
						onPress={onSignUp}>
						<Text style={{ color: "white" }}>Register</Text>
					</Pressable>
				</View>
			</KeyboardAwareScrollView>
		</>
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
		// backgroundColor: "#33BBFF",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
	},
	spinner: {
		position: "absolute",
		top: Dimensions.get("window").height / 2 - 180,
		left: Dimensions.get("window").width / 2 - 50,
		opacity: 1,
		zIndex: 3,
	},
	spinnerContainer: {
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
		backgroundColor: "grey",
		opacity: 0.4,
		zIndex: 2,
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
