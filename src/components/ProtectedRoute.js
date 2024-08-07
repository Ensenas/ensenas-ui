// components/ProtectedRoute.js
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated' && !localStorage.getItem('authToken')) {
      router.replace('/login')
    }
  }, [status])

  if (status === 'loading') {
    return <div>Cargando...</div>
  }

  if (status === 'unauthenticated' && !localStorage.getItem('authToken')) {
    return null
  }

  return children
}

export default ProtectedRoute
