import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, ScrollView, Pressable, Platform } from "react-native";
import * as PhotoPicker from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import { useHeaderHeight } from "@react-navigation/elements";

export default function Prompt({ route, navigation }) {
	const [image, setImage] = useState(null);

	const help = useHeaderHeight();

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
		});

		if (!result.cancelled) {
			setImage((result as ImageInfo).uri);
			const photo = result as ImageInfo;
			navigation.navigate("Submit", { uri: photo.uri, width: photo.width, height: photo.height });
		}
	};

	return (
		<View style={[styles.center, { height: Dimensions.get("screen").height - help }]}>
			<ScrollView
				horizontal
				alwaysBounceHorizontal={false}
				pagingEnabled={true}
				showsHorizontalScrollIndicator={false}>
				<ImageBackground style={[styles.background]} source={require("../assets/background.jpg")}>
					<View style={styles.textContainer}>
						<Text style={styles.text}>
							This is a Prompt. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi autem sint
							earum facilis unde aspernatur esse saepe, accusamus quidem iusto veniam neque, ipsa omnis?
							Dignissimos dolorum aliquid ex ratione consequatur?
						</Text>
					</View>
				</ImageBackground>
				<View style={[styles.center, styles.container]}>
					<Text style={styles.text2}>Some Details about the Prompt</Text>
					<Text style={styles.text2}>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta sit maxime cum quibusdam
						excepturi tenetur! Dolor, autem, ea necessitatibus perspiciatis obcaecati laboriosam, vitae
						soluta aperiam iusto et iure in illum.
					</Text>
				</View>
				<View style={[styles.center, styles.container]}>
					<Text style={[styles.text3]}>Submit a response:</Text>
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
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	center: {
		height: Dimensions.get("screen").height,
		width: Dimensions.get("screen").width,
		justifyContent: "center",
		alignItems: "center",
	},
	background: {
		// paddingTop: 75,
		width: Dimensions.get("screen").width,
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	textContainer: {
		padding: 10,
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(25,25,25,0.86)",
		borderRadius: 5,
	},
	text: {
		color: "white",
		fontSize: 20,
		textAlign: "center",
	},
	container: {
		padding: 15,
		flex: 1,
		// backgroundColor: "#101010",
	},
	text2: {
		// color: "white",
		fontSize: 18,
	},
	text3: {
		fontSize: 18,
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
});
