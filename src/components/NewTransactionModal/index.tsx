import { FormEvent, useState } from "react";
import Modal from "react-modal";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useTransaction } from "../../hooks/TransactionContext";
import { Container,TransactionTypeContainer,RadioBox } from "./style";

interface ModalProps {
  onOpen: boolean;
  closeNewTransactionModal: () => void;
}

export function NewTransactionModal({
  onOpen,
  closeNewTransactionModal,
}: ModalProps) {

  const [title,setTitle] = useState('');
  const [value,setValue] = useState(0);
  const [category,setCategory] = useState('');
  const [type,setType] = useState('deposit');

  const {createTransaction} = useTransaction()

  async function handleCreateNewTransacion(event:FormEvent){
      event.preventDefault();

      await createTransaction({
        title,
        category,
        type,
        value
      })

      setTitle('')
      setValue(0)
      setCategory('')
      setType('')
      closeNewTransactionModal();
  }

  return (
    <Modal
      isOpen={onOpen}
      onRequestClose={closeNewTransactionModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={closeNewTransactionModal}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransacion}> 
        <h2>Cadastrar transação</h2>

        <input 
        type="text" 
        placeholder="Título"
        value={title}
        onChange={(event)=>setTitle(event.target.value)} />

        <input 
        type="number" 
        value={value}
        placeholder="Valor" 
        onChange={(event)=>setValue(Number(event.target.value))}/>

        <TransactionTypeContainer>
        <RadioBox 
        type="button" 
        onClick={()=>setType('deposit')}
        isActive={type==="deposit"}
        activeColor="green">
            <img src={incomeImg} alt="Entrada" />
            
            <span>Entrada</span>
          </RadioBox>
          <RadioBox 
          type="button" 
          onClick={()=>setType('withdraw')}
          isActive={type==="withdraw"}
          activeColor="red">
            <img src={outcomeImg} alt="Saída" />
            
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input 
        type="text" 
        value={category}
        placeholder="Categoria"
        onChange={(event)=>setCategory(event.target.value)} />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
