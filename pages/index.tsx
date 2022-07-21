import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactNode } from 'react'

import { Kiosk } from '../src/components/Kiosk'
import { KioskLayout } from '../src/components/Layouts'
import { SEO } from '../src/components/SEO'

export default function Home() {
  return (
    <>
      <SEO
        title="Awell Kiosk"
        description=""
        preventCrawling={true}
        url="/"
        canonicalUrl="/"
      />
      <Kiosk />
    </>
  )
}

Home.getLayout = function getLayout(page: ReactNode) {
  return <KioskLayout>{page}</KioskLayout>
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
