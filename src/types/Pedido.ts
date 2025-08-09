import { Timestamp } from "firebase/firestore"

export interface Pedido {
    id?: string
    mesa: string
    itens: string 
    observacoes: string
    criadoEm: Timestamp
    uid: string 
    status: 'solicitado' | 'preparando' | 'preparado' | 'entregue'
}