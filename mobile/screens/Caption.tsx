import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Pressable, Dimensions, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { EntryRequest, useSumbitEntryMutation } from "../app/services/engage";
import { selectCurrentUser } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks/store";
// import { uploadImage } from "../app/services/images";

export default function Caption({ route, navigation }) {
	const [description, setDescription] = useState("");
	const user = useAppSelector(selectCurrentUser);
	const [submitEntry, isLoading] = useSumbitEntryMutation();

	const aspectRatio = route.params.photo.height / route.params.photo.width;
	const maxWidth = Dimensions.get("window").width * 0.9;
	const imgUri = route.params.photo.uri;
	const imgWidth = Math.min(route.params.photo.width, maxWidth);
	const imgHeight = Math.min(route.params.photo.height, maxWidth * aspectRatio);

	const uploadImage = (photo) => {

		// data.append("cloud_name", "engageapp");
		fetch("https://ancient-ridge-25388.herokuapp.com/uploadimage", {
			method: "POST",
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({file: photo}),
		})
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				const payload = {
					userId: user.id,
					blockId: route.params.blockId,
					text: description,
					imageID: data.publicId,
				} as EntryRequest;
				submitEntry(payload)
					.then((res) => {
						Alert.alert("Success", "Your entry was submited.");
						navigation.navigate("Select");
					})
					.catch((err) => {
						console.log(err);
						Alert.alert("An Error Occured While Uploading");
					});
			})
			.catch((err) => {
				console.log(err);
				Alert.alert("An Error Occured While Uploading");
			});
	};

	const uploadPhoto = async () => {
		const source = `data:image/jpg;base64,${route.params.photo.base64}`;
		uploadImage(source);
	};

	return (
		<KeyboardAwareScrollView
			// keyboardDismissMode='on-drag'
			bounces={false}
			contentContainerStyle={styles.container}
			showsVerticalScrollIndicator={false}
			resetScrollToCoords={{ x: 0, y: 0 }}
			extraScrollHeight={20}>
			<View style={[styles.container]}>
				<Text style={[{ fontSize: 20, padding: 20, fontWeight: "600" }]}>Add A Description:</Text>
				<Image source={{ uri: imgUri }} style={[{ width: imgWidth, height: imgHeight }]} />
				<TextInput
					style={styles.input}
					placeholder='Description'
					placeholderTextColor='#a6a6a6'
					multiline={true}
					onChangeText={(description) => setDescription(description)}
				/>
				<View style={[styles.buttonContainer, styles.center]}>
					<Pressable
						style={styles.button}
						onPress={() => {
							navigation.navigate("Select");
						}}>
						<Text style={[styles.text, { color: "white" }]}>Cancel</Text>
					</Pressable>
					<Pressable style={styles.button} onPress={uploadPhoto}>
						<Text style={[styles.text, { color: "white" }]}>Submit</Text>
					</Pressable>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		alignItems: "center",
	},
	center: {
		justifyContent: "center",
		alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
	},
	button: {
		margin: 15,
		padding: 5,
		height: 50,
		width: "40%",
		backgroundColor: "#33BBFF",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
	},
	text: {
		fontSize: 18,
	},
	input: {
		width: "90%",
		padding: 10,
		margin: 10,
		height: 130,
		borderWidth: 1,
		borderColor: "black",
		color: "black",
	},
});
