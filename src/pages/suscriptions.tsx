import { useEffect, useState } from 'react'
import HomeLayout from '../components/HomeLayout/HomeLayout'
import ProtectedRoute from '../components/ProtectedRoute'
import {
  Section,
  Title,
  SubscriptionsGrid,
  SubscriptionCard,
  CardTitle,
  CardContent,
  CardActions,
  ActionButton,
  TrialCard,
  TrialTitle,
  CardLogo,
  LogoImage
} from '../styles/Suscriptions.styles'
import LoadingSpinner from '../components/Spinner/Spinner'

const Subscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     // Función para obtener las suscripciones del backend
//     const fetchSubscriptions = async () => {
//       try {
//         const response = await fetch('/api/subscriptions') // URL de la API
//         const data = await response.json()
//         setSubscriptions(data)
//       } catch (error) {
//         setError('Error al obtener las suscripciones.')
//         console.error('Error al obtener las suscripciones:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchSubscriptions()
//   }, [])

    useEffect(() => {
        setLoading(false)
        const subs = [
            { id: 1, name: 'Plan Basico', logo: "/hot-air-balloon.png", status: 'Activo', expirationDate: '2024-12-31' },
            { id: 2, name: 'Plan Premium', logo: "/air-plane.png", status: 'Inactivo', expirationDate: '2024-06-30' },
            // Otros planes de suscripción
        ]

        setSubscriptions(subs)
    }, [])

  return (
    <ProtectedRoute>
      <HomeLayout activePage='/admin/subscriptions'>
        <Section>
          <Title>Administrar Suscripciones</Title>
          { loading ? (
              <LoadingSpinner /> // Muestra el spinner mientras se está cargando
            ) : 
          error ? (
            <Section>{error}</Section>
          ) : (
            <SubscriptionsGrid>
              {subscriptions.length === 0 ? (
                <CardContent>No hay suscripciones para mostrar.</CardContent>
              ) : (
                subscriptions.map(sub => (
                  <SubscriptionCard key={sub.id}>
                    {sub.isTrial ? (
                      <TrialCard>
                        <TrialTitle>{sub.name}</TrialTitle>
                        <CardContent>Estado: {sub.status}</CardContent>
                        <CardContent>Fecha de Expiración: {sub.expirationDate}</CardContent>
                      </TrialCard>
                    ) : (
                      <div>
                        <CardTitle>{sub.name}</CardTitle>
                        <CardContent>Estado: {sub.status}</CardContent>
                        <CardContent>Fecha de Expiración: {sub.expirationDate}</CardContent>
                      </div>
                    )}
                    <CardLogo>
                        <LogoImage src={sub.logo} alt="Logo" />
                    </CardLogo>
                    <CardActions>
                        <ActionButton>Ver Detalles</ActionButton>
                        {sub.status === 'Activo' ? (
                                <ActionButton>Cancelar Suscripción</ActionButton>
                        ) : (
                                <ActionButton>Contratar</ActionButton>
                        )}
                    </CardActions>
                  </SubscriptionCard>
                ))
              )}
            </SubscriptionsGrid>
          )}
        </Section>
      </HomeLayout>
    </ProtectedRoute>
  )
}

export default Subscriptions
