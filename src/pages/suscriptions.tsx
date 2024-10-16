/* eslint-disable no-console */
'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal'
import HomeLayout from '../components/HomeLayout/HomeLayout'
import { MercadoPagoButton } from '../components/MercadoPagoButton'
import { PlanBasico, PlanPremium } from '../components/Plan/Plan'
import ProtectedRoute from '../components/ProtectedRoute'
import LoadingSpinner from '../components/Spinner/Spinner'
import SubscriptionDetailModal from '../components/SuscriptionDetailModal/SuscriptionDetailModal'
import PaymentStyles from '../styles/Payment.module.scss'
import {
  ActionButton,
  CardActions,
  CardContent,
  CardLogo,
  CardPrice,
  CardTitle,
  LogoImage,
  PriceContent,
  Section,
  Status,
  SubscriptionCard,
  SubscriptionsGrid,
  Title,
  TrialCard,
  TrialTitle
} from '../styles/Suscriptions.styles'

interface NotificationType {
  isOpen: boolean;
  type: 'approved' | 'failure' | null;
  content: string;
}

const Subscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSubscription, setSelectedSubscription] = useState<any | null>(null)
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const [isConfirmationVisible, setConfirmationVisible] = useState<boolean>(false)
  const [notification, setNotification] = useState<NotificationType>({
    isOpen: false,
    type: null,
    content: ''
  })
  const router = useRouter()

  function updatePlan(value: boolean) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('premium', value.toString())
      updateSubscriptionStatus(value)
    }
  }

  function updateSubscriptionStatus(isPremium: boolean) {
    setSubscriptions(prevSubs => prevSubs.map(sub => ({
      ...sub,
      status: sub.isPremium === isPremium ? 'Activo' : 'Inactivo'
    })))
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const status = urlParams.get('status')

      const newUrl = window.location.pathname + window.location.hash
      router.replace(newUrl, undefined)

      if (status === 'approved') {
        setNotification({
          content: 'Pago aprobado!',
          isOpen: true,
          type: 'approved'
        })
        updatePlan(true)
      } else if (status === 'failure') {
        setNotification({
          content: 'Pago fallido!',
          isOpen: true,
          type: 'failure'
        })
      }

      setTimeout(() => {
        setNotification({
          isOpen: false,
          type: null,
          content: ''
        })
      }, 5000)
    }
  }, [])

  useEffect(() => {

    try {
      const isPremium = typeof window !== 'undefined' ? localStorage.getItem('premium') === 'true' : false

      const subs = [
        {
          id: 1,
          name: 'Plan Básico',
          isPremium: false,
          background: '/BasicPlan.jpg',
          logo: '/hot-air-balloon.png',
          status: isPremium ? 'Inactivo' : 'Activo',
          expirationDate: '31/12/2024',
          detalle: 'Detalle Plan Basico',
          plan: PlanBasico,
          price: '$15000'
        },
        {
          id: 2,
          name: 'Plan Premium',
          isPremium: true,
          background: '/PremiumPlan.jpg',
          logo: '/air-plane.png',
          status: isPremium ? 'Activo' : 'Inactivo',
          expirationDate: '30/06/2024',
          detalle: 'Detalle Plan Premium',
          plan: PlanPremium,
          price: '$22000'
        }
      ]

      setSubscriptions(subs)
      setLoading(false)
    } catch (error) {
      setError('Error al obtener las suscripciones.')
      console.error('Error al obtener las suscripciones:', error)
      setLoading(false)
    }
  }, [])

  const handleViewDetails = (subscription: any) => {
    setSelectedSubscription(subscription)
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
    setSelectedSubscription(null)
  }

  const handleCancelSubscription = (subscription: any) => {
    setSelectedSubscription(subscription)
    setConfirmationVisible(true)
  }

  const handleConfirmCancel = () => {
    console.log(`Cancelando suscripción: ${selectedSubscription?.name}`)

    router.refresh()
    updatePlan(false)
    setConfirmationVisible(false)
    setSelectedSubscription(null)
  }

  const handleCloseConfirmation = () => {
    setConfirmationVisible(false)
    setSelectedSubscription(null)
  }

  return (
    <ProtectedRoute>
      <HomeLayout activePage='/suscriptions'>
        <Section>
          <Title>Administrar Suscripciones</Title>
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
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
                        {sub.isPremium ? (
                          <div>
                            <PriceContent>
                              <CardPrice>{sub.price}</CardPrice>
                              <p style={{ fontSize: '20px', color: '#fff', marginLeft: '10px' }}>/ mes</p>
                            </PriceContent>
                            <CardContent><Status status={sub.status}>{sub.status}</Status></CardContent>
                          </div>
                        ) : (
                          <div>
                            <PriceContent>
                              <CardPrice>Gratis</CardPrice>
                            </PriceContent>
                            <CardContent><Status status={sub.status}>{sub.status}</Status></CardContent>
                          </div>
                        )}

                      </div>
                    )}
                    <CardLogo>
                      <LogoImage src={sub.logo} alt="Logo" />
                    </CardLogo>
                    <CardActions>
                      <ActionButton onClick={() => handleViewDetails(sub)}>Ver Detalles</ActionButton>
                      {sub.status === 'Activo' && (
                        <div>
                          <ActionButton onClick={() => handleCancelSubscription(sub)}>Cancelar Suscripción</ActionButton>
                        </div>
                      )}
                      {sub.status === 'Inactivo' && sub.isPremium && (
                        <MercadoPagoButton product={sub.plan} />
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
      {notification.isOpen && (
        <div className={PaymentStyles.notification}>
          <div className={PaymentStyles.iconContainer} 
            style={{ backgroundColor: notification.type === 'approved' ? '#00cc99' : '#ee4646' }}>
            <Image
              src={`/${notification.type}.svg`}
              alt={notification.type!}
              width={25}
              height={25}
            />
          </div>
          <p>{notification.content}</p>
        </div>
      )}
    </ProtectedRoute>
  )
}

export default Subscriptions
