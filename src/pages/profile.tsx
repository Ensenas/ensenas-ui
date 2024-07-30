import React, { useState } from 'react'
import { FaEdit, FaSave } from 'react-icons/fa' // Para el icono del lápiz
import styled from 'styled-components'

const Section = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const Title = styled.h2`
  margin: 0;
`

const EditButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #0567b1;
  cursor: pointer;
  font-size: 1em;
`

const Form = styled.form`
  margin-top: 20px;
`

const FormSection = styled.div`
  margin-bottom: 20px;
`

const FormSectionTitle = styled.h3`
  margin-bottom: 30px;
  font-size: 1.2em;
  color: #0567b1;
  border-bottom: 2px solid #0567b1;
  padding-bottom: 0.5rem;
`

const FormRow = styled.div`
  display: flex;
  gap: 20px;
`

const FormColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const FormGroup = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
`

const Input = styled.input`
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

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = (e) => {
    e.preventDefault()
    // Aquí puedes agregar la lógica para guardar los cambios
    setIsEditing(false)
  }

  return (
    <Section>
      <Header>
        <Title>Mi Perfil</Title>
        <EditButton onClick={isEditing ? handleSave : toggleEdit}>
          {isEditing ? <FaSave style={{ marginRight: '5px' }} /> : <FaEdit style={{ marginRight: '5px' }} />}
          {isEditing ? 'Guardar' : 'Editar'}
        </EditButton>
      </Header>
      <Form>
        <FormSection>
          <FormSectionTitle>Información Personal</FormSectionTitle>
          <FormRow>
            <FormColumn>
              <FormGroup>
                <Label>Nombre</Label>
                <Input type="text" disabled={!isEditing} />
              </FormGroup>
              <FormGroup>
                <Label>Fecha de Nacimiento</Label>
                <Input type="date" disabled={!isEditing} />
              </FormGroup>
              <FormGroup>
                <Label>País</Label>
                <Input type="text" disabled={!isEditing} />
              </FormGroup>
            </FormColumn>
            <FormColumn>
              <FormGroup>
                <Label>Apellido</Label>
                <Input type="text" disabled={!isEditing} />
              </FormGroup>
            </FormColumn>
          </FormRow>
        </FormSection>
        <FormSection>
          <FormSectionTitle>Información de la Cuenta</FormSectionTitle>
          <FormRow>
            <FormColumn>
              <FormGroup>
                <Label>Email</Label>
                <Input type="email" disabled={!isEditing} />
              </FormGroup>
            </FormColumn>
            <FormColumn>
              <FormGroup>
                <Label>Contraseña</Label>
                <Input type="password" disabled={!isEditing} />
              </FormGroup>
            </FormColumn>
          </FormRow>
        </FormSection>
      </Form>
    </Section>
  )
}

export default Profile
