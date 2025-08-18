import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Pedido } from '../types/Pedido'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config'

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
    
  return (
    <View>
      <Text>CozinhaScreen</Text>
    </View>
  )
}

export default CozinhaScreen

const styles = StyleSheet.create({})