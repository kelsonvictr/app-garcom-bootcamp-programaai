import { Alert, StyleSheet, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../navigation/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button, Text, TextInput } from 'react-native-paper'
import { AuthContext } from '../contexts/AuthContext'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'

type FormRouteProp = RouteProp<RootStackParamList, 'NovoPedido'>
type FormNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NovoPedido'>

const PedidoForm = () => {

    const [mesa, setMesa] = useState("")
    const [itens, setItens] = useState("")
    const [observacoes, setObservacoes] = useState("")

    const route = useRoute<FormRouteProp>()
    const navigation = useNavigation<FormNavigationProp>()

    const { user } = useContext(AuthContext)

    const handleEnviar = async () => {
        if (!user) return
        if (!mesa || !itens) {
            Alert.alert('Atenção', 'Mesa e itens são obrigatórios')
            return
        }

        try {
            await addDoc(collection(db, 'pedidos'), {
                mesa,
                itens,
                observacoes,
                criadoEm: serverTimestamp(),
                uid: user.uid,
                status: 'solicitado'
            })
            Alert.alert('Sucesso', 'Pedido solicitado com sucesso!')
            navigation.goBack()
        } catch (error: any) {
          console.log("Erro ao cadastrar:", error)
          console.log("Código do erro:", error.code)
          console.log("Mensagem do erro:", error.message)
          Alert.alert('Erro', 'Não foi possível salvar o pedido')
        }
    }

  return (
    <View style={{ padding: 20 }}>
      <Text variant="titleLarge">Novo Pedido</Text>
      <TextInput
        label="Mesa"
        value={mesa}
        onChangeText={setMesa}
        style={{ marginBottom: 10 }}
      />

      <TextInput
        label="Itens do pedido"
        value={itens}
        onChangeText={setItens}
        style={{ marginBottom: 10 }}
      />

      <TextInput
        label="Observações"
        value={observacoes}
        onChangeText={setObservacoes}
        style={{ marginBottom: 10 }}
      />

      <Button mode="contained" onPress={handleEnviar}>
        Solicitar Pedido
      </Button>
    </View>
  )
}

export default PedidoForm

const styles = StyleSheet.create({})