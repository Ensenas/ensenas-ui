import styled from 'styled-components'

export const Section = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

export const Title = styled.h2`
  margin: 0;
  margin-bottom: 2rem;
`

export const Form = styled.form`
  margin-top: 20px;
`

export const FormSection = styled.div`
  margin-bottom: 20px;
  width: 100%;
`

export const FormSectionTitle = styled.h3`
  margin-bottom: 30px;
  font-size: 1.2em;
  color: #0567b1;
  border-bottom: 2px solid #0567b1;
  padding-bottom: 0.5rem;
`

export const FormRow = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`

export const FormColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const FormGroup = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
`

export const Input = styled.input`
  padding: 15px 0;
  margin-bottom: 1rem;
  border: none;
  border-bottom: 2px solid #ccc;
  background-color: transparent;
  &:focus {
    outline: none;
    border-bottom: 2px solid #0567b1;
  }
  &:disabled {
    border-bottom: 2px solid #eee;
    background-color: transparent;
  }
`

export const TextArea = styled.textarea`
  padding: 15px;
  margin-bottom: 1rem;
  border: 2px solid #ccc;
  border-radius: 5px;
  width: 97%; /* Ancho completo */
  height: 150px; /* Ajusta la altura según sea necesario */
  resize: vertical; /* Permite redimensionar verticalmente */
  &:focus {
    outline: none;
    border-color: #0567b1;
  }
`

export const Button = styled.button`
  background-color: #0567b1; /* Color de fondo */
  color: white; /* Color del texto */
  border: none; /* Sin borde */
  border-radius: 5px; /* Bordes redondeados */
  padding: 10px 15px; /* Espaciado interno */
  cursor: pointer; /* Cambia el cursor al pasar por encima */
  transition: background 0.3s; /* Transición para el efecto hover */

  &:hover {
    background-color: #045a9a; /* Color de fondo al pasar el mouse */
  }
`