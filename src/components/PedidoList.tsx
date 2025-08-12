import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Pedido } from '../types/Pedido'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types'
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase/config'
import { Card, Chip, Button as PaperButton } from 'react-native-paper'

const PedidoList = () => {

    const [pedidos, setPedidos] = useState<Pedido[]>([])
    const { user } = useContext(AuthContext)

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    useEffect(() => {
        if (!user) return
        const q = query(collection(db, 'pedidos'), where('uid', '==', user.uid))
        const unsub = onSnapshot(q, snap => {
            const lista: Pedido[] = []
            snap.forEach(d => {
                const data = d.data() as any
                lista.push({
                    id: d.id,
                    mesa: data.mesa,
                    itens: data.itens,
                    observacoes: data.observacoes || "",
                    criadoEm: data.criadoEm,
                    uid: data.uid,
                    status: data.status || "solicitado"
                })
            })
            setPedidos(lista)
        })
        return () => unsub()    

    }, [user])

  const handleDelete = (id?: string) => {
    if (!id) return
    Alert.alert('Excluir Pedido', 'Tem certeza?',[
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteDoc(doc(db, 'pedidos', id))
          } catch {
            Alert.alert('Erro', 'Não foi possível excluir')
          }
        }
      }
    ])

  }

  const renderItem = ({ item }: { item: Pedido }) => (
    <Card
      style={{
        marginVertical: 6,
        marginHorizontal: 10,
        opacity: item.status === 'entregue' ? 0.5 : 1
      }}
    >
      <Card.Title
        title={`Mesa ${item.mesa}`}
        right={() => (
          <Chip style={{ marginRight: 8 }}>
            {item.status.toUpperCase()}
          </Chip>
        )}
      />
      <Card.Content>
        <Text>Itens: {item.itens}</Text>
        {item.observacoes ? <Text>Obs: {item.observacoes}</Text> : null}
      </Card.Content>
      <Card.Actions>
        <PaperButton onPress={() => navigation.navigate('NovoPedido', { pedido: item })}>
          Editar
        </PaperButton>
        <PaperButton onPress={() => handleDelete(item.id)}>
          Excluir
        </PaperButton>
        {item.status === 'preparado' && (
          <PaperButton>
            Marcar Entregue
          </PaperButton>
        )}
      </Card.Actions>
    </Card>
  )

  return (
    <FlatList
      data={pedidos}
      keyExtractor={i => i.id!}
      renderItem={renderItem}
      style={{ width: '100%' }}
    />
  )
}

export default PedidoList

const styles = StyleSheet.create({})