import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert, Button, Pressable } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { logout, selectCurrentUser } from "../features/auth/authSlice";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/core";
import StudyCard from "../components/StudyCard";

export default function CharacterSelectScreen({ navigation }) {
	const studies = [
		{ id: 1, data: { name: "Study 1" } },
		{ id: 2, data: { name: "Study 2" } },
	];

	const dispatch = useAppDispatch();

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Button
					color='black'
					title='Sign Out'
					onPress={() => {
						dispatch(logout());
					}}
				/>
			),
		});
	}, [navigation]);

	const handleAddStudy = () => {
		Alert.alert("Does nothing for now");
		// navigation.navigate("CharacterCreation");
	};

	const handleSelectStudy = () => {
		navigation.navigate("Home");
	};

	const handleDeleteStudy = () => {
		Alert.alert("Does nothing for now");
	};

	const renderItem = ({ item, index }) => {
		return (
			<StudyCard
				key={item.id}
				index={index}
				name={item.data.name}
				select={handleSelectStudy}
				delete={handleDeleteStudy}
			/>
		);
	};

	return (
		<View style={styles.main}>
			{/* <ScrollView
				style={{ width: "100%", backgroundColor: "#404040" }}
				contentContainerStyle={styles.container}
				showsVerticalScrollIndicator={false}>
				{characters.map((character, index) => {
					return (
						<CharacterCard
							key={character.id}
							index={index}
							name={character.data().name}
							select={selectCharacter}
						/>
					);
				})}
			</ScrollView> */}
			<FlatList
				ItemSeparatorComponent={Platform.OS !== "android" && (() => <View style={[styles.separator]} />)}
				style={{ width: "100%" }}
				// contentContainerStyle={styles.container}
				showsVerticalScrollIndicator={false}
				data={studies}
				renderItem={renderItem}
			/>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						handleAddStudy();
					}}>
					<Text style={[{ color: "white", fontSize: 18 }]}>Join Study</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		// backgroundColor: "#404040",
		width: "100%",
		height: "100%",
		alignItems: "center",
	},
	buttonContainer: {
		width: "100%",
		height: 110,
		alignItems: "center",
		borderTopColor: "#666",
		borderTopWidth: 1,
	},
	button: {
		justifyContent: "center",
		alignItems: "center",
		width: "90%",
		height: 60,
		backgroundColor: "#33BBFF",
		margin: 10,
		borderRadius: 4,
	},
	separator: {
		borderBottomColor: "#666",
		borderBottomWidth: 1,
	},
});
