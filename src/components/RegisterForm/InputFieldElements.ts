import { BsEye, BsEyeSlash } from 'react-icons/bs'
import styled, { css } from 'styled-components'

export const Container = styled.div`
  margin-bottom: 5px;
`

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  width: 100%;
  position: relative;

  & svg {
    position: absolute;
    transform: translateX(1rem);
    color: rgba(0, 0, 0, 0.65);
  }
`

export const Input = styled.input`
  font-size: 0.85rem;
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  width: 100%;
`
export const Label = styled.label`
  font-size: 0.85rem;
  width: 100%;
`

const EyeIcon = css`
  position: absolute;
  right: 30px;
  color: rgba(0, 0, 0, 0.65);
`

export const ShowPassIcon = styled(BsEye)`
  ${EyeIcon}
`

export const HidePassIcon = styled(BsEyeSlash)`
  ${EyeIcon}
`

export const ErrorText = styled.span`
    color: red;
    font-size: 0.875rem; // Ajusta el tamaño del texto según sea necesario
    margin-top: 0.25rem;
`