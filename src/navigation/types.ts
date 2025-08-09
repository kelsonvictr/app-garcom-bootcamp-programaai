import { Pedido } from "../types/Pedido"

export type RootStackParamList = {
    Login: undefined
    Cadastro: undefined
    Home: undefined
    NovoPedido: { pedido?: Pedido }
} 