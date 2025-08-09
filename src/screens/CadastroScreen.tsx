import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import React from 'react'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import { db, auth } from '../firebase/config'
import { createUserWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types'

const CadastroScreen = () => {

    const [role, setRole] = useState<'garcom' | 'cozinha'>("garcom")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const handleCadastro = async () => {
        if (senha !== confirmarSenha) {
            alert("As senhas não conferem!")
            return
        }

        try {
            console.log("cadastrando...")
            console.log(email, senha, auth)
            const usuarioCriado = await createUserWithEmailAndPassword(auth, email, senha)

            console.log("cadastrado?...")

            await setDoc(doc(db, "users", usuarioCriado.user.uid), {
                email,
                role,
                createdAt: serverTimestamp()
            })

            alert("Cadastro realizado com sucesso! Por favor, faça login.")

            await firebaseSignOut(auth)
        } catch {
            alert("Erro ao cadastar. Verifique os dados.")
        }
    }

  return (
    <View style={{ padding: 20, marginTop: 50 }} >
      <Text variant="titleLarge">
        Cadastro de usuário
      </Text>
      <Text style={{ marginTop: 16, fontSize: 14 }}>Você é:</Text>
      <Picker
        selectedValue={role}
        onValueChange={v => setRole(v as any)}
        style={{ marginBottom: 20 }}
      >
        <Picker.Item label="Garçom" value="garcom"></Picker.Item>
        <Picker.Item label="Cozinha" value="cozinha"></Picker.Item>
      </Picker>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ marginBottom: 10 }}
      />

     <TextInput
       label="Senha"
       value={senha}
       onChangeText={setSenha}
       secureTextEntry
       style={{ marginBottom: 10 }}
     />

     <TextInput
       label="Confirmar Senha"
       value={confirmarSenha}
       onChangeText={setConfirmarSenha}
       secureTextEntry
       style={{ marginBottom: 20 }}
     />

    <Button mode="contained" onPress={handleCadastro}>
        Cadastrar
    </Button>

    <Button style={{ marginTop: 10 }} onPress={() => navigation.navigate('Login')}>
      Já tem uma conta? Fazer login
    </Button>

    </View>
  )
}

export default CadastroScreen

const styles = StyleSheet.create({})