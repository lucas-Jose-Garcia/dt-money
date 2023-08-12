import { useEffect, useState } from "react";
import { Header } from "../../componets/Header";
import { Summary } from "../../componets/Summary";
import { SearchForm } from "./SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";

interface transactionsProps {
    id: number
    description: string
    type: "income" | "outcome"
    category: string
    price: number
    createAt: string
}

export function Transactions() {
    const [transactions, setTransactions] = useState<transactionsProps[]>([])

    async function loadTransaction() {
        const response = await fetch('http://localhost:3333/transactions')
        const data = await response.json();
        setTransactions(data)
    }

    useEffect(() => {
        loadTransaction()
    }, [])
    return (
        <div>
            <Header />
            <Summary />
            
            <TransactionsContainer>
                <SearchForm />
                
                <TransactionsTable>
                    <tbody>
                        {transactions.map((transaction) => {
                            return (
                            <tr key={transaction.id}>
                                <td width="50%">{transaction.description}</td>
                                <td>
                                    <PriceHighlight variant={transaction.type}>
                                        {transaction.price}
                                    </PriceHighlight>
                                </td>
                                <td>{transaction.category}</td>
                                <td>{transaction.createAt}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}