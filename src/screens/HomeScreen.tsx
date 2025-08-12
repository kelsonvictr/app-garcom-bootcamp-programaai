import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types'
import { useNavigation } from '@react-navigation/native'
import { Button, Text } from 'react-native-paper'
import { auth } from '../firebase/config'
import PedidoList from '../components/PedidoList'

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

const HomeScreen = () => {

    const navigation = useNavigation<HomeScreenNavigationProp>()

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 20, alignItems: 'center' }}>
              {/* Logo do app */}
              <Image
                source={require("../../assets/logo.png")}
                style={{ width: 100, height: 100, marginBottom: 10 }}
                resizeMode="contain"
              />

              <Text variant="titleLarge">Meus Pedidos</Text>

              <Button
                mode="outlined"
                style={{ width: '100%', marginTop: 10 }}
                onPress={() => navigation.navigate('NovoPedido', {})}
              >
                Novo Pedido
              </Button>

              <Button
                mode="outlined"
                onPress={() => auth.signOut()}
                style={{ width: '100%', marginTop: 10 }}
              >
                Sair
              </Button>

              <PedidoList />



      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})