import { ReactNode } from 'react'

import { BrowserWindow } from '@/components/BrowserWindow'

import { Header } from './atoms'

interface LayoutProps {
  title: string
  docsUrl: string
  codeUrl: string
  description?: string
  children: ReactNode
}

export const StoryLayout = ({
  title,
  description,
  docsUrl,
  codeUrl,
  children,
}: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        title={title}
        docsUrl={docsUrl}
        codeUrl={codeUrl}
        description={description}
      />
      <div className="bg-slate-100/70 flex flex-col flex-grow">
        <div className="container my-16">
          <BrowserWindow>{children}</BrowserWindow>
        </div>
      </div>
    </div>
  )
}
