import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { NewTransactionModal } from "./components/NewTransactionModal";
import Modal from 'react-modal'
import { useState } from "react";
import { TransactionProvider } from "./hooks/TransactionContext";


Modal.setAppElement('#root')

export function App() {
  const [newTransactionModal,setNewTransactionModal] = useState(false);

  function openNewTransactionModal(){
    setNewTransactionModal(true)
  }
  function closeNewTransactionModal(){
    setNewTransactionModal(false)
  }

  return (
    <TransactionProvider>
      <Header openNewTransactionModal={openNewTransactionModal}/>
      <Dashboard />
      <NewTransactionModal
        onOpen={newTransactionModal}
        closeNewTransactionModal={closeNewTransactionModal}
      />
      <GlobalStyle />
    </TransactionProvider>
  );
}
