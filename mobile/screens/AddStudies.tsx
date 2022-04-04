import { View, Text, StyleSheet, TextInput, Pressable, Alert, Button, Dimensions } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Progress from "react-native-progress";
import { useJoinStudyMutation } from "../app/services/engage";
import { useAppSelector } from "../hooks/store";
import { selectCurrentUser } from "../features/auth/authSlice";

export default function AddStudies({ navigation }) {
	const [code, setCode] = useState("");

	const user = useAppSelector(selectCurrentUser);
	const [joinStudy, { isLoading }] = useJoinStudyMutation();

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Icon name='chevron-left' size={16} />
					<Pressable
						style={{ paddingLeft: 10, paddingRight: 20 }}
						onPress={() => {
							navigation.pop();
						}}>
						<Text style={{ color: "black", fontSize: 18, fontWeight: "400" }}>Back</Text>
					</Pressable>
				</View>
			),
		});
	}, [navigation]);

	const handleSubmit = () => {
		joinStudy({ userid: user.id, studyCode: code })
			.unwrap()
			.then((res) => {
				if (res.studyid === null || res.studyname === null) {
					Alert.alert("Incorrect Study Code");
				} else {
					navigation.pop();
					navigation.navigate("Home", { id: res.studyid, name: res.studyname });
				}
			})
			.catch((err) => {
				console.log(err);
				Alert.alert("Error joining study");
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
			<View style={styles.container}>
				<View style={styles.inputContainer}>
					<Text style={{ fontSize: 18 }}>Study Code:</Text>
					<TextInput
						style={styles.input}
						placeholder='Study Code'
						placeholderTextColor='#a6a6a6'
						onChangeText={(text) => setCode(text)}
					/>
					<Pressable
						style={({ pressed }) => [{ backgroundColor: pressed ? "#1199DD" : "#33BBFF" }, styles.button]}
						// disabled={isLoading}
						onPress={() => {
							handleSubmit();
						}}>
						<Text style={styles.buttonText}>Join Study</Text>
					</Pressable>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
	input: {
		width: "80%",
		padding: 10,
		margin: 20,
		borderWidth: 1,
		borderColor: "black",
		color: "black",
	},
	inputContainer: {
		margin: 20,
		width: "80%",
		justifyContent: "center",
		alignItems: "center",
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
});
