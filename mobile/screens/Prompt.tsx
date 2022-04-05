import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	Dimensions,
	ScrollView,
	Pressable,
	Platform,
	Image,
} from "react-native";
import * as PhotoPicker from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import { useHeaderHeight } from "@react-navigation/elements";
import { usePromptAndSlidesQuery } from "../app/services/engage";
import Slide from "../components/slides/Slide";
const img = require("../assets/landscape.jpg");
const imgURI = Image.resolveAssetSource(img).uri;

export default function Prompt({ route, navigation }) {
	const [image, setImage] = useState(null);
	// Destructuring here
	const blockId = route.params.blockId;
	const { data = [], isFetching } = usePromptAndSlidesQuery(blockId);

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
			// aspect: [4, 3],
			quality: 1,
			base64: true,
		});

		if (!result.cancelled) {
			setImage((result as ImageInfo).uri);
			const photo = result as ImageInfo;
			// console.log(photo);
			const base64 = `data:image/jpg;base64,${photo.base64}`;
			navigation.navigate("Submit", { photo });
		}
	};

	const captureImage = async () => {
		let result = await PhotoPicker.launchCameraAsync({
			mediaTypes: PhotoPicker.MediaTypeOptions.All,
			allowsEditing: true,
			// aspect: [4, 3],
			quality: 1,
			base64: true,
		});

		if (!result.cancelled) {
			setImage((result as ImageInfo).uri);
			const photo = result as ImageInfo;
			// console.log(photo);
			const base64 = `data:image/jpg;base64,${photo.base64}`;
			navigation.navigate("Submit", { photo });
		}
	};

	return (
		<View style={[{ height: Dimensions.get("screen").height - help }]}>
			<ScrollView
				horizontal
				alwaysBounceHorizontal={false}
				pagingEnabled={true}
				showsHorizontalScrollIndicator={false}>
				{(data as any[]).map((slide) => {
					if (slide.id !== -1)
						return (
							<Slide
								key={slide.id}
								slideId={slide.id}
								slideType={slide.option}
								title={slide.title}
								text={slide.backgroundText}
							/>
						);
				})}
				<View style={[styles.center, styles.container]}>
					<Text style={[styles.text3]}>
						{data[(data as any[]).length - 1]
							? data[(data as any[]).length - 1].backgroundText
							: "Submit a response"}
					</Text>
					<Pressable
						style={({ pressed }) => [{ backgroundColor: pressed ? "#1199DD" : "#33BBFF" }, styles.button]}
						onPress={() => {
							pickImage();
						}}>
						<Text style={[styles.text, { color: "white" }]}>Select Photo</Text>
					</Pressable>
					<Pressable
						style={({ pressed }) => [{ backgroundColor: pressed ? "#1199DD" : "#33BBFF" }, styles.button]}
						onPress={() => {
							captureImage();
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
		// backgroundColor: "#33BBFF",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
	},
});
