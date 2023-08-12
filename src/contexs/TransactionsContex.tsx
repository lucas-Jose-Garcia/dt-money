import {ReactNode, createContext, useEffect, useState} from 'react'

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
}

interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContex = createContext({} as TransactionsContexProps)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transactions[]>([])

    async function loadTransaction() {
        const response = await fetch('http://localhost:3333/transactions')
        const data = await response.json();
        setTransactions(data)
    }

    useEffect(() => {
        loadTransaction()
    }, [])
    return (
        <TransactionsContex.Provider value={{ transactions }}>
            {children}
        </TransactionsContex.Provider>
    )
}