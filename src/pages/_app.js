import { Inter } from 'next/font/google'
import Providers from '../app/providers'
import { SessionProvider } from "next-auth/react"
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