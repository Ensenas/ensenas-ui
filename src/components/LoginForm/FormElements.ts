import NextLink from 'next/link'
import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
`

export const SignImage = styled.div`
  background-image: url('/señasLogin.gif');
  background-position: center;
  background-size: cover;
  width: 40%;
  height: 100%;

  @media (max-width: 1024px) {
    width: 30%;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
  width: 60%;

  @media (max-width: 1024px) {
    width: 70%;
  }

  @media (max-width: 768px) {
    width: 100%;
    background-color: #fff;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 2rem;
  transition: all 0.5s;
  background-color: #f7f9fa;
  width: 80%;
  max-width: 500px;
  height: auto;
  min-height: 500px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  @media (max-width: 1024px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    box-shadow: none;
    justify-content: center;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`

export const FormTitle = styled.h2`
  font-size: 1.8rem;
  color: #2d3c49;
  text-align: center;
  padding: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

export const Link = styled(NextLink)`
  color: #2b3a47;
  align-self: flex-end;
  transition: all 0.5s;
  font-size: 0.9rem;  
  
  &:hover {
    color: #010606;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`

export const InfoTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 1.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
    margin-top: 1rem;
  }
`

export const InfoText = styled.span`
  font-size: 0.9rem;
  margin-right: 0.5rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
`