import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { Button, Text, TextInput } from 'react-native-paper'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'

const LoginScreen = () => {

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>()

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha)
    } catch {
      alert('Erro ao fazer login')
    }
  }


  return (
    <View style={{ flex: 1, padding: 20, marginTop: 50, alignItems: 'center' }}>
      {/* Logo do app */}
      <Image
        source={require("../../assets/logo.png")}
        style={{ width: 120, height: 120, marginBottom: 20 }}
        resizeMode="contain"
      />

      <Text variant="titleLarge">Login do Garçom</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ width: '100%', marginBottom: 10 }}
      />

      <TextInput
        label="senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={{ width: '100%', marginBottom: 10 }}
      />

      <Button mode="contained" style={{ width: '100%' }} onPress={handleLogin}>
        Entrar
      </Button>

      <Button style={{ marginTop: 10 }} onPress={() => navigation.navigate('Cadastro')}>
        Criar nova conta
      </Button>


    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})