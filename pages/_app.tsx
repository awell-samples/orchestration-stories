import '../styles/globals.css'

import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@awell_health/ui-library'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import type { NextPage } from 'next/types'
// import Script from 'next/script'
import type { ReactElement, ReactNode } from 'react'

import client from '../src/clients/awellOrchestrationGraphQlClient'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: ReactNode) => page)
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/awell-favicon.png" />
        <link
          rel="apple-touch-icon"
          type="image/png"
          href="/awell-webclip.png"
        />
      </Head>
      <ThemeProvider accentColor="#004ac2">
        <ApolloProvider client={client}>
          {getLayout(<Component {...pageProps} />)}
        </ApolloProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
