import { NextPage } from 'next'
import Link from 'next/link'

import { BackLink, FormColumn, FormContainer, FormRow, Input, Label, RegisterContainer, Section, 
  SubmitButton,Subtitle, Title } from '../styles/Register.styles'

const RegisterPage: NextPage = () =>  {
  return (
    <RegisterContainer>
      <Link href="/" passHref>
        <BackLink>&lt; Volver Atrás</BackLink>
      </Link>
      <FormContainer>
        <Title>Crea tu cuenta</Title>
        <Section>
          <Subtitle>Información Personal</Subtitle>
          <FormRow>
            <FormColumn>
              <Label>Nombre</Label>
              <Input type="text" name="nombre" />
              <Label>Fecha de nacimiento</Label>
              <Input type="date" name="fecha-nacimiento" />
              <Label>País</Label>
              <Input type="text" name="pais" />
            </FormColumn>
            <FormColumn>
              <Label>Apellido</Label>
              <Input type="text" name="apellido" />
            </FormColumn>
          </FormRow>
        </Section>

        <Section>
          <Subtitle>Información de la cuenta</Subtitle>
          <FormRow>
            <FormColumn>
              <Label>Correo electrónico</Label>
              <Input type="email" name="correo-electronico" />
              <Label>Contraseña</Label>
              <Input type="password" name="contrasena" />
            </FormColumn>
            <FormColumn>
              <Label style={{ visibility: 'hidden' }}>Hidden</Label>
              <Input style={{ visibility: 'hidden' }}/>
              <Label>Repetir contraseña</Label>
              <Input type="password" name="repetir-contrasena" /> 
            </FormColumn>
          </FormRow>
        </Section>
        <SubmitButton>Crear cuenta</SubmitButton>
      </FormContainer>
    </RegisterContainer>
  )
}

export default RegisterPage