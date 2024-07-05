import styled from 'styled-components'

export const RegisterContainer = styled.div`
  max-width: 100%;
  padding: 20px;
  position: relative; 
  background-image: url('/registerBackground.jpg');
  background-size: cover; /* Ajusta el tamaño de la imagen para cubrir completamente el contenedor */
  background-position: center; /* Centra la imagen de fondo */
  background-repeat: no-repeat; /* Evita la repetición de la imagen */
`

export const BackLink = styled.a`
  display: inline-block;
  margin-bottom: 20px;
  color: #68b4a6;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2em;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #406d65;
  }
`

export const FormContainer = styled.div`
  max-width: 60%;
  margin: 0 auto;
  position: relative;
  padding: 10px 50px;
  background-color: #f9f9f9; 
  border: 1px solid #ccc;
  border-radius: 10px;
`

export const Title = styled.h1`
  text-align: center;
  color: #555;
  margin-bottom: 20px;
  margin-top: 0px;
`

export const Subtitle = styled.h2`
  color: #555;
  margin: 0px;
  margin-top: 30px;
  margin-bottom: 15px;

  &::after {
    content: '';
    display: block;
    width: 50%; /* Puedes ajustar este valor para cambiar la longitud de la línea */
    height: 1px; /* Ajusta el grosor de la línea */
    background-color: #555; /* Color de la línea */
    margin-right: 50%; /* Ajusta el espacio alrededor de la línea */
  }
`

export const Section = styled.div`
  margin-bottom: 30px;
`

export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const FormColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  &:not(:last-child) {
    margin-right: 20px;
  }
`

export const Label = styled.label`
  margin-bottom: 5px;
  margin-top: 15px;
  font-weight: bold;
`

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const SubmitButton = styled.button`
  background-color: #68b4a6;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: block;
  margin: 0 auto;

  &:hover {
    background-color: #406d65;
  }
`