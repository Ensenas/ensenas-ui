/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaSave } from 'react-icons/fa'

import HomeLayout from '../components/HomeLayout/HomeLayout'
import ProtectedRoute from '../components/ProtectedRoute'
import LoadingSpinner from '../components/Spinner/Spinner'
import {
  EditButton,
  Form,
  FormColumn,
  FormGroup,
  FormRow,
  FormSection,
  FormSectionTitle,
  Header,
  Input,
  Label,
  Section,
  Title
} from '../styles/Profile.Styles'

const Profile: React.FC = () => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    surname: '',
    birthDate: '',
    country: '',
    mail: '',
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newPassword, setNewPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/ens-api/users/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        })
        if (!response.ok) {
          throw new Error('Error al obtener los datos del perfil')
        }
        const data = await response.json()
        setProfileData(data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }
    fetchProfileData()
  }, [])

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    console.log('Datos enviados:', profileData) // Verifica los datos aquí
    try {
      const response = await fetch('/ens-api/users/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          name: profileData.name,
          surname: profileData.surname,
          birthDate: profileData.birthDate,
          country: profileData.country
        })
      })
      if (!response.ok) {
        throw new Error('Error al guardar los datos del perfil')
      }
      var data = await response.json()
      data = {
        ...data,
        country: data.country?.name || data.country, // Usa solo el nombre del país
        birthDate: data.birth_date
      }
      setProfileData(data) // Actualiza el estado con los datos recibidos del backend
      console.log(data)
      setIsEditing(false)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setPasswordError('')
    const hasLetter = /[a-zA-Z]/.test(newPassword)
    const hasNumber = /[0-9]/.test(newPassword)
    const isValidLength = newPassword.length > 6

    if (!isValidLength || !hasLetter || !hasNumber) {
      setPasswordError(
        'La contraseña debe tener más de 6 caracteres, contener al menos una letra y un número.'
      )
      return
    } else {
      setPasswordError('')
    }
    try {
      const response = await fetch('/ens-api/users/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          password: newPassword
        })
      })
      if (!response.ok) {
        throw new Error('Error al actualizar la contraseña')
      }
      setNewPassword('')
      setSuccessMessage('Contraseña actualizada con éxito')
    } catch (error) {
      setPasswordError(error.message)
    }
  }

  const handleEditButton = (e) => {
    if (isEditing) {
      handleSave(e)
    } else {
      setIsEditing(true)
    }
  }

  return (
    <ProtectedRoute>
      <Head>
        <title>Enseñas - Mi Perfil</title>
        <meta
          name="description"
          content="Bienvenido a Enseñas, la mejor plataforma para aprender lenguaje de señas."
        />
      </Head>
      <HomeLayout activePage="/profile">
        <div>
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <p style={{ margin: '40px' }}>{error}</p>
          ) : (
            <Section>
              <Header>
                <Title>Mi Perfil</Title>
                <EditButton onClick={handleEditButton}>
                  {isEditing ? (
                    <FaSave style={{ marginRight: '5px' }} />
                  ) : (
                    <FaEdit style={{ marginRight: '5px' }} />
                  )}
                  {isEditing ? 'Guardar' : 'Editar'}
                </EditButton>
              </Header>
              <Form>
                <FormSection>
                  <FormSectionTitle>Información Personal</FormSectionTitle>
                  <FormRow>
                    <FormColumn>
                      <FormGroup>
                        <Label>Nombre</Label>
                        <Input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Fecha de Nacimiento</Label>
                        <Input
                          type="date"
                          name="birthDate"
                          value={
                            new Date(Date.parse(profileData.birthDate)).toISOString().split('T')[0]
                          }
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>País</Label>
                        <Input
                          type="text"
                          name="country"
                          value={profileData.country}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </FormGroup>
                    </FormColumn>
                    <FormColumn>
                      <FormGroup>
                        <Label>Apellido</Label>
                        <Input
                          type="text"
                          name="surname"
                          value={profileData.surname}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </FormGroup>
                    </FormColumn>
                  </FormRow>
                </FormSection>
                <FormSection>
                  <FormSectionTitle>Información de la Cuenta</FormSectionTitle>
                  <FormRow>
                    <FormColumn>
                      <FormGroup>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          name="email"
                          value={profileData.mail}
                          onChange={handleChange}
                          disabled={true}
                        />
                      </FormGroup>
                    </FormColumn>
                    <FormColumn>
                      <FormGroup>
                        <Label>Nueva contraseña</Label>
                        <div style={{ position: 'relative' }}>
                          <Input
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            disabled={!isEditing}
                          />
                          {isEditing && (
                            <button
                              onClick={handleChangePassword}
                              style={{
                                marginLeft: '30px',
                                padding: '8px 16px',
                                backgroundColor: '#4F46E5',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                width: '35%',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'background-color 0.2s'
                              }}
                              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4338CA'}
                              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4F46E5'}
                            >
                              Cambiar contraseña
                            </button>
                          )}
                        </div>
                        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                        {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
                      </FormGroup>
                    </FormColumn>
                  </FormRow>
                </FormSection>
              </Form>
            </Section>
          )}
        </div>
      </HomeLayout>
    </ProtectedRoute>
  )
}

export default Profile