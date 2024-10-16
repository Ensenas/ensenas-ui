import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
`

export const WebcamContainer = styled.div`
  position: relative;
  border-radius: 15px;s
  overflow: hidden;
  widht: 1920px;
  height: 1080px;
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
  position: relative;
  left: 10px;
  top: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0px;
  margin-bottom: 20px;
  border-radius: 8px;
`

export const StyledSelect = styled.select`
    padding: 10px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    outline: none;

    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
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