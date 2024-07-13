import '../styles/global.css'

import { AppProps } from 'next/app'

import Provider from './providers'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Provider>
        <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp