import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAppDispatch, useAppSelector } from "./hooks/store";
import { selectCurrentUser } from "./features/auth/authSlice";

import { store } from "./app/store";
import Home from "./screens/Home";
import Landing from "./screens/Landing";
import Waiting from "./screens/Waiting";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Prompt from "./screens/Prompt";
import Backstory from "./screens/Backstory";
import Capture from "./screens/Capture";

const Stack = createNativeStackNavigator();
const PromptTabs = createBottomTabNavigator();

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
					<>
						<Stack.Screen name='Home' component={Home} />
						<Stack.Screen name='PromptTabs' component={PromptTabScreens} />
					</>
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

function PromptTabScreens({ route, navigation }) {
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: route.params.title,
		});
	}, [navigation]);
	return (
		<PromptTabs.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<PromptTabs.Screen name='Prompt' component={Prompt} />
			<PromptTabs.Screen name='Story' component={Backstory} />
			<PromptTabs.Screen name='Capture' component={Capture} />
		</PromptTabs.Navigator>
	);
}
