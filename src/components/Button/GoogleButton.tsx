'use client'

import React from 'react'
import styled from 'styled-components'

const ImageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #2d3c49;
  font-size: 1rem;
  background-color: #fff; /* Adjust background color as needed */
  width: 70%;

  &:hover {
    background-color: rgba(45, 60, 73, 0.3);
  }
`

const Image = styled.img`
  width: 1rem; /* Adjust image width as needed */
  height: 1rem; /* Adjust image height as needed */
  margin-right: 1.5rem; /* Adjust margin as needed */
`

const ButtonText = styled.span`
  font-size: 1rem; /* Adjust font size as needed */
`

const GoogleSignInButton = ({ onClick }) => {
  return (
    <ImageButton onClick={onClick} type="button">
      <Image src={'/google-logo.png'} alt={'Google'} />
      <ButtonText>Inicia sesión con Google</ButtonText>
    </ImageButton>
  )
}

export default GoogleSignInButton
