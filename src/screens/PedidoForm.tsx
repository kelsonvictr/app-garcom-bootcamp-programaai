import { Alert, StyleSheet, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../navigation/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button, Text, TextInput } from 'react-native-paper'
import { AuthContext } from '../contexts/AuthContext'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

type FormRouteProp = RouteProp<RootStackParamList, 'NovoPedido'>
type FormNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NovoPedido'>

const PedidoForm = () => {

    const route = useRoute<FormRouteProp>()
    const { pedido } = route.params || {} 

    const [mesa, setMesa] = useState(pedido?.mesa ?? "")
    const [itens, setItens] = useState(pedido?.itens ?? "")
    const [observacoes, setObservacoes] = useState(pedido?.observacoes ?? "")

    
    const navigation = useNavigation<FormNavigationProp>()

    const { user } = useContext(AuthContext)

    const handleEnviar = async () => {
        if (!user) return
        if (!mesa || !itens) {
            Alert.alert('Atenção', 'Mesa e itens são obrigatórios')
            return
        }

        try {
            if (pedido?.id) {
              //Se existe pedido (id), significa edição!
              await updateDoc(doc(db, 'pedidos', pedido.id), {
                mesa,
                itens,
                observacoes
              })
              Alert.alert('Sucesso', 'Pedido atualizado com sucesso')
            } else {
              //Se não, é porque quer criar um novo pedido!
              await addDoc(collection(db, 'pedidos'), {
                mesa,
                itens,
                observacoes,
                criadoEm: serverTimestamp(),
                uid: user.uid,
                status: 'solicitado'
            })
            Alert.alert('Sucesso', 'Pedido solicitado com sucesso!')
            }          
            
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
      <Text variant="titleLarge">{pedido?.id ? 'Editar Pedido' : 'Novo Pedido'}</Text>
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
        {pedido?.id ? 'Salvar Alterações' : 'Solicitar Pedido'}
      </Button>
    </View>
  )
}

export default PedidoForm

const styles = StyleSheet.create({})