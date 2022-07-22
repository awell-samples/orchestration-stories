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
      <div>Coming soon</div>
    </>
  )
}
