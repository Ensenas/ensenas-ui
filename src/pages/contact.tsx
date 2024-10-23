/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'

import HomeLayout from '../components/HomeLayout/HomeLayout'
import ProtectedRoute from '../components/ProtectedRoute'
import { Button, FormGroup, Input, Label, Section, TextArea, Title } from '../styles/Contact.styles'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', surname: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/ens-api/users/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        })
        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario')
        }
        const data = await response.json()
        setFormData({
          name: data.name || '',
          surname: data.surname || '',
          email: data.mail || '',
          message: ''
        })
      } catch (error) {
        console.error(error)
      }
    }

    fetchUserData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Aquí puedes agregar la lógica para enviar el formulario
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   body: JSON.stringify(formData),
    //   headers: { 'Content-Type': 'application/json' }
    // });

    // Simulación de éxito
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setFormData({ name: '', surname: '', email: '', message: '' })
    }, 1000)
  }

  return (
    <ProtectedRoute>
      <HomeLayout activePage="/contact">
        <Section>
          <Title>Contactanos</Title>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Nombre</Label>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label>Apellido</Label>
              <Input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label>Mensaje</Label>
              <TextArea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                required 
              />
            </FormGroup>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button type="submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar'}
              </Button>
            </div>
            {success && <p>Mensaje enviado con éxito.</p>}
            {error && <p>Error: {error}</p>}
          </form>
        </Section>
      </HomeLayout>
    </ProtectedRoute>
  )
}

export default Contact
