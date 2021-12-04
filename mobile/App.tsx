import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "./app/hooks";

import { store } from "./app/store";
import Home from "./screens/Home";
import Landing from "./screens/Landing";
import Waiting from "./screens/Waiting";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<Main />
			<StatusBar style='dark' />
		</Provider>
	);
}

function Main() {
	const token = useAppSelector((state) => state.user.token);
	return (
		<NavigationContainer>
			<Stack.Navigator>
				{token ? (
					<Stack.Screen name='Home' component={Home} />
				) : (
					<>
						<Stack.Screen name='Landing' component={Landing} options={{ headerShown: false }} />
						<Stack.Screen name='Home' component={Home} />
						<Stack.Screen name='Waiting' component={Waiting} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
