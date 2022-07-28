import { Dispatch, SetStateAction } from 'react';
import Logo from '../../assets/logo.svg' 
import { Container, Content } from './style';

interface HeaderProps{
    openNewTransactionModal:()=>void;
}

export function Header({openNewTransactionModal}:HeaderProps){
    
    return (
        <Container>
            <Content>
            <img src={Logo} alt="" />

            <button onClick={openNewTransactionModal}>
                Nova Transação
            </button>
            </Content>
            
        </Container>
    );
}