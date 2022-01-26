import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as PhotoPicker from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import CameraScreen from "./CameraScreen";
import Caption from "./Caption";

const cameraStack = createNativeStackNavigator();

export default function Capture() {
	return (
		<cameraStack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<cameraStack.Screen name='Select' component={CaptureScreen} />
			<cameraStack.Screen name='Camera' component={CameraScreen} />
			<cameraStack.Screen name='Submit' component={Caption} />
		</cameraStack.Navigator>
	);
}

export function CaptureScreen({ navigation }) {
	const [image, setImage] = useState(null);

	useEffect(() => {
		(async () => {
			if (Platform.OS !== "web") {
				const { status: statusPicker } = await PhotoPicker.requestMediaLibraryPermissionsAsync();
				if (statusPicker !== "granted") {
					alert("Sorry, we need camera roll permissions to make this work!");
				}
			}
		})();
	}, []);

	const pickImage = async () => {
		let result = await PhotoPicker.launchImageLibraryAsync({
			mediaTypes: PhotoPicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			base64: true
		});
		if (!result.cancelled) {
			setImage((result as ImageInfo).uri);		
			const photo = result as ImageInfo;
			navigation.navigate("Submit", { uri: photo.uri, width: photo.width, height: photo.height, type: photo.type, name: photo.uri.substring(photo.uri.lastIndexOf('/') + 1, photo.uri.length) });
		}
	};
	return (
		<View style={[styles.center, styles.container]}>
			<Text style={[styles.text]}>Submit a response:</Text>
			<Pressable
				style={styles.button}
				onPress={() => {
					pickImage();
				}}>
				<Text style={[styles.text, { color: "white" }]}>Select Photo</Text>
			</Pressable>
			<Pressable
				style={styles.button}
				onPress={() => {
					navigation.navigate("Camera");
				}}>
				<Text style={[styles.text, { color: "white" }]}>Take Photo</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	center: {
		justifyContent: "center",
		alignItems: "center",
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
	text: {
		fontSize: 18,
	},
});
