import React, { useState, useEffect } from 'react'
import { View, FlatList, Alert } from 'react-native'
import { Card, Text, Button, Chip } from 'react-native-paper'
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore'
import { db, auth } from '../firebase/config'
import { Pedido } from '../types/Pedido'

const CozinhaScreen = () => {

 const [pedidos, setPedidos] = useState<Pedido[]>([])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'pedidos'), snap => {
      const lista: Pedido[] = []
      snap.forEach(d => {
        const data = d.data() as any
        lista.push({
          id: d.id,
          mesa: data.mesa,
          itens: data.itens,
          observacoes: data.observacoes || '',
          criadoEm: data.criadoEm,
          uid: data.uid,
          status: data.status || 'solicitado'
        })
      })
      setPedidos(lista)
    })
    return () => unsub()
  }, [])

  const changeStatus = (p: Pedido) => {
    if (!p.id) return

    let next: Pedido['status']
    let label: string
    if (p.status === 'solicitado') {
      next = 'preparando'
      label = 'Iniciar Preparo'
    } else if (p.status === 'preparando') {
      next = 'preparado'
      label = 'Marcar Preparado'
    } else {
      return
    }

    Alert.alert(label, `Confirma "${label.toLowerCase()}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: label.includes('Iniciar') ? 'Iniciar' : 'Preparado',
        onPress: async () => {
          try {
            await updateDoc(
              doc(db, 'pedidos', p.id!),
              { status: next }
            )
          } catch {
            Alert.alert('Erro', 'Não foi possível atualizar')
          }
        }
      }
    ])
  }

  const renderItem = ({ item }: { item: Pedido }) => (
    <Card
      style={{
        margin: 8,
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
        {item.observacoes ? <Text>Obs: {item.observacoes}</Text> : null}
      </Card.Content>
      <Card.Actions>
        {(item.status === 'solicitado' || item.status === 'preparando') && (
          <Button onPress={() => changeStatus(item)}>
            {item.status === 'solicitado' ? 'Iniciar Preparo' : 'Marcar Preparado'}
          </Button>
        )}
      </Card.Actions>
    </Card>
  )

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16
        }}
      >
        <Text variant='titleLarge'>Cozinha</Text>
        <Button mode="outlined" onPress={() => auth.signOut()}>
          Sair
        </Button>
      </View>
      <FlatList
        data={pedidos}
        keyExtractor={i => i.id!}
        renderItem={renderItem}
      />
    </View>
  )
}

export default CozinhaScreen