import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable, Dimensions } from "react-native";
import { ImageResponse, useImageURIQuery } from "../app/services/engage";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Block({ id, complete, title, image, navigation }) {
	const { data = { uri: "" }, isFetching } = useImageURIQuery(image);

	return (
		<>
			{complete ? (
				<View style={[styles.blockContainer, styles.up]}>
					<Pressable
						style={styles.center}
						onPress={() => {
							navigation.navigate("Prompt", { title, blockId: id });
						}}>
						{isFetching ? (
							<></>
						) : (
							<>
								<View style={[styles.center, styles.check]}>
									<Icon name='check' size={70} color={"#00e600"} />
								</View>
								<Image style={styles.image} source={{ uri: (data as ImageResponse).url }} />
							</>
						)}
						<View style={styles.textContainer}>
							<Text style={styles.text}>{title}</Text>
						</View>
					</Pressable>
				</View>
			) : (
				<View style={styles.blockContainer}>
					<Pressable
						style={styles.center}
						onPress={() => {
							navigation.navigate("Prompt", { title, blockId: id });
						}}>
						{isFetching ? (
							<></>
						) : (
							<>
								<View style={[styles.center, { opacity: 0 }]}>
									<Icon name='check' size={70} color={"#00e600"} />
								</View>

								<Image style={styles.image} source={{ uri: (data as ImageResponse).url }} />
							</>
						)}
						<View style={styles.textContainer}>
							<Text style={styles.text}>{title}</Text>
						</View>
					</Pressable>
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	blockContainer: {
		width: 155,
		height: 155,
		shadowRadius: 4,
		shadowOpacity: 0.45,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		margin: 10,
		marginTop: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: 125,
		height: 125,
		// borderWidth: 0.5,
		borderRadius: 10,
	},
	textContainer: {
		height: 20,
		width: 110,
		position: "relative",
		bottom: 25,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.7)",
		borderRadius: 5,
	},
	complete: {
		backgroundColor: "green",
		opacity: 0.5,
	},
	text: {
		color: "black",
	},
	center: {
		justifyContent: "center",
		alignItems: "center",
	},
	check: {
		position: "relative",
		top: 85,
		zIndex: 1,
	},
	up: {
		top: -35,
	},
});
