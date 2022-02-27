import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import CameraPreview from "../components/CameraPreview";
import { Camera } from "expo-camera";

const CameraScreen = (props) => {
	const [hasPermission, setHasPermission] = useState(null);
	const [camera, setCamera] = useState(null);
	const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
	const [previewVisible, setPreviewVisible] = useState(false);
	const [capturedImage, setCapturedImage] = useState(null);
	const [camType, setType] = useState(Camera.Constants.Type.back);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	const takePicture = async () => {
		// if(!camera) return
		const photo = await camera.takePictureAsync({ base64: true });
		// console.log(photo);
		// setStartCamera(false);
		setPreviewVisible(true);
		setCapturedImage(photo);
	};

	const savePhoto = () => {
		setPreviewVisible(false);
		//console.log("image", capturedImage);
		props.navigation.navigate("Submit", {
			photo: capturedImage,
		});
	};

	const retakePhoto = () => {
		setCapturedImage(null);
		setPreviewVisible(false);
	};
	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}
	return (
		<View style={styles.main}>
			{previewVisible && capturedImage ? (
				<CameraPreview photo={capturedImage} savePhoto={savePhoto} retakePhoto={retakePhoto} />
			) : (
				<Camera style={styles.camera} type={camType} flashMode={flashMode} ref={(r) => setCamera(r)}>
					<View style={styles.camCapBtnContainer}>
						<TouchableOpacity onPress={takePicture} style={styles.camCapBtn} />
					</View>
				</Camera>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	main: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	camera: {
		flex: 1,
		width: "100%",
	},
	camCapBtnContainer: {
		alignSelf: "center",
		flex: 1,
		alignItems: "center",
	},
	camCapBtn: {
		position: "absolute",
		width: 70,
		height: 70,
		bottom: 40,
		borderRadius: 50,
		backgroundColor: "#fff",
	},
});

export default CameraScreen;
