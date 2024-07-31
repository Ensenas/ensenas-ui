// src/components/ErrorModal/ErrorModal.tsx

import React from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'

const ModalContent = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  text-align: center;
`

const CloseButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background: #e53e3e;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

interface ErrorModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  message: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onRequestClose, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)'
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)'
        }
      }}
    >
      <ModalContent>
        <h2>Error</h2>
        <p>{message}</p>
        <CloseButton onClick={onRequestClose}>Cerrar</CloseButton>
      </ModalContent>
    </Modal>
  )
}

export default ErrorModal
