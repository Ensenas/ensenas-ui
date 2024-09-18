import styled from 'styled-components'

export const ResultsContainer = styled.div`
  position: absolute;
  top: 100%; /* Posicionar justo debajo del input */
  left: 30px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000; /* Asegúrate de que se superponga a otros elementos */
`

export const ResultItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0; /* Cambia el color al pasar el mouse */
  }
`


