import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
`

const FormContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FormTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
`

const Image = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
`

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
`

const FormTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`

const ErrorMessage = styled.span`
  color: #ef4444;
  text-align: center;
  font-size: 0.75rem;
  margin-bottom: 1rem;
`

const Button = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`

const SuccessMessage = styled.div`
  color: #10b981;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 600;
`
const Spinner = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

interface SelectOption {
  value: string
  label: string
}

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [country, setCountry] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [countryError] = useState('')
  const [birthDateError, setBirthDateError] = useState('')
  const [countries, setCountries] = useState<SelectOption[]>([])
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('/ens-api/countries')
        const countryList = response.data.map((country: any) => ({
          value: country.name,
          label: country.name
        }))
        countryList.sort((a: SelectOption, b: SelectOption) => a.label.localeCompare(b.label))
        setCountries(countryList)
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }

    fetchCountries()
  }, [])

  const validatePassword = (password: string, confirmPassword: string) => {
    const hasLetter = /[a-zA-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const isValidLength = password.length > 6

    if (!isValidLength || !hasLetter || !hasNumber) {
      setPasswordError(
        'La contraseña debe tener más de 6 caracteres, contener al menos una letra y un número.'
      )
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

    validatePassword(password, confirmPassword)
    validateBirthDate(birthDate)
    setSuccessMessage(null)
    setErrorMessage(null)
    setIsLoading(true)

    if (passwordError || confirmPasswordError || countryError || birthDateError) {
      return
    }

    try {
      const response = await axios.post('/ens-api/auth/sign-up', {
        mail: email,
        password,
        name,
        surname,
        birthDate,
        country
      })

      const status = response.status

      if (status === 200) {
        setSuccessMessage('Registro exitoso. Redirigiendo al inicio de sesión...')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        throw new Error(status.toString())
      }
    } catch (error) {
      setSuccessMessage(null)
      console.error('Error de autenticación:', error)
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          setErrorMessage('El mail ya se encuentra registrado. Probá con otro nuevo.')
        } else {
          setErrorMessage('Ocurrió un error en el servidor. Intentá más tarde.')
        }
      } else {
        setErrorMessage('Ocurrió un error inesperado. Intentá más tarde.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageContainer>
      <Head>
        <title>Enseñas - Registrate</title>
        <meta
          name="description"
          content="Bienvenido a Enseñas, la mejor plataforma para aprender lenguaje de señas."
        />
      </Head>
      <Head>
        <title>Enseñas - Registrate</title>
      </Head>
      <FormContainer>
        <Form onSubmit={handleRegister}>
          <FormTitleContainer>
            {/* Ruta de la imagen */}
            <FormTitle>Crea tu cuenta en Enseñas</FormTitle>
            <Image src="/logo.png" alt="Logo" />
          </FormTitleContainer>

          <InputGroup>
            <Label htmlFor="name">Nombre(s)</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="surname">Apellido(s)</Label>
            <Input
              id="surname"
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="birthDate">Fecha de nacimiento</Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => {
                setBirthDate(e.target.value)
                validateBirthDate(e.target.value)
              }}
              required
            />
            {birthDateError && <ErrorMessage>{birthDateError}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="country">País</Label>
            <Select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="">Selecciona un país</option>
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </Select>
            {countryError && <ErrorMessage>{countryError}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                validatePassword(e.target.value, confirmPassword)
              }}
              required
            />
            {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="confirmPassword">Repetir contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                validatePassword(password, e.target.value)
              }}
              required
            />
            {confirmPasswordError && <ErrorMessage>{confirmPasswordError}</ErrorMessage>}
          </InputGroup>

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Spinner />}
            {isLoading ? '' : 'Registrate'}
          </Button>

          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Form>
      </FormContainer>
    </PageContainer>
  )
}

export default RegisterPage
