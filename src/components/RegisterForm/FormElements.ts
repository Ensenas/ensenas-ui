import NextLink from 'next/link'
import styled from 'styled-components'

export const RegisterContainer = styled.div`
  max-width: 100%;
  padding: 20px;
  background-color: #f9f9f9;
`

export const BackLink = styled.a`
  display: inline-block;
  color: #0567b1;
  text-decoration: none;
  font-weight: bold;
  font-size: 1em;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #02365d;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;

  @media (max-width: 768px) {
    background-color: #fff;
  }
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1.5rem;
  transition: all 0.5s;
  background-color: #f7f9fa;
  width: 100%;
  height: 90%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  @media (max-width: 1024px) {
    width: 50%;
  }

  @media (max-width: 768px) {
    width: 100%;
    box-shadow: none;
  }
`

export const FormTitle = styled.h2`
  font-size: 2rem;
  color: #2d3c49;
  text-align: center;
  padding: 0.2rem;
`
export const Subtitle = styled.h2`
  color: #555;
  margin: 0px;
  margin-bottom: 15px;

  &::after {
    content: '';
    display: block;
    width: 100%; /* Puedes ajustar este valor para cambiar la longitud de la línea */
    height: 1px; /* Ajusta el grosor de la línea */
    background-color: #555; /* Color de la línea */
    margin-right: 50%; /* Ajusta el espacio alrededor de la línea */
  }
`

export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin: 35px 0px;
`

export const FormColumn = styled.div`
  flex: 1;
  display: flex;
  margin: 20px;
  flex-direction: column;
  &:not(:last-child) {
    margin-right: 20px;
  }
`
export const Link = styled(NextLink)`
  color: #2b3a47;
  align-self: flex-end;
  transition: all 0.5s;
  font-size: 0.8rem;

  &:hover {
    color: #010606;
  }
`

export const RegisterButton = styled.button`
  background-color: #fff;
  color: #0567b1;
  font-size: 1rem;
  padding: 0.8rem;
  transition: all 0.5s;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #0567b1;
  width: 20%;

  &:hover {
    background-color: #0567b1;
    color: #fff;
  }
`
