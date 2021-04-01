import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import {api} from './../services/api';

interface TransactionData {
  id: number;
  title: string;
  value: number;
  category: string;
  type: string;
  createdAt: string;
}

type TransactionInput = Omit<TransactionData, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode,
}

interface TransactionsContextData {
  transactions: TransactionData[];
  createTransaction: (transactionInput: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext({} as TransactionsContextData);

export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<TransactionData[]>([])

  useEffect(() => {
    api.get('transactions')
    .then(response => setTransactions(response.data.transactions))
  },[]);

  async function createTransaction(transactionInput:TransactionInput) {
    const { transaction } = await (await api.post('transactions', transactionInput)).data 
    
    setTransactions(oldState => [...oldState, transaction])
  }

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}