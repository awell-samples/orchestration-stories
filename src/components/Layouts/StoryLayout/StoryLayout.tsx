import { ReactNode } from 'react'
import useSWR from 'swr'

import { BrowserWindow } from '@/components/BrowserWindow'
import { SEO } from '@/components/SEO'
import { Story } from '@/types/stories.types'

import { Header } from './atoms'

interface LayoutProps {
  storyId: string
  children: ReactNode
}

export const StoryLayout = ({ storyId, children }: LayoutProps) => {
  const { data, error } = useSWR<Story>(
    '/api/stories/' + storyId,
    (apiURL: string) => fetch(apiURL).then((res) => res.json())
  )

  if (error) {
    return <div>Something went wrong when fetching the story.</div>
  }

  if (!data) {
    return <div />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={data.title}
        description={data.description}
        url={data.path}
        canonicalUrl={data.path}
      />
      <Header
        title={data.title}
        docsUrl={data.docsUrl}
        codeUrl={data.codeUrl}
        description={data.description}
      />
      <div className="bg-slate-100/70 flex flex-col flex-grow">
        <div className="container my-16">
          <BrowserWindow>{children}</BrowserWindow>
        </div>
      </div>
    </div>
  )
}
