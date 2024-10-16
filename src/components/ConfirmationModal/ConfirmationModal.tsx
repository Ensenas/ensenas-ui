import React from 'react'

import { Button, ModalContent, ModalOverlay,Text } from './ConfirmationModal.styles'

interface ConfirmationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isVisible, onClose, onConfirm }) => {
  if (!isVisible) return null

  return (
    <ModalOverlay>
        <ModalContent>
            <Text>¿Seguro quieres cancelar la suscripción?</Text>
                <Button style={{marginRight: '10px'}} onClick={onConfirm}>Confirmar</Button>
                <Button onClick={onClose}>Volver</Button>
        </ModalContent>
    </ModalOverlay>
    
  )
}

export default ConfirmationModal
