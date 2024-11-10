/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaSave } from 'react-icons/fa'

import HomeLayout from '../components/HomeLayout/HomeLayout'
import ProtectedRoute from '../components/ProtectedRoute'
import LoadingSpinner from '../components/Spinner/Spinner'
import {
  EditButton, Form, FormColumn, FormGroup, FormRow, FormSection, FormSectionTitle,
  Header, Input, Label, Section, Title
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

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/ens-api/users/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
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
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
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
    setProfileData(prevState => ({
      ...prevState,
      [name]: value
    }))
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
      <HomeLayout activePage='/profile'>
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
                  {isEditing ? <FaSave style={{ marginRight: '5px' }} /> : <FaEdit style={{ marginRight: '5px' }} />}
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
                          value={new Date(Date.parse(profileData.birthDate)).toISOString().split('T')[0]}
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
                          disabled={!isEditing}
                        />
                      </FormGroup>
                    </FormColumn>
                    <FormColumn>
                      <FormGroup>
                        <Label>Contraseña</Label>
                        <Input
                          type="password"
                          name="password"
                          value={isEditing ? profileData.password : '******'}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
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
