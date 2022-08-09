import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline'
import { ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { StoryLayout } from '@/components/Layouts/StoryLayout'

export default function HostedActivityStory() {
  const [sessionStatus, setSessionStatus] = useState('')
  const [pathwayCreated, setPathwayCreated] = useState(false)

  // React hook form to keep track of data in the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onStartSession = () => {
    handleSubmit(async (data) => {
      const response = await fetch('/api/examples/start-activity-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data?.email,
        }),
      }).then((res) => res.json())

      if (response?.pathway) {
        setPathwayCreated(response?.pathway)
      }
    })()
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
                  Your hosted activity session has been completed.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:text-sm"
              onClick={() => {
                setPathwayCreated(false)
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
                  Your hosted activity session was canceled. This is probably
                  due to the session being expired.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:text-sm"
              onClick={() => {
                setPathwayCreated(false)
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

  if (pathwayCreated) {
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
                Activity triggered
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  We have triggered an activity and sent a webhook to a test
                  server which sent you an email to complete the activity.{' '}
                  <span className="font-semibold text-blue-600">
                    Open your email and click the link to continue.
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:text-sm"
              onClick={() => {
                setPathwayCreated(false)
                setSessionStatus('')
              }}
            >
              Not received an email? Try again!
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit(onStartSession)}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              type="email"
              {...register('email', { required: true })}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="you@example.com"
            />
            {errors?.email && (
              <p className="pt-1 text-red-500 text-sm">Email is required</p>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-500" id="email-description">
            We will send an email to this address which allows you to start the
            hosted activity session.
          </p>
        </div>
        <button
          type="submit"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:cursor-not-allowed"
        >
          Start session
        </button>
      </form>
    </div>
  )
}

HostedActivityStory.getLayout = function getLayout(page: ReactNode) {
  return <StoryLayout>{page}</StoryLayout>
}
