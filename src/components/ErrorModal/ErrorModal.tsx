import React from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideIn = keyframes`
  from { transform: translateY(-50px); }
  to { transform: translateY(0); }
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
  text-align: center;
  animation: ${slideIn} 0.3s ease-out;
`

const ModalTitle = styled.h2`
  color: #e53e3e;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`

const ModalMessage = styled.p`
  color: #4a5568;
  margin-bottom: 1.5rem;
`

const CloseButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #0567b1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #02365d;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px #02365d;
  }
`

interface ErrorModalProps {
  isOpen: boolean
  onRequestClose: () => void
  message: string
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onRequestClose, message }) => {
  if (!isOpen) return null

  return (
    <ModalOverlay onClick={onRequestClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Error</ModalTitle>
        <ModalMessage>{message}</ModalMessage>
        <CloseButton onClick={onRequestClose}>Cerrar</CloseButton>
      </ModalContent>
    </ModalOverlay>
  )
}

export default ErrorModal