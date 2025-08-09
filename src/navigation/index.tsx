import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "./types";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import CadastroScreen from "../screens/CadastroScreen";

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppRoutes() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
                <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Cadastro' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}