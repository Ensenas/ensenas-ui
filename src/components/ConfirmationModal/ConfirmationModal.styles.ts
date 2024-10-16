// ConfirmationModal.styles.ts
import styled from 'styled-components'

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

export const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 90%;
  max-height: 80%;
  position: relative;
`

export const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: #9610ba; /* Color del texto azul */
  background-color: #fff; /* Fondo blanco */
  border: 1px solid #9610ba; /* Borde azul */

  &:hover {
      background-color: #9610ba; /* Fondo azul al hacer hover */
      color: #fff; /* Color del texto blanco */
    }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`

export const Text = styled.p`
  margin-bottom: 20px;
  color: #000;
`
