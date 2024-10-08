// Spinner.tsx
import React from 'react'
import styled from 'styled-components'

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* O ajusta según tus necesidades */
`

const Spinner = styled.div`
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #0567b1; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const LoadingSpinner: React.FC = () => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
)

export default LoadingSpinner