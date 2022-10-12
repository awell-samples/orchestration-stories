import { ReactNode } from 'react'

import { BrowserWindow } from '@/components/BrowserWindow'
import { SEO } from '@/components/SEO'

import { Header } from '../atoms'

interface LayoutProps {
  children: ReactNode
  title: string
  description: string
  slug: string
  docsUrl: string
  codeUrl: string
  browserUrl: string
  browserPadding?: boolean
}

export const DemoLayout = ({
  title,
  description,
  slug,
  docsUrl,
  codeUrl,
  browserUrl,
  children,
  browserPadding = true,
}: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={title}
        description={description}
        url={`demos/${slug}`}
        canonicalUrl={`stories/${slug}`}
      />
      <Header
        title={title}
        docsUrl={docsUrl}
        codeUrl={codeUrl}
        description={description}
      />
      <div className="bg-slate-100/70 flex flex-col flex-grow">
        <div className="container my-16">
          <BrowserWindow
            browserPadding={browserPadding}
            browserUrl={browserUrl}
          >
            {children}
          </BrowserWindow>
        </div>
      </div>
    </div>
  )
}
