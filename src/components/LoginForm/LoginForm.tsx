/* eslint-disable no-console */
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineUnlock, AiOutlineUser } from 'react-icons/ai'

import AppLogoTitle from '../AppLogoTitle'
import Button from '../Button'
import GoogleSignInButton from '../Button/GoogleButton'
import ErrorModal from '../ErrorModal/ErrorModal'
import {
    Form,
    FormContainer,
    FormTitle,
    InfoText,
    InfoTextContainer,
    NLink,
    MainContainer,
    SignImage
} from './FormElements'
import InputField from './InputField'

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const { data: session, status } = useSession()

    useEffect(() => {
        console.log('Session data:', session)
        const token = localStorage.getItem('authToken')
        console.log(status)
        if (status === 'authenticated' || token) {
            router.replace('/home')
            console.log('Session data:', session)
        }
    }, [session, status])

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
                router.replace('/home')
            } else if (signInResponse.error) {
                setError('Error en la autenticación con Google')
            }
        } catch (error) {
            console.error('Error en la autenticación con Google:', error)
            setError('Error en la autenticación con Google')
        }
    }

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const response = await axios.post('/ens-api/auth/login', {
                mail: email,
                password
            });

            const { access_token } = response.data;

            console.log(response)
            if (access_token) {

                localStorage.setItem('authToken', access_token);

                // Inicia sesión con next-auth usando credenciales
                const signInResponse = await signIn('credentials', {
                    redirect: false,
                    email,
                    password
                });

                console.log(signInResponse)
                if (signInResponse?.error) {
                    setError(signInResponse.error)
                } else if (signInResponse?.ok) {
                    router.replace('/home')
                    router.reload()
                    console.log(session)
                } else {
                    setError('Error desconocido.');
                }
            } else {
                setError('Error al obtener el token.');
            }
        } catch (error) {
            console.error('Error de inicio de sesión:', error);
            setError('Credenciales incorrectas.');
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

                    <NLink href="/forgot-password">
                        ¿Olvidaste tu contraseña?
                    </NLink>

                    <Button
                        type='submit'
                        title='Iniciar Sesión'
                    />
                    <span>ó</span>
                    <GoogleSignInButton onClick={handleGoogleClick} />

                    <InfoTextContainer>
                        <InfoText>
                            ¿No tienes tu cuenta?
                        </InfoText>

                        <NLink href='/signup'>
                            ¡Regístrate!
                        </NLink>
                    </InfoTextContainer>
                    {error && (
                        <ErrorModal
                            isOpen={!error}
                            onRequestClose={() => setError(null)}
                            message={error}
                        />
                    )}
                </Form>
            </FormContainer>
            <SignImage />
        </MainContainer>
    )
}

export default LoginForm