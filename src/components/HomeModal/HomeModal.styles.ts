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
  position: relative; /* Añadido para posicionar el botón de cerrar */
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 90%;
  max-height: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

export const ModalImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 500px;
`

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: #333;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ff0000; /* Cambia el color al pasar el ratón por encima */
  }
`
