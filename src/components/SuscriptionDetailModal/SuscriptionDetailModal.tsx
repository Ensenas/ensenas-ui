import React from 'react';
import { ModalOverlay, ModalContent, ModalTitle, ModalBody, ModalCloseButton } from './SuscriptionDetailModal.styles'; // Añade los estilos correspondientes

interface SubscriptionDetailModalProps {
  isVisible: boolean;
  onClose: () => void;
  subscription: {
    name: string;
    isPremium: boolean;
    background: string;
    logo: string;
    status: string;
    expirationDate: string;
    detalle: string;
  } | null;
}

const SubscriptionDetailModal: React.FC<SubscriptionDetailModalProps> = ({ isVisible, onClose, subscription }) => {
  if (!isVisible || !subscription) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalCloseButton onClick={onClose}>×</ModalCloseButton>
        <ModalTitle>{subscription.name}</ModalTitle>
        <ModalBody>
          <p><strong>Estado:</strong> {subscription.status}</p>
          <p><strong>Fecha de Expiración:</strong> {subscription.expirationDate}</p>
          <p><strong>Detalles:</strong> {subscription.detalle}</p>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  )
}

export default SubscriptionDetailModal
