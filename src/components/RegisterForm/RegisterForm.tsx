/* eslint-disable no-console */
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { FormColumn, FormRow, Subtitle } from './FormElements'
import { Container, Form, FormTitle, RegisterButton } from './FormElements'
import InputField from './InputField'

const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      // Lógica de autenticación (reemplaza este bloque con tu lógica real)
      // Ejemplo de llamada a una API para verificar credenciales
      // const response = await fetch('/api/login', {
      //     method: 'POST',
      //     body: JSON.stringify({ email, password }),
      //     headers: { 'Content-Type': 'application/json' }
      // })
      // const data = await response.json()
      // if (data.success) {
      //     router.push('/home')
      // } else {
      //     throw new Error(data.message)
      // }

      // Simulación de autenticación exitosa
      console.log(`Email: ${email}, Password: ${password}`) // Imprime en consola para prueba
      router.push('/login') // Redirige a la página de inicio
    } catch (error) {
      console.error('Error de autenticación:', error)
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  }

  return (
    <Container>
      <Head>
        <title>Enseñas - Registrate</title>
      </Head>
      <Form onSubmit={handleRegister}>
        <FormTitle> Crea tu cuenta </FormTitle>

        <FormRow>
          <FormColumn>
            <Subtitle>Información Personal</Subtitle>
            <InputField label="Nombre" type="text" required />
            <InputField label="Apellido" type="text" required />
            <InputField label="Fecha de nacimiento" type="date" required />
            <InputField label="País" type="text" required />
          </FormColumn>

          <FormColumn>
            <Subtitle>Información de la cuenta</Subtitle>
            <InputField
              label="Usuario"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />

            <InputField
              label="Contraseña"
              placeholder="Debe contener al menos 6 caracteres"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <InputField
              label="Repetir contraseña"
              placeholder="Debe contener al menos 6 caracteres"
              type="password"
              required
            />
          </FormColumn>
        </FormRow>

        <RegisterButton>Registrate</RegisterButton>
      </Form>
    </Container>
  )
}

export default RegisterForm
