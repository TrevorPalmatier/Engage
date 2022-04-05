import { View, Text, StyleSheet, Dimensions, Image, ScrollView, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useSlideMediaQuery } from "../../app/services/engage";
import { useHeaderHeight } from "@react-navigation/elements";
import SlideType1 from "./SlideType1";
import SlideType2 from "./SlideType2";
import SlideType3 from "./SlideType3";

export default function Slide({ slideId, slideType, title, text }) {
	const { data = [], isFetching } = useSlideMediaQuery(slideId);
	const [media, setMedia] = useState(undefined);
	useEffect(() => {
		if (isFetching) return;
		setMedia(data as Array<any>);
	}, [data]);

	if (isFetching || media === undefined) {
		return null;
	}

	if (slideType === 1) {
		return (
			<View style={[styles.main]}>
				{/* <Button title='check' onPress={() => console.log(pid)} /> */}
				<SlideType1 title={title} text={text} media={media} />
				{/* <SlideVideo title={title} text={text} embed={pid} /> */}
			</View>
		);
	} else if (slideType === 2) {
		return (
			<View style={[styles.main]}>
				{/* <Button title='check' onPress={() => console.log(pid)} /> */}
				<SlideType2 title={title} text={text} media={media} />
				{/* <SlideVideo title={title} text={text} embed={pid} /> */}
			</View>
		);
	} else if (slideType === 3) {
		return (
			<View style={[styles.main]}>
				{/* <Button title='check' onPress={() => console.log(pid)} /> */}
				<SlideType3 title={title} text={text} media={media} />
				{/* <SlideVideo title={title} text={text} embed={pid} /> */}
			</View>
		);
	} else {
		return null;
	}
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
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
		// marginBottom: 80,
		padding: 10,
		width: "95%",
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
