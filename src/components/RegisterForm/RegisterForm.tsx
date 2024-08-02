import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { FormColumn, FormRow, Subtitle } from './FormElements'
import {
    Container,
    Form,
    FormTitle,
    RegisterButton
} from './FormElements'
import InputField from './InputField'

const RegisterForm = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [country, setCountry] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSurname(event.target.value)
    }
    const handleBirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBirthDate(event.target.value)
    }
    const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(event.target.value)
    }

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const response = await fetch('http://54.241.26.30:3001/auth/sign-up', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mail: email,
                    password,
                    name,
                    surname,
                    birthDate,
                    country
                })
            })
            
            const data = await response.json()
            if (data.success) {
                router.push('/login') 
            } else {
                throw new Error(data.message)
            }

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
                        <InputField
                            label='Nombre'
                            type='text'
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                        <InputField
                            label='Apellido'
                            type='text'
                            value={surname}
                            onChange={handleSurnameChange}
                            required
                        />
                        <InputField
                            label='Fecha de nacimiento'
                            type='date'
                            value={birthDate}
                            onChange={handleBirthDateChange}
                            required
                        />
                        <InputField
                            label='País'
                            type='text'
                            value={country}
                            onChange={handleCountryChange}
                            required
                        />
                    </FormColumn>
                
                    <FormColumn>
                        <Subtitle>Información de la cuenta</Subtitle>
                        <InputField
                            label='Email'
                            type='email'
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />

                        <InputField
                            label='Contraseña'
                            placeholder='Debe contener al menos 6 caracteres'
                            type='password'
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <InputField
                            label='Repetir contraseña'
                            placeholder='Debe contener al menos 6 caracteres'
                            type='password'
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