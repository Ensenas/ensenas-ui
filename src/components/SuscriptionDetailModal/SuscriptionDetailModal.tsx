import React from 'react'

import { CrossIcon,   FeatureItem, FeatureList, ModalBody, ModalCloseButton, ModalContent, 
  ModalOverlay, ModalTitle, Status,StatusContent, TickIcon } from './SuscriptionDetailModal.styles'

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
  if (!isVisible || !subscription) return null

  const features = [
    { label: 'Acceso a lecciones básicas', isPremiumFeature: false },
    { label: 'Acceso a lecciones avanzadas', isPremiumFeature: true },
    { label: 'Certificación de curso', isPremiumFeature: true },
    { label: 'Soporte prioritario', isPremiumFeature: true }, 
    { label: 'Material adicional', isPremiumFeature: true }
  ]

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalCloseButton onClick={onClose}>×</ModalCloseButton>
        <ModalTitle>{subscription.name}</ModalTitle>
        <ModalBody>
          <StatusContent>
            <p style={{color: '#fff'}}><strong>Estado:</strong></p>
            <Status status={subscription.status}>{subscription.status}</Status>
          </StatusContent>
          {subscription.status === 'Activo' ? (
              <p style={{color: '#fff'}}><strong>Fecha de Expiración:</strong> {subscription.expirationDate}</p>
          ) : (
              <></>
          )}
          <FeatureList>
            {features.map((feature, index) => (
              <FeatureItem key={index}>
                {!subscription.isPremium && feature.isPremiumFeature ? (
                  <CrossIcon>✗</CrossIcon>
                ) : (
                  <TickIcon>✓</TickIcon>
                )}
                {feature.label}
              </FeatureItem>
            ))}
          </FeatureList>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  )
}

export default SubscriptionDetailModal

