import '../styles/globals.css'

import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@awell-health/ui-library'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import type { NextPage } from 'next/types'
import { type ReactElement, type ReactNode, useEffect } from 'react'

import client from '../src/clients/awellOrchestrationGraphQlClient'
import * as gtag from '../src/gtag'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: ReactNode) => page)
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

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
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <ThemeProvider accentColor="#004ac2">
        <ApolloProvider client={client}>
          {getLayout(<Component {...pageProps} />)}
        </ApolloProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
