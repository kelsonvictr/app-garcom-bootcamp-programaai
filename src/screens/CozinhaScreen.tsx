import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Pedido } from '../types/Pedido'
import { collection, onSnapshot } from 'firebase/firestore'
import { db, auth } from '../firebase/config'
import { Button, Card, Chip, Text } from 'react-native-paper'

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

  const renderItem = ( { item }: { item: Pedido }) => (
    <Card
      style={{
        margin: 8,
        opacity: item.status === 'entregue' ? 0.5 : 1
      }}
      >
        <Card.Title
          title={`Mesa ${item.mesa}`}
          right={() => (
            <Chip style={{ marginRight: 8 }} >
              {item.status.toUpperCase()}
            </Chip>
          )}
        />
        <Card.Content>
          { item.observacoes ? <Text> {item.observacoes} </Text> : null }
        </Card.Content>
        <Card.Actions>
          {(item.status === 'solicitado' || item.status === 'preparando' ) && (
            <Button>
              { item.status === 'solicitado' ? 'Iniciar Preparo' : 'Marcar Preparado' }
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
        <Text variant="titleLarge">Cozinha</Text>
        <Button mode="outlined" onPress={() => { auth.signOut() }}>
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

const styles = StyleSheet.create({})