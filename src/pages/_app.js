import '../styles/global.css'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps }) {
    console.log('MY APP PAGES')
    return (
        <main className={inter.className}>
            <Component {...pageProps} />
        </main>
    )
}