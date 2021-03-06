import React, { useState } from 'react';
import Modal from 'react-modal';
import { useTransactions } from '../../hooks/useTransactions';

import closeImg from './../../assets/close.svg';
import incomeImg from './../../assets/income.svg';
import outcomeImg from './../../assets/outcome.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const NewTransactionModal = ({ isOpen, onRequestClose } : NewTransactionModalProps) => {
  const {createTransaction} = useTransactions()

  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState(0);

  async function handleCreateNewTransaction(event:React.FormEvent) {
    event.preventDefault();

    await createTransaction({title, value, category, type});

    setTitle('');
    setType('deposit');
    setCategory('');
    setValue(0);

    onRequestClose()
    
  }

  return (
      <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button 
          type="button" 
          onClick={onRequestClose} 
          className="react-modal-close"
        >
          <img src={closeImg} alt="Fechar modal"/>
        </button>
        <Container onSubmit={handleCreateNewTransaction}>
          <h2>Cadastrar transação</h2>

          <input 
            type="text" 
            name="titulo" 
            placeholder="Título"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input 
            type="number" 
            name="valor" 
            placeholder="Valor"
            value={value}
            onChange={e => setValue(Number(e.target.value))}
          />

          <TransactionTypeContainer>
            <RadioBox 
              type="button"
              onClick={() => {setType('deposit')}}
              isActive={ type === 'deposit'}
              activeColor="green"
            >
              <img src={incomeImg} alt="Entrada"/>
              <span>Entrada</span>
            </RadioBox>

            <RadioBox 
              type="button"
              onClick={() => {setType('withdraw')}}
              isActive={ type === 'withdraw'}
              activeColor="red"
            >
              <img src={outcomeImg} alt="Saída"/>
              <span>Saída</span>
            </RadioBox>
          </TransactionTypeContainer>

          <input 
            type="text" 
            name="categoria" 
            placeholder="Categoria"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />

          <button type="submit">Cadastrar</button>
        </Container>
      </Modal>
  );
}

export default NewTransactionModal;