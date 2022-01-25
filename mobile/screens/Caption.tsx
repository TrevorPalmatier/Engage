import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Pressable, Dimensions, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { uploadImage } from "../app/services/images";

export default function Caption({ route, navigation }) {
	const [description, setDescription] = useState("");

	const aspectRatio = route.params.height / route.params.width;
	const maxWidth = Dimensions.get("window").width * 0.9;
	const imgUri = route.params.uri;
	const imgName = route.params.name;
	const imgType = route.params.type;
	const imgWidth = Math.min(route.params.width, maxWidth);
	const imgHeight = Math.min(route.params.height, maxWidth * aspectRatio);


	const [error, setError] = useState("");
	const [photo, setPhoto] = useState(null);

 	const uploadImage = (photo) => {
			const data = new FormData();
			data.append("file", photo);
			data.append("upload_preset", "engageapp");
			data.append('cloud_name', 'engageapp');
			fetch("https://api.cloudinary.com/v1_1/engageapp/upload", {
				method: "POST",
				body: data
			}).then(res => res.json()).
			then(data => {
				setPhoto(data.secure_url)
		}).catch(err => {
			Alert.alert("An Error Occured While Uploading");
		})
	};

	const uploadPhoto = async () => {
		Alert.alert("Success", "Your entry was submited.");					
		const source = {uri: imgUri, type: imgType, name: imgName };
		uploadImage(source);
		navigation.navigate("Select");
	}


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
				<Image source={{ uri: route.params.uri }} style={[{ width: imgWidth, height: imgHeight }]} />
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
					<Pressable
						style={styles.button}
						onPress={uploadPhoto}>
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
