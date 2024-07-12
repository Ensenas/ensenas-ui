import '../styles/global.css'

import { AppProps } from 'next/app'

import Provider from './providers'

function MyApp({ Component, pageProps }: AppProps) {
  console.log('MY APP APP')

  return (
    <Provider>
        <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp