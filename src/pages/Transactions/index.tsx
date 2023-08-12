import { useContext } from "react";
import { Header } from "../../componets/Header";
import { Summary } from "../../componets/Summary";
import { SearchForm } from "./SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";
import { TransactionsContex } from "../../contexs/TransactionsContex";



export function Transactions() {
    const { transactions } = useContext(TransactionsContex)
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