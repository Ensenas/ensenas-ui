import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { delay } from '@/utils'

export const useLoadingView = () => {
  const [loadingView, setLoadingView] = useState(true)

  // This is to show the loading view for a minimum of 500ms
  useEffect(() => {
    delay(500).then(() => {
      setLoadingView(false)
    })
  }, [])

  return [loadingView, setLoadingView]
}

export const useIsLogged = () => {
  const { data: session } = useSession()
  return !!session
}
