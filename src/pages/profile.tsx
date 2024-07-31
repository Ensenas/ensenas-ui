import React, { useState } from 'react'
import { FaEdit, FaSave } from 'react-icons/fa' // Para el icono del lápiz

import { EditButton, Form, FormColumn, FormGroup, FormRow, FormSection, FormSectionTitle, 
  Header, Input, Label, Section, Title } from '../styles/Profile.Styles'

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
