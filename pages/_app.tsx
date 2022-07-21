import '../styles/globals.css'

import { ApolloProvider } from '@apollo/client'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
// import Script from 'next/script'
import type { ReactElement, ReactNode } from 'react'

import client from '../src/clients/awellOrchestrationGraphQlClient'
import { KioskProvider } from '../src/contexts/KioskContext'

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
      {/* <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script id="google-analytics" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
                `}
      </Script> */}

      <ApolloProvider client={client}>
        <KioskProvider>{getLayout(<Component {...pageProps} />)}</KioskProvider>
      </ApolloProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
