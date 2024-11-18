'use client'

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useCallback,useEffect, useState } from 'react'

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
  Title
} from '../styles/Suscriptions.styles'

interface NotificationType {
  isOpen: boolean
  type: 'approved' | 'failure' | null
  content: string
}

interface Subscription {
  id: number
  name: string
  isPremium: boolean
  background: string
  logo: string
  status: string
  expirationDate: string
  detalle: string
  plan: any
  price: string
}

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null)
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const [isConfirmationVisible, setConfirmationVisible] = useState<boolean>(false)
  const [notification, setNotification] = useState<NotificationType>({
    isOpen: false,
    type: null,
    content: ''
  })
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false)
  const router = useRouter()

  const { data: session, status, update } = useSession()

  const updatePlan = useCallback(async (value: boolean) => {
    setIsProcessingPayment(true)
    try {
      if (status !== 'authenticated' || !session) {
        throw new Error('No hay sesión activa')
      }

      // Registrar el pago
      const paymentResponse = await fetch('/ens-api/users/register-payment', {
        method: 'POST',
        body: JSON.stringify({
          suscriptionType: value ? 'PREMIUM' : 'BASIC'
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${session.user.accessToken}`
        }
      })

      if (!paymentResponse.ok) {
        throw new Error('Error al registrar el pago')
      }

      // Actualizar la sesión
      await update({
        ...session,
        user: {
          ...session.user,
          premium: value
        }
      })

      setNotification({
        content: value ? 'Plan actualizado a Premium!' : 'Plan cambiado a Básico',
        isOpen: true,
        type: 'approved'
      })
    } catch (error) {
      console.error('Error updating plan:', error)
      setNotification({
        content: error instanceof Error ? error.message : 'Error al actualizar el plan',
        isOpen: true,
        type: 'failure'
      })
    } finally {
      setIsProcessingPayment(false)
    }
  }, [session, status, update])

  useEffect(() => {
    const handlePaymentStatus = async () => {
      if (typeof window === 'undefined' || status !== 'authenticated') return
      const urlParams = new URLSearchParams(window.location.search)
      const paymentStatus = urlParams.get('status')

      if (paymentStatus === 'approved' || paymentStatus === undefined) {
        if (!session?.user?.premium) {
          await updatePlan(true)
        }
      } else if (paymentStatus === 'failure') {
        setNotification({
          content: 'Pago fallido!',
          isOpen: true,
          type: 'failure'
        })
      }

      // Limpiar los parámetros de la URL
      router.replace('/suscriptions', undefined)
    }

    handlePaymentStatus()

    // Limpiar la notificación después de 5 segundos
    const timer = setTimeout(() => {
      setNotification({ isOpen: false, type: null, content: '' })
    }, 5000)

    // Limpiar el temporizador cuando el componente se desmonte
    return () => clearTimeout(timer)
  }, [router, session, status, updatePlan])

  useEffect(() => {
    const fetchSubscriptions = () => {
      try {
        const isPremium = session?.user?.premium

        const subs: Subscription[] = [
          {
            id: 1,
            name: 'Plan Básico',
            isPremium: false,
            background: '/BasicPlan.jpg',
            logo: '/hot-air-balloon.png',
            status: isPremium ? 'Inactivo' : 'Activo',
            expirationDate: '-',
            detalle: 'Detalle Plan Basico',
            plan: PlanBasico,
            price: '$0'
          },
          {
            id: 2,
            name: 'Plan Premium',
            isPremium: true,
            background: '/PremiumPlan.jpg',
            logo: '/air-plane.png',
            status: isPremium ? 'Activo' : 'Inactivo',
            expirationDate: '19/12/2024',
            detalle: 'Detalle Plan Premium',
            plan: PlanPremium,
            price: '$12000'
          }
        ]

        setSubscriptions(subs)
        setLoading(false)
      } catch (error) {
        setError('Error al obtener las suscripciones.')
        console.error('Error al obtener las suscripciones:', error)
        setLoading(false)
      }
    }

    if (status === 'authenticated') {
      fetchSubscriptions()
    }
  }, [session, status])

  const handleViewDetails = (subscription: Subscription) => {
    setSelectedSubscription(subscription)
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
    setSelectedSubscription(null)
  }

  const handleCancelSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription)
    setConfirmationVisible(true)
  }

  const handleConfirmCancel = async () => {
    if (selectedSubscription) {
      await updatePlan(false)
      setConfirmationVisible(false)
      setSelectedSubscription(null)
    }
  }

  const handleCloseConfirmation = () => {
    setConfirmationVisible(false)
    setSelectedSubscription(null)
  }

  if (status === 'loading' || loading || isProcessingPayment) return <LoadingSpinner />
  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }
  if (error) return <Section>{error}</Section>

  return (
    <ProtectedRoute>
      <Head>
        <title>Enseñas - Suscripciones</title>
        <meta
          name="description"
          content="Bienvenido a Enseñas, la mejor plataforma para aprender lenguaje de señas."
        />
      </Head>
      <HomeLayout activePage="/suscriptions">
        <Section>
          <Title>Administrar Suscripciones</Title>
          <SubscriptionsGrid>
            {subscriptions.map((sub) => (
              <SubscriptionCard
                key={sub.id}
                background={sub.background}
                isPremium={sub.isPremium}
                status={sub.status}
              >
                <CardTitle>{sub.name}</CardTitle>
                <PriceContent>
                  <CardPrice>{sub.isPremium ? sub.price : 'Gratis'}</CardPrice>
                  {sub.isPremium && (
                    <p style={{ fontSize: '20px', color: '#fff', marginLeft: '10px' }}>/ mes</p>
                  )}
                </PriceContent>
                <CardContent>
                  <Status status={sub.status}>{sub.status}</Status>
                </CardContent>
                <CardLogo>
                  <LogoImage src={sub.logo} alt="Logo" />
                </CardLogo>
                <CardActions>
                  <ActionButton onClick={() => handleViewDetails(sub)}>Ver Detalles</ActionButton>
                  {sub.status === 'Activo' && (
                    <ActionButton onClick={() => handleCancelSubscription(sub)}>
                      Cancelar Suscripción
                    </ActionButton>
                  )}
                  {sub.status === 'Inactivo' && sub.isPremium && (
                    <MercadoPagoButton product={sub.plan} />
                  )}
                </CardActions>
              </SubscriptionCard>
            ))}
          </SubscriptionsGrid>
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
          <div
            className={PaymentStyles.iconContainer}
            style={{ backgroundColor: notification.type === 'approved' ? '#00cc99' : '#ee4646' }}
          >
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