import Head from 'next/head'

import { CreateHostedPages } from '@/components/CreateHostedPages'
import { CreateHostedPagesProvider } from '@/components/CreateHostedPages/context'

export default function MyHostedPages() {
  return (
    <CreateHostedPagesProvider>
      <Head>
        <title>Create your hosted page</title>
        <meta
          name="description"
          content="Get started quickly with Awell by creating your own hosted pages session."
        />
      </Head>
      <CreateHostedPages />
    </CreateHostedPagesProvider>
  )
}
