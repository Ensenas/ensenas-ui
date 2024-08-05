import React, { useEffect,useState } from 'react'
import { FaEdit, FaSave } from 'react-icons/fa' // Para el icono del lápiz

import ProtectedRoute from '../components/ProtectedRoute'
import { EditButton, Form, FormColumn, FormGroup, FormRow, FormSection, FormSectionTitle, 
  Header, Input, Label, Section, Title } from '../styles/Profile.Styles'

const Profile: React.FC = () => {
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
        const response = await fetch('/api/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Asumiendo que el token está almacenado en localStorage
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
    try {
      const response = await fetch('http://54.241.26.30:3001/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(profileData)
      })
      if (!response.ok) {
        throw new Error('Error al guardar los datos del perfil')
      }
      const data = await response.json()
      setProfileData(data)
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

  if (loading) return <p>Cargando...</p>
  if (error) return <p>{error}</p>

  return (
    <ProtectedRoute>
      <Section>
        <Header>
          <Title>Mi Perfil</Title>
          <EditButton onClick={isEditing ? handleSave : toggleEdit}>
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
                    value={profileData.birthDate}
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
                    value={profileData.email}
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
                    value={profileData.password}
                    onChange={handleChange} 
                    disabled={!isEditing} 
                  />
                </FormGroup>
              </FormColumn>
            </FormRow>
          </FormSection>
        </Form>
      </Section>
    </ProtectedRoute>
  )
}

export default Profile
