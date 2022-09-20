import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline'
import { ReactNode, useEffect, useState } from 'react'

import { HostedPageIframe } from '@/components/HostedPageIframe'
import { StoryLayout } from '@/components/Layouts/StoryLayout'

export default function HostedPathwayStory() {
  const [sessionStatus, setSessionStatus] = useState('')
  const [iframeUrl, setIframeUrl] = useState('')

  const onStartSession = async () => {
    const data = await fetch('/api/examples/start-pathway-session-embed', {
      method: 'POST',
    }).then((res) => res.json())

    setIframeUrl(data?.sessionUrl || '')
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    if (query.get('success')) {
      setSessionStatus('success')
    }

    if (query.get('canceled')) {
      setSessionStatus('canceled')
    }
  }, [])

  if (iframeUrl !== '') {
    return <HostedPageIframe url={iframeUrl} />
  }

  if (sessionStatus === 'success') {
    return (
      <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
        <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden transform transition-all sm:my-8 sm:max-w-md sm:w-full sm:p-6">
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckIcon
                className="h-6 w-6 text-green-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Session completed
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Your hosted pathway session has been completed.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:text-sm"
              onClick={() => {
                setSessionStatus('')
              }}
            >
              Create a new session
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (sessionStatus === 'canceled') {
    return (
      <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
        <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden transform transition-all sm:my-8 sm:max-w-md sm:w-full sm:p-6">
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <ExclamationIcon
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Session canceled
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Your hosted pathway session was canceled. This is probably due
                  to the session being expired.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:text-sm"
              onClick={() => {
                setSessionStatus('')
              }}
            >
              Create a new session
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form className="text-center">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:cursor-not-allowed"
        onClick={() => onStartSession()}
      >
        Start session
      </button>
    </form>
  )
}

HostedPathwayStory.getLayout = function getLayout(page: ReactNode) {
  return <StoryLayout>{page}</StoryLayout>
}
