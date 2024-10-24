'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import Image from "next/image"
import PaymentStyles from "../styles/Payment.module.scss"

import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal'
import HomeLayout from '../components/HomeLayout/HomeLayout'
import ProtectedRoute from '../components/ProtectedRoute'
import LoadingSpinner from '../components/Spinner/Spinner'
import SubscriptionDetailModal from '../components/SuscriptionDetailModal/SuscriptionDetailModal'
import { MercadoPagoButton } from "../components/MercadoPagoButton"
import { PlanBasico, PlanPremium } from "../components/Plan/Plan"

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
} from '../styles/Suscriptions.styles'

interface NotificationType {
  isOpen: boolean;
  type: "approved" | "failure" | null;
  content: string;
}

interface Subscription {
  id: number;
  name: string;
  isPremium: boolean;
  background: string;
  logo: string;
  status: string;
  expirationDate: string;
  detalle: string;
  plan: any;
  price: string;
}

const Subscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null)
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const [isConfirmationVisible, setConfirmationVisible] = useState<boolean>(false)
  const [notification, setNotification] = useState<NotificationType>({
    isOpen: false,
    type: null,
    content: "",
  })
  const router = useRouter()

  const { data: session, update } = useSession()


  const updatePlan = async (value: boolean) => {
    if (session) {
      await update({
        ...session,
        user: {
          ...session.user,
          premium: value,
        },
      })
    }
  }

  useEffect(() => {
    const handlePaymentStatus = async () => {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get("status");

        if (status === "approved") {
          if (!session?.user?.premium) { // Verifica si no es premium
            setNotification({
              content: "Pago aprobado!",
              isOpen: true,
              type: "approved",
            });
            await updatePlan(true);

          }
        } else if (status === "failure") {
          setNotification({
            content: "Pago fallido!",
            isOpen: true,
            type: "failure",
          });
        }

        window.history.pushState({}, document.title, window.location.pathname);

        setTimeout(() => {
          setNotification({ isOpen: false, type: null, content: "" });
        }, 5000);
      }
    };

    handlePaymentStatus();
  }, [router, session]);

  useEffect(() => {
    const fetchSubscriptions = () => {
      try {
        const isPremium = session?.user?.premium

        const subs: Subscription[] = [
          {
            id: 1,
            name: 'Plan Básico',
            isPremium: false,
            background: "/BasicPlan.jpg",
            logo: "/hot-air-balloon.png",
            status: isPremium ? 'Inactivo' : 'Activo',
            expirationDate: '31/12/2024',
            detalle: "Detalle Plan Basico",
            plan: PlanBasico,
            price: "$15000"
          },
          {
            id: 2,
            name: 'Plan Premium',
            isPremium: true,
            background: "/PremiumPlan.jpg",
            logo: "/air-plane.png",
            status: isPremium ? 'Activo' : 'Inactivo',
            expirationDate: '30/06/2024',
            detalle: "Detalle Plan Premium",
            plan: PlanPremium,
            price: "$22000"
          },
        ]

        setSubscriptions(subs)
        setLoading(false)
      } catch (error) {
        setError('Error al obtener las suscripciones.')
        console.error('Error al obtener las suscripciones:', error)
        setLoading(false)
      }
    }

    fetchSubscriptions()
  }, [session])

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
      console.log(`Cancelando suscripción: ${selectedSubscription.name}`)
      await updatePlan(false)
      setConfirmationVisible(false)
      setSelectedSubscription(null)
    }
  }

  const handleCloseConfirmation = () => {
    setConfirmationVisible(false)
    setSelectedSubscription(null)
  }

  if (loading) return <LoadingSpinner />
  if (error) return <Section>{error}</Section>

  return (
    <ProtectedRoute>
      <HomeLayout activePage='/suscriptions'>
        <Section>
          <Title>Administrar Suscripciones</Title>
          <SubscriptionsGrid>
            {subscriptions.map(sub => (
              <SubscriptionCard key={sub.id} background={sub.background} isPremium={sub.isPremium} status={sub.status}>
                <CardTitle>{sub.name}</CardTitle>
                <PriceContent>
                  <CardPrice>{sub.isPremium ? sub.price : 'Gratis'}</CardPrice>
                  {sub.isPremium && <p style={{ fontSize: '20px', color: '#fff', marginLeft: '10px' }}>/ mes</p>}
                </PriceContent>
                <CardContent><Status status={sub.status}>{sub.status}</Status></CardContent>
                <CardLogo>
                  <LogoImage src={sub.logo} alt="Logo" />
                </CardLogo>
                <CardActions>
                  <ActionButton onClick={() => handleViewDetails(sub)}>Ver Detalles</ActionButton>
                  {sub.status === 'Activo' && (
                    <ActionButton onClick={() => handleCancelSubscription(sub)}>Cancelar Suscripción</ActionButton>
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
          <div className={PaymentStyles.iconContainer} style={{ backgroundColor: notification.type === "approved" ? "#00cc99" : "#ee4646", }}>
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