import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { SelectOption } from '../../types/propTypes'
import { FormColumn, FormRow, Subtitle } from './FormElements'
import { Container, Form, FormTitle, RegisterButton } from './FormElements'
import InputField from './InputField'
import SelectField from './SelectField'

const RegisterForm = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [country, setCountry] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [countryError, setCountryError] = useState('')
    const [birthDateError, setBirthDateError] = useState('') // Nuevo estado para el error de fecha
    const [countries, setCountries] = useState<SelectOption[]>([])
    const router = useRouter()

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all')
                const countryList = response.data.map((country: any) => ({
                    value: country.cca2, // Usamos el código de país como valor
                    label: country.name.common
                }))
                countryList.sort((a, b) => a.label.localeCompare(b.label))
                setCountries(countryList)
            } catch (error) {
                console.error('Error fetching countries:', error)
            }
        }

        fetchCountries()
    }, [])

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
        validatePassword(event.target.value, confirmPassword)
    }

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value)
        validatePassword(password, event.target.value)
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
    
    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCountry(event.target.value)
    }

    const validatePassword = (password: string, confirmPassword: string) => {
        const hasLetter = /[a-zA-Z]/.test(password)
        const hasNumber = /[0-9]/.test(password)
        const isValidLength = password.length > 6

        if (!isValidLength || !hasLetter || !hasNumber) {
            setPasswordError('La contraseña debe tener más de 6 caracteres, contener al menos una letra y un número.')
        } else {
            setPasswordError('')
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Las contraseñas no coinciden.')
        } else {
            setConfirmPasswordError('')
        }
    }

    const validateBirthDate = (date: string) => {
        const selectedDate = new Date(date)
        const currentDate = new Date()
        if (selectedDate >= currentDate) {
            setBirthDateError('La fecha de nacimiento debe ser anterior a la fecha actual.')
        } else {
            setBirthDateError('')
        }
    }

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Validación de fecha de nacimiento
        validateBirthDate(birthDate)

        if (passwordError || confirmPasswordError || countryError || birthDateError) {
            // No enviar el formulario si hay errores de validación
            return
        }

        try {
            const response = await fetch('/api/auth/sign-up', {
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
                <FormTitle>Crea tu cuenta</FormTitle>

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
                            error={birthDateError} // Mostrar error si lo hay
                        />
                        <SelectField
                            label='País'
                            value={country}
                            onChange={handleCountryChange}
                            options={countries}
                            error={countryError} // Mostrar error si lo hay
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
                            placeholder='Debe contener al menos 6 caracteres, una letra y un número'
                            type='password'
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            error={passwordError}
                        />
                        <InputField
                            label='Repetir contraseña'
                            placeholder='Debe contener al menos 6 caracteres'
                            type='password'
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                            error={confirmPasswordError}
                        />
                    </FormColumn>
                </FormRow>

                <RegisterButton type='submit'>Registrate</RegisterButton>
            </Form>
        </Container>
    )
}

export default RegisterForm
