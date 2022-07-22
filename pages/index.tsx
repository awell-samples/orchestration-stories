import { ReactNode } from 'react'

import { StoryLayout } from '@/components/Layouts/StoryLayout'

import { SEO } from '../src/components/SEO'

export default function Home() {
  return (
    <>
      <SEO
        title="Awell Stories"
        description=""
        preventCrawling={true}
        url="/"
        canonicalUrl="/"
      />
      hello
    </>
  )
}

Home.getLayout = function getLayout(page: ReactNode) {
  return (
    <StoryLayout title="Create patient profile" docsUrl="#" codeUrl="#">
      {page}
    </StoryLayout>
  )
}
