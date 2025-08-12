import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { RootStackParamList } from "./types";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import CadastroScreen from "../screens/CadastroScreen";
import { AuthContext } from "../contexts/AuthContext";
import HomeScreen from "../screens/HomeScreen";
import PedidoForm from "../screens/PedidoForm";
import CozinhaScreen from "../screens/CozinhaScreen";

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppRoutes() {
    const { user, role } = useContext(AuthContext)

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!user ? (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
                        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Cadastro' }} />
                    </>
                ) : role === 'garcom' ? (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Meus Pedidos' }} />
                        <Stack.Screen name="NovoPedido" component={PedidoForm} options={{ title: 'Novo Pedido' }} />
                    </>
                ) : (
                    <Stack.Screen name="Cozinha" component={CozinhaScreen} options={{ title: 'Cozinha' }} />
                )

                }
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}