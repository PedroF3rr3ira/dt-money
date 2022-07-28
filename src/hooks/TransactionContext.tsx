import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transactions {
    id: number;
    title: string;
    category: string;
    value: number;
    createdAt: Date;
    type: string;
}

interface TransactionProviderProps{
    children:ReactNode;
}

interface TransactionContextData{
  transactions:Array<Transactions>;
  createTransaction:(transaction:TransactionInput)=>Promise<void>;
}

type TransactionInput = Omit<Transactions,'id' |'createdAt'>

const TransactionContext = createContext<TransactionContextData>({}as TransactionContextData);

export function TransactionProvider({children}:TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  useEffect(() => {
    api.get("transactions")
    .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transaction:TransactionInput){
    const response = await api.post('/transaction',{
      ...transaction,
      createdAt:new Date(),
    })
    setTransactions([
      ...transactions,
      response.data.transaction
    ])
  }

  return(
    <TransactionContext.Provider value={{transactions,createTransaction}}>
        {children}
    </TransactionContext.Provider>
  )
}

export function useTransaction(){
  const context = useContext(TransactionContext)

  return context;
}
