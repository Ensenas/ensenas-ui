import '../styles/global.css'

import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

import Providers from '../app/providers'
const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
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