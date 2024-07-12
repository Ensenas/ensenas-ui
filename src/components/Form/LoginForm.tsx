import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { AiOutlineMail, AiOutlineUnlock, AiOutlineUser } from 'react-icons/ai'

import AppLogoTitle from '../AppLogoTitle'
import Button from '../Button'
import GoogleSignInButton from '../Button/GoogleButton'
import {
    Container,
    Form,
    FormTitle,
    InfoText,
    InfoTextContainer,
    Link
} from './FormElements'
import InputField from './InputField'

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
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
            console.log(`Email: ${email}, Password: ${password}`)  // Imprime en consola para prueba
            router.push('/home')  // Redirige a la página de inicio

        } catch (error) {
            console.error('Error de autenticación:', error)
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    }

    return (
        <Container>
            <Head>
                <title>Enseñas - Iniciar Sesión</title>
            </Head>
            <Form onSubmit={handleLogin}>
                <AppLogoTitle />
                <FormTitle> ¡La mejor forma para aprender lengua de señas! </FormTitle>

                <InputField
                    placeholder='Usuario'
                    type='email'
                    icon={<AiOutlineUser />}
                    value={email}
                    onChange={handleEmailChange}
                    required
                />

                <InputField
                    placeholder='Contraseña'
                    type='password'
                    icon={<AiOutlineUnlock />}
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />

                <Link href="/forgot-password">
                    ¿Olvidaste tu contraseña?
                </Link>

                <Button
                    type='submit'
                    title='Iniciar Sesión'
                />
                <span>ó</span>
                <GoogleSignInButton />

                <InfoTextContainer>
                    <InfoText>
                        ¿No tenes tu cuenta?
                    </InfoText>

                    <Link href='/signup'>
                        ¡Registrate!
                    </Link>
                </InfoTextContainer>
            </Form>
        </Container>
    )
}

export default LoginForm