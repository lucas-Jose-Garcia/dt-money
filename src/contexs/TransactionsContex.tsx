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
    fetchTransaction: (query?: string) => Promise<void>
}

interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContex = createContext({} as TransactionsContexProps)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transactions[]>([])

    async function fetchTransaction(query?: string) {
        const url = new URL('http://localhost:3333/transactions?')

        if (query) {
            url.searchParams.append('q', query)
        }

        const response = await fetch(url)
        const data = await response.json();
        setTransactions(data)
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