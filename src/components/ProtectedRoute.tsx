/* eslint-disable react-hooks/exhaustive-deps */
// components/ProtectedRoute.js
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status])

  if (status === 'loading') {
    return <div>Cargando...</div>
  }

  if (status === 'unauthenticated') {
    return null
  }

  return children
}

export default ProtectedRoute
