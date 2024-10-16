'use client'
import { SessionProvider } from 'next-auth/react'

import { NavigationProvider } from '../context/NavigationLearningContext'

export function Providers({ children }: { children: React.ReactNode }, { session } ) {
  return (
          <SessionProvider session={session}>
            <NavigationProvider>
              {children}
            </NavigationProvider>
          </SessionProvider>
          )
}

export default Providers
