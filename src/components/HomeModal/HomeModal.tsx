// components/AutoCloseModal.tsx
import React, { useEffect } from 'react';
import {ModalContent, ModalImage, ModalOverlay} from './HomeModal.styles'
interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const HomeModal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Cierra el modal después de 3 segundos

      return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalImage src="/signs.gif" alt="Modal Image" />
      </ModalContent>
    </ModalOverlay>
  );
};

export default HomeModal;
