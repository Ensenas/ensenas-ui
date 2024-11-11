'use client'

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
        const handleAuthenticationResult = async () => {
            if (status === 'authenticated' && session?.user?.email) {
                console.log("Authentication successful")
                if (session.user.accessToken) {
                    localStorage.setItem('authToken', session.user.accessToken)
                    await router.push('/home')
                } else {
                    console.error("Access token is missing from the session")
                    setError('Error al obtener el token de acceso')
                }
            }
        }

        handleAuthenticationResult()
    }, [session, status, router])

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleGoogleClick = async () => {
        setIsLoading(true)
        try {
            const result = await signIn('google', { redirect: false })
            if (result?.error) {
                console.error('Error en la autenticación con Google:', result.error)
                setError('Error en la autenticación con Google')
            } else if (result?.ok) {
                localStorage.setItem('isGoogleLogin', 'true')
            }
        } catch (error) {
            console.error('Error en la autenticación con Google:', error)
            setError('Error en la autenticación con Google')
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            const response = await axios.post('/ens-api/auth/login', {
                mail: email,
                password
            })
            const { access_token } = response.data

            if (access_token) {
                localStorage.setItem('authToken', access_token)
                localStorage.setItem('isGoogleLogin', 'false')
                const signInResponse = await signIn('credentials', {
                    redirect: false,
                    email,
                    password
                })

                if (signInResponse?.error) {
                    setError('El usuario y/o la contraseña son incorrectos. ¡Probá de nuevo!')
                } else if (signInResponse?.ok) {
                    // The useEffect hook will handle the redirection
                } else {
                    setError('Error desconocido.')
                }
            } else {
                setError('Error al obtener el token.')
            }
        } catch (error) {
            console.error('Error de inicio de sesión:', error)
            setError(`El usuario y/o la contraseña son incorrectos. ¡Probá de nuevo!`)
        } finally {
            setIsLoading(false)
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
                    <LoadingSpinner />
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

                        <Link style={{ marginBottom: '16px' }} href="/forgot-password">
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
                                ¿No tenés tu cuenta?
                            </InfoText>

                            <Link href='/register'>
                                ¡Regístrate!
                            </Link>
                        </InfoTextContainer>
                        {error && (
                            <ErrorModal
                                isOpen={error != null}
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