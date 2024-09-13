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

export const RecordButton = styled.button`
    background-color: crimson;
    color: #fff;
    margin-top: 10px;
    padding: 10px 40px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
`

export const Overlay = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 0, 0, 0.3); // Adjust color and opacity
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
    z-index: -1;
`