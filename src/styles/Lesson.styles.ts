import styled from 'styled-components'

export const Section = styled.section`
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

export const Title = styled.h2`
  margin: 0;
  margin-bottom: 20px;
`

export const LessonTitle = styled.h3`
  margin: 0;
  font-size: 1.2em;
  margin-bottom: 20px;
`

export const VideoContainer = styled.div`
  text-align: center;
  max-width: 50%; /* Establece un ancho máximo para el video */
  margin: 0 auto; /* Centra el contenedor del video */
margin-bottom: 20px;
`

export const TestButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease;
  display: inline-block; /* Asegura que el botón se ajuste al contenido */
  margin: 20px auto; /* Espacio alrededor del botón */
  width: fit-content; /* Ajusta el ancho del botón al contenido */
  position: relative; /* Necesario para el posicionamiento del tooltip */
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Tooltip = styled.div<{ show: boolean }>`
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  position: absolute;
  bottom: 0%; /* Ajusta según sea necesario */
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 10;
  transition: visibility 0.3s ease, opacity 0.3s ease;
  opacity: ${({ show }) => (show ? 1 : 0)};
`;

export const TooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; /* Necesario para el posicionamiento del tooltip */
`;