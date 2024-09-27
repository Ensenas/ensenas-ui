import React from 'react'
import styled from 'styled-components'

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ContentContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Title = styled.h2`
  font-size: 1.5rem;
  color: #38a169;
  margin-bottom: 1rem;
`

const Message = styled.p`
  margin-bottom: 1.5rem;
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
  }
`

const PrimaryButton = styled(Button)`
  background-color: #3490dc;
  color: white;

  &:hover {
    background-color: #2779bd;
  }
`

const SecondaryButton = styled(Button)`
  background-color: #f1f5f8;
  color: #3490dc;
  border: 1px solid #3490dc;

  &:hover {
    background-color: #e2e8f0;
  }
`

interface SuccessScreenProps {
  onNextWord: () => void
  onRestart: () => void
}

export default function SuccessScreen({ onNextWord, onRestart }: SuccessScreenProps) {
  return (
    <OverlayContainer>
      <ContentContainer>
        <Title>¡Excelente trabajo!</Title>
        <Message>Has realizado correctamente la seña.</Message>
        <div>
          <PrimaryButton onClick={onNextWord}>Siguiente palabra</PrimaryButton>
          <SecondaryButton onClick={onRestart}>Reiniciar</SecondaryButton>
        </div>
      </ContentContainer>
    </OverlayContainer>
  )
}