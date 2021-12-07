import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from "react-native";

const CameraPreview = (props) => {
	return (
		<View style={styles.container}>
			<ImageBackground source={{ uri: props.photo && props.photo.uri }} style={styles.background}>
				<View style={styles.controlContainer}>
					<View style={styles.buttonContainer}>
						<TouchableOpacity onPress={props.retakePhoto} style={styles.button}>
							<Text style={styles.text}>Re-take</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={props.savePhoto} style={styles.button}>
							<Text style={styles.text}>Save Photo</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "transparent",
		flex: 1,
		width: "100%",
		height: "100%",
	},
	background: {
		flex: 1,
	},
	controlContainer: {
		flex: 1,
		flexDirection: "column",
		padding: 15,
		justifyContent: "flex-end",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	button: {
		width: 130,
		height: 40,
		alignItems: "center",
		borderRadius: 4,
	},
	text: {
		color: "#fff",
		fontSize: 20,
	},
});

export default CameraPreview;
