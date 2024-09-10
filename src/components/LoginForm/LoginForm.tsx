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
import LoadingSpinner from '../Spinner/Spinner'
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
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const { data: session, status } = useSession()

    useEffect(() => {
        console.log('Session data:', session)
        const token = localStorage.getItem('authToken')
        if (status === 'authenticated' || token) {
            router.push('/home')
        }
    }, [session, status, router])

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleGoogleClick = async () => {
        setIsLoading(true) // Inicia el estado de carga
        try {
            const signInResponse = await signIn('google', {
                redirect: false
            })
            if (signInResponse && !signInResponse.error) {
                router.push('/home')
            } else if (signInResponse?.error) {
                setError('Error en la autenticación con Google')
            }
        } catch (error) {
            console.error('Error en la autenticación con Google:', error)
            setError('Error en la autenticación con Google')
        } finally {
            setIsLoading(false) // Detén el estado de carga
        }
    }

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true) // Inicia el estado de carga
        try {
            const response = await axios.post('/ens-api/auth/login', {
                mail: email,
                password
            })
            const { access_token } = response.data

            if (access_token) {
                localStorage.setItem('authToken', access_token)

                const signInResponse = await signIn('credentials', {
                    redirect: false,
                    email,
                    password
                })

                if (signInResponse?.error) {
                    setError(signInResponse.error)
                } else if (signInResponse?.ok) {
                    router.push('/home')
                } else {
                    setError('Error desconocido.')
                }
            } else {
                setError('Error al obtener el token.')
            }
        } catch (error) {
            console.error('Error de inicio de sesión:', error)
            setError('Credenciales incorrectas.')
        } finally {
            setIsLoading(false) // Detén el estado de carga
        }
    }

    return (
        <MainContainer>
            <SignImage />
            <FormContainer>
                <Head>
                    <title>Enseñas - Iniciar Sesión</title>
                </Head>
                {isLoading ? (
                    <LoadingSpinner /> // Aquí puedes poner un spinner o cualquier otro indicador de carga
                ) : (
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

                        <Link href="/forgot-password">
                            ¿Olvidaste tu contraseña?
                        </Link>

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

                            <Link href='/signup'>
                                ¡Regístrate!
                            </Link>
                        </InfoTextContainer>
                        {error && (
                            <ErrorModal
                                isOpen={!error}
                                onRequestClose={() => setError(null)}
                                message={error}
                            />
                        )}
                    </Form>
                )}
            </FormContainer>
            <SignImage />
        </MainContainer>
    )
}

export default LoginForm