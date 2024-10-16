/* eslint-disable react-hooks/exhaustive-deps */
// components/ProtectedRoute.js
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

import Spinner from './Spinner/Spinner'

const ProtectedRoute = ({ children }) => {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated' && !localStorage.getItem('authToken')) {
      router.replace('/login')
    }
  }, [status])

  if (status === 'loading') {
    return <Spinner />
  }

  if (status === 'unauthenticated' && !localStorage.getItem('authToken')) {
    return null
  }

  return children
}

export default ProtectedRoute
