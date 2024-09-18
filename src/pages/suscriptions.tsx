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
  LogoImage,
  Status,
  CardPrice,
  PriceContent
} from '../styles/Suscriptions.styles'
import LoadingSpinner from '../components/Spinner/Spinner'
import SubscriptionDetailModal from '../components/SuscriptionDetailModal/SuscriptionDetailModal'
import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal'

const Subscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSubscription, setSelectedSubscription] = useState<any | null>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isConfirmationVisible, setConfirmationVisible] = useState<boolean>(false);



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
            { id: 1, name: 'Plan Básico', isPremium: false, background: "/BasicPlan.jpg", logo: "/hot-air-balloon.png", status: 'Activo', 
                expirationDate: '31/12/2024', price: '$2000 ARS', detalle: "Detalle Plan Basico" },
            { id: 2, name: 'Plan Premium', isPremium: true, background: "/PremiumPlan.jpg", logo: "/air-plane.png", status: 'Inactivo', 
                expirationDate: '30/06/2024', price: '$5000 ARS', detalle: "Detalle Plan Premium" },
            // Otros planes de suscripción
        ]

        setSubscriptions(subs)
    }, [])

    const handleViewDetails = (subscription: any) => {
        setSelectedSubscription(subscription);
        setModalVisible(true);
    }
    
    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedSubscription(null);
    }

    const handleCancelSubscription = (subscription: any) => {
        setSelectedSubscription(subscription);
        setConfirmationVisible(true);
      };
    
      const handleConfirmCancel = () => {
        // Aquí deberías agregar la lógica para cancelar la suscripción
        console.log(`Cancelando suscripción: ${selectedSubscription?.name}`);
        setConfirmationVisible(false);
        setSelectedSubscription(null);
      };
    
      const handleCloseConfirmation = () => {
        setConfirmationVisible(false);
        setSelectedSubscription(null);
      };

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
                    <SubscriptionCard key={sub.id} background={sub.background} isPremium={sub.isPremium} status={sub.status}>
                    {sub.isTrial ? (
                        <TrialCard background={sub.background}>
                            <TrialTitle>{sub.name}</TrialTitle>
                            <CardContent>Estado: {sub.status}</CardContent>
                            <CardContent>Fecha de Expiración: {sub.expirationDate}</CardContent>
                            <CardPrice>Precio: {sub.price} <p>/ mes</p></CardPrice>
                        </TrialCard>
                    ) : (
                        <div>
                            <CardTitle>{sub.name}</CardTitle>
                            <PriceContent>
                                <CardPrice>{sub.price}</CardPrice>
                                <p style={{fontSize: '20px', color:'#fff', marginLeft: '10px'}}>/ mes</p>
                            </PriceContent>
                            <CardContent><Status status={sub.status}>{sub.status}</Status></CardContent>
                            {/* {sub.status === 'Activo' ? (
                                <>
                                    <CardContent><Status status={sub.status}>{sub.status}</Status></CardContent>
                                </>
                            ) : (
                                <></>
                            )} */}
                        </div>
                    )}
                    <CardLogo>
                        <LogoImage src={sub.logo} alt="Logo" />
                    </CardLogo>
                    <CardActions>
                        <ActionButton onClick={() => handleViewDetails(sub)}>Ver Detalles</ActionButton>
                        {sub.status === 'Activo' ? (
                            <ActionButton onClick={() => handleCancelSubscription(sub)}>Cancelar Suscripción</ActionButton>
                        ) : (
                            <ActionButton>Suscribirse</ActionButton>
                        )}
                    </CardActions>
                </SubscriptionCard>                
                ))
              )}
            </SubscriptionsGrid>
          )}
        </Section>
      </HomeLayout>
      <SubscriptionDetailModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        subscription={selectedSubscription}
      />
      <ConfirmationModal
        isVisible={isConfirmationVisible}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmCancel}
      />
    </ProtectedRoute>
  )
}

export default Subscriptions
