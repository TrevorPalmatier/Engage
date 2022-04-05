import { View, Text, ScrollView, StyleSheet, Dimensions, Image } from "react-native";
import React, { useState, useEffect } from "react";
import SlideMedia from "./SlideMedia";
import { useImageURIQuery } from "../../app/services/engage";
const img = require("../../assets/landscape.jpg");
const imgURI = Image.resolveAssetSource(img).uri;

export default function SlideType1({ media, title, text }) {
	const first = (text as string).slice(0, (text as string).indexOf(" ", (text as string).length / 2) + 1);
	const second = (text as string).slice(
		(text as string).indexOf(" ", (text as string).length / 2) + 1,
		(text as string).length
	);
	return (
		<ScrollView
			style={{ flex: 1 }}
			nestedScrollEnabled
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				alignItems: "center",
				flexGrow: 1,
				paddingBottom: 250,
			}}>
			<View style={[styles.titleContainer]}>
				<Text style={[styles.titleText]}>{title}</Text>
			</View>
			<View style={[{ width: "100%", alignItems: "center" }]}>
				<View style={{ flexDirection: "row", width: "95%" }}>
					{media[0] !== undefined ? (
						<SlideMedia type={media[0].type} pid={media[0].imageID} width={2} />
					) : (
						<></>
					)}
					<View style={[styles.textContainer]}>
						<Text style={[styles.text2]}>{first}</Text>
					</View>
				</View>
				<View style={{ flexDirection: "row", width: "95%" }}>
					<View style={[styles.textContainer]}>
						<Text style={[styles.text2]}>{second}</Text>
					</View>
					{media[1] !== undefined ? (
						<SlideMedia type={media[1].type} pid={media[1].imageID} width={2} />
					) : (
						<></>
					)}
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	main: {
		// flex: 1,
		height: Dimensions.get("screen").height,
		// height: 500,
		width: Dimensions.get("screen").width,
		// justifyContent: "center",
		alignItems: "center",
	},
	titleContainer: {
		paddingTop: 20,
	},
	titleText: {
		fontSize: 26,
	},
	background: {
		// paddingTop: 75,
		width: Dimensions.get("screen").width,
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	textContainer: {
		marginTop: 20,
		flexWrap: "wrap",
		// marginBottom: 80,
		padding: 10,
		width: "50%",
		justifyContent: "center",
		alignItems: "center",
		// backgroundColor: "rgba(25,25,25,0.86)",
		// borderRadius: 5,
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
