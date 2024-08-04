/* eslint-disable no-console */
import Head from 'next/head'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { AiOutlineUnlock, AiOutlineUser } from 'react-icons/ai'

import AppLogoTitle from '../AppLogoTitle'
import Button from '../Button'
import GoogleSignInButton from '../Button/GoogleButton'
import {
  Form,
  FormContainer,
  FormTitle,
  InfoText,
  InfoTextContainer,
  Link,
  MainContainer,
  SignImage
} from './FormElements'
import InputField from './InputField'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { status } = useSession()

  if (status === 'authenticated') {
    router.push('/home')
    return null
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleGoogleClick = async () => {
    try {
      const signInResponse = await signIn('google', {
        redirect: false // Prevent automatic redirection
      })
      if (signInResponse && !signInResponse.error) {
        router.push('/home')
      }
    } catch (error) {
      console.error('Error en la autenticación con Google:', error)
      setError('Error en la autenticación con Google')
    }
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await signIn('credentials', {
        redirect: false,
        email,
        password
      })
      if (response && !response.error) {
        router.push('/home')
      } else {
        setError('Tu email o contraseña son incorrectos')
      }
    } catch (error) {
      console.error('Error de autenticación:', error)
      setError('Error de autenticación')
    }
  }

  return (
    <MainContainer>
      <SignImage />
      <FormContainer>
        <Head>
          <title>Enseñas - Iniciar Sesión</title>
        </Head>
        <Form onSubmit={handleLogin}>
          <AppLogoTitle />
          <FormTitle>¡La mejor forma para aprender lengua de señas!</FormTitle>

          <InputField
            placeholder="Usuario"
            type="email"
            icon={<AiOutlineUser />}
            value={email}
            onChange={handleEmailChange}
            required
          />

          <InputField
            placeholder="Contraseña"
            type="password"
            icon={<AiOutlineUnlock />}
            value={password}
            onChange={handlePasswordChange}
            required
          />

          <Link href="/forgot-password">¿Olvidaste tu contraseña?</Link>

          <Button type="submit" title="Iniciar Sesión" />
          <span>ó</span>
          <GoogleSignInButton onClick={handleGoogleClick} />

          <InfoTextContainer>
            <InfoText>¿No tienes tu cuenta?</InfoText>

            <Link href="/signup">¡Regístrate!</Link>
          </InfoTextContainer>
          {error && (
            //<!---<ErrorModal isOpen={!!error} onRequestClose={() => setError(null)} message={error} />--!>
            <div>TODO: AGREGAR ERRORMODAL</div>
          )}
        </Form>
      </FormContainer>
      <SignImage />
    </MainContainer>
  )
}

export default LoginForm
