import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
`
export const WebcamContainer = styled.div`
    border-radius: 15px; // Ajusta el radio para redondear los bordes
    overflow: hidden; // Asegura que el contenido se ajuste a los bordes redondeados
    width: 600px; // Ajusta el ancho como desees
    height: 520px; // Ajusta la altura como desees
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 0, 0, 0.3);
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  z-index: -1;
`

export const SelectorsContainer = styled.div`
  position: absolute;
  left: 10px;
  top: 240px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 8px;
`

export const LocalVideoLabel = styled.div`
  position: absolute;
  top: 220px;
  left: 10px;
  font-size: 14px;
  color: #000;
`

export const FpsDisplay = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  color: #333;
`