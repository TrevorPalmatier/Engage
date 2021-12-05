import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "./hooks/store";
import { selectCurrentUser } from "./features/auth/authSlice";

import { store } from "./app/store";
import Home from "./screens/Home";
import Landing from "./screens/Landing";
import Waiting from "./screens/Waiting";
import Login from "./screens/Login";
import Register from "./screens/Register";

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
	const user = useAppSelector(selectCurrentUser);

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{user ? (
					<Stack.Screen name='Home' component={Home} />
				) : (
					<>
						<Stack.Screen name='Landing' component={Landing} options={{ headerShown: false }} />
						<Stack.Screen name='Waiting' component={Waiting} />
						<Stack.Screen name='Login' component={Login} />
						<Stack.Screen name='Signup' component={Register} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
