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
import Login from "./screens/Login";
import Register from "./screens/Register";
import CameraScreen from "./screens/CameraScreen";
import Caption from "./screens/Caption";
import Prompt from "./screens/Prompt";
import Studies from "./screens/Studies";
import AddStudies from "./screens/AddStudies";

const Stack = createNativeStackNavigator();
const PromptStack = createNativeStackNavigator();

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
			<Stack.Navigator screenOptions={{ headerTintColor: "black" }}>
				{user ? (
					<>
						<Stack.Screen name='Studies' component={Studies} />
						<Stack.Screen
							name='AddStudies'
							component={AddStudies}
							options={{ presentation: "modal", title: "Join Study" }}
						/>
						<Stack.Screen name='Home' component={Home} />
						<Stack.Screen name='PromptTabs' component={PromptTabScreens} />
					</>
				) : (
					<>
						<Stack.Screen name='Landing' component={Landing} options={{ headerShown: false }} />
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
		<PromptStack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<PromptStack.Screen name='Select' component={Prompt} initialParams={{ blockId: route.params.blockId }} />
			<PromptStack.Screen name='Camera' component={CameraScreen} />
			<PromptStack.Screen name='Submit' component={Caption} initialParams={{ blockId: route.params.blockId }} />
		</PromptStack.Navigator>
	);
}
