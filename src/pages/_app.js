import '../styles/global.css'

import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'
import Modal from 'react-modal'

import Providers from '../app/providers'

Modal.setAppElement('#__next')
const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  useEffect(() => {
    // Set the app element for react-modal
    Modal.setAppElement('#__next')
  }, [])

  return (
    <main className={inter.className}>
      <SessionProvider session={session}>
        <Providers>
          <Component {...pageProps} />
        </Providers>
      </SessionProvider>
    </main>
  )
}
