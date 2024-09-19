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