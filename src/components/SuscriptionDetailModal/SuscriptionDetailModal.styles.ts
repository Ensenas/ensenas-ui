import styled from 'styled-components'

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

export const ModalContent = styled.div`
  padding: 50px;
  border-radius: 10px;
  text-align: center;
  max-width: 90%;
  max-height: 80%;
  position: relative;
  overflow-y: auto; /* Permite el desplazamiento si el contenido es muy grande */
  background-color: #38265e;
  color: #fff;
  border: 1px solid #c9247b;
`

export const ModalTitle = styled.h2`
  margin: 0;
  padding-bottom: 30px;
  font-size: 2em;
  color: #fff;


`

export const ModalBody = styled.div`
  text-align: left;
  font-size: 1em;
  color: #fff;
`

export const StatusContent = styled.div`
  display: flex;
  align-items: center; /* Alinea verticalmente el contenido */
`

export const Status = styled.button<{ status: string }>`
  background-color: ${({ status }) => (status === 'Activo' ? '#4c971f' : '#cb1a18')};
  color: #fff;
  font-size: 1em;
  border: none; /* Elimina el borde predeterminado */
  border-radius: 10px; /* Redondea los bordes */
  padding: 10px 10px; /* Espaciado interno para hacerlo más grande y cómodo */
  text-align: center; /* Centra el texto dentro del botón */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Añade una sombra para darle profundidad */
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; /* Añade una transición suave para el hover */
  opacity: 85%;
  margin-left: 15px;

  &:focus {
    outline: none; /* Elimina el borde de enfoque predeterminado */
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2); /* Añade una sombra sutil para el enfoque */
  }

  &:disabled {
    background-color: #cccccc; /* Color de fondo para el estado deshabilitado */
    cursor: not-allowed; /* Cambia el cursor al pasar sobre el botón deshabilitado */
    box-shadow: none; /* Elimina la sombra en el estado deshabilitado */
    color: #666666; /* Cambia el color del texto en el estado deshabilitado */
  }
`

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
`

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 1em;
  padding: 5px 0;
`

export const TickIcon = styled.span`
  color: #4c971f; /* Verde para los tics */
  font-size: 1.2em;
  margin-right: 10px;
`

export const CrossIcon = styled.span`
  color: #cb1a18; /* Rojo para los tics */
  font-size: 1.2em;
  margin-right: 10px;
`

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #fff;
`
