import {ReactNode, createContext, useEffect, useState} from 'react'
import { api } from '../lib/axios'

interface Transactions {
    id: number
    description: string
    type: "income" | "outcome"
    category: string
    price: number
    createAt: string
}

interface TransactionsContexProps {
    transactions: Transactions[]
    fetchTransaction: (query?: string) => Promise<void>
}

interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContex = createContext({} as TransactionsContexProps)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transactions[]>([])

    async function fetchTransaction(query?: string) {
        const response = await api.get('transactions', {
            params: {
                q: query
            }
        })

        setTransactions(response.data)
    }

    useEffect(() => {
        fetchTransaction()
    }, [])
    return (
        <TransactionsContex.Provider value={{ 
            transactions,
            fetchTransaction
            }}>
            {children}
        </TransactionsContex.Provider>
    )
}