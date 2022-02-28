import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert, Button, Pressable } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { logout, selectCurrentUser } from "../features/auth/authSlice";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/core";
import StudyCard from "../components/StudyCard";
import { useStudiesQuery } from "../app/services/engage";

export default function CharacterSelectScreen({ navigation }) {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectCurrentUser);
	const { data = [], isFetching } = useStudiesQuery(user.id);

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

	// You can move these function inside renderItem too remove the need for functions in the StudyCard.
	// All information exists within this class so there is no need to require the StudyCard to have anything other than the function to call itself.
	const handleSelectStudy = (id) => {
		navigation.navigate("Home", { id });
	};

	const handleDeleteStudy = () => {
		Alert.alert("Does nothing for now");
	};

	const renderItem = ({ item, index }) => {
		return (
			<StudyCard
				key={item.id}
				id={item.id}
				index={index}
				name={item.title}
				select={handleSelectStudy}
				delete={handleDeleteStudy}
			/>
		);
	};

	// if(isFetching){ return;} return early instead of ternary opperator

	return (
		<>
			{isFetching ? (
				<View style={styles.main}>
					<Text>Is loading</Text>
				</View>
			) : (
				<View style={styles.main}>
					<FlatList
						ItemSeparatorComponent={
							Platform.OS !== "android" && (() => <View style={[styles.separator]} />)
						}
						style={{ width: "100%" }}
						// contentContainerStyle={styles.container}
						showsVerticalScrollIndicator={false}
						data={data as any}
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
			)}
		</>
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
