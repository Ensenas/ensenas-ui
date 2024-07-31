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
`

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #0567b1;
  cursor: pointer;
  font-size: 1em;
`

export const Form = styled.form`
  margin-top: 20px;
`

export const FormSection = styled.div`
  margin-bottom: 20px;
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
