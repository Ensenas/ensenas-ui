import { BsEye, BsEyeSlash } from 'react-icons/bs'
import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  margin-bottom: 1rem;

  & > svg:first-child {
    position: absolute;
    left: 1rem;
    color: rgba(0, 0, 0, 0.65);
  }

  @media (max-width: 480px) {
    & > svg:first-child {
      left: 0.5rem;
    }
  }
`

export const Input = styled.input`
  font-size: 1rem;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  width: 100%;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2b3a47;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.8rem 0.8rem 0.8rem 2.5rem;
  }
`

const EyeIcon = css`
  position: absolute;
  right: 1rem;
  color: rgba(0, 0, 0, 0.65);
  cursor: pointer;
  z-index: 1;

  @media (max-width: 480px) {
    right: 0.5rem;
  }
`

export const ShowPassIcon = styled(BsEye)`
  ${EyeIcon}
`

export const HidePassIcon = styled(BsEyeSlash)`
  ${EyeIcon}
`