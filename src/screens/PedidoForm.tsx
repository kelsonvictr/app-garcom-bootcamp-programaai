import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../navigation/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button, Text, TextInput } from 'react-native-paper'

type FormRouteProp = RouteProp<RootStackParamList, 'NovoPedido'>
type FormNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NovoPedido'>

const PedidoForm = () => {

    const [mesa, setMesa] = useState("")
    const [itens, setItens] = useState("")
    const [observacoes, setObservacoes] = useState("")

    const route = useRoute<FormRouteProp>()
    const navigation = useNavigation<FormNavigationProp>()

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

      <Button mode="contained">
        Solicitar Pedido
      </Button>
    </View>
  )
}

export default PedidoForm

const styles = StyleSheet.create({})