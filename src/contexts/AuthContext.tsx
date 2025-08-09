import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { auth, db } from '../firebase/config'
import { doc, getDoc } from "firebase/firestore";

interface AuthContextType {
    user: User | null
    role: 'garcom' | 'cozinha' | null
}

export const AuthContext = createContext<AuthContextType>({ user: null, role: null })

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [role, setRole] = useState<'garcom' | 'cozinha' | null>(null)

    useEffect(() => {
        // escuta mudanças no estado de autenticação do usuário
        // ou seja, fica de olho se faz login, logout, sessão expira
        const unsubscribe = onAuthStateChanged(auth, async u => {
            setUser(u)
            if (u) {
                // buscar o perfil do usuário
                const snap = await getDoc(doc(db, 'users', u.uid))
                setRole((snap.data()?.role as any) ?? null)
            } else {
                setRole(null)
            }
        })
        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ user, role }}>
            {children}
        </AuthContext.Provider>

    )
}