import { useContext } from "react"
import { TransactionsContex } from "../contexs/TransactionsContex"

export function useSummary() {
    const { transactions } = useContext(TransactionsContex)

    const summary = transactions.reduce(
        (acc, transaction) => {
            if (transaction.type === 'income') {
                acc.income += transaction.price
                acc.total += transaction.price
            } else {
                acc.outcome += transaction.price
                acc.total -= transaction.price
            }
            return acc
        },
        {
            income: 0,
            outcome: 0,
            total: 0
        }
    )

    return summary
}