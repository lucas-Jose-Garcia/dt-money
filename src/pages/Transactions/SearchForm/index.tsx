import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContex } from "../../../contexs/TransactionsContex";

const searchFormSchema = z.object({
    query: z.string(),
})

type SherchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
    const { fetchTransaction } = useContext(TransactionsContex)

    const {
        register,
        handleSubmit,
        formState: {isSubmitting}
    } = useForm<SherchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    })

    async function hendleSearchTransactions(data: SherchFormInputs) {
        await fetchTransaction(data.query)
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(hendleSearchTransactions)}>
            <input 
            type="text"
            placeholder="Busque por transações"
                {...register('query')}
            />
            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SearchFormContainer>
    )
}