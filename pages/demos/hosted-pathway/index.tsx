/* eslint-disable @next/next/no-img-element */
import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline'
import { ReactNode, useEffect, useState } from 'react'

import { DemoLayout } from '@/components/Layouts/DemoLayout'

export default function HostedPathwayStory() {
  const [sessionStatus, setSessionStatus] = useState('')

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    if (query.get('success')) {
      setSessionStatus('success')
    }

    if (query.get('canceled')) {
      setSessionStatus('canceled')
    }
  }, [])

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
    <form
      className="text-center"
      action="/api/demos/start-pathway-session"
      method="POST"
    >
      <div className="mx-auto text-center mb-12">
        <img
          src="https://images.squarespace-cdn.com/content/v1/610196e2c5c82b0d00d6fcbf/6301f53f-f01a-48ec-ade9-3af8df7c00ed/Icon-Logo.png?format=1500w"
          width="120"
          className="mx-auto"
          alt="Demo"
        />
      </div>
      <button
        type="submit"
        className={`bg-[#9f7f00] hover:bg-[#9f7f00]/[0.9] inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-[#9f7f00] disabled:cursor-not-allowed`}
      >
        Get Started
      </button>
    </form>
  )
}

HostedPathwayStory.getLayout = function getLayout(page: ReactNode) {
  return (
    <DemoLayout
      title="Hosted Pathway Demo"
      slug="hosted-pathway"
      description="Send your clients to an Awell hosted page to complete an onboarding flow or simple pathway."
      docsUrl="#"
      codeUrl="#"
      browserUrl="https://iconhealthco.com/"
    >
      {page}
    </DemoLayout>
  )
}
