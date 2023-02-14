import { CakeIcon, EmojiSadIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const ComingSoon = () => {
  const [isInterested, setIsInterested] = useState(false)
  const [apiStatus, setApiStatus] = useState<'success' | 'fail' | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmitInterest = () => {
    handleSubmit(async (data) => {
      fetch('/api/coming-soon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, storyPath: router.pathname }),
      })
        .then(() => {
          setApiStatus('success')
        })
        .catch((error) => {
          console.log(error)
          setApiStatus('fail')
        })
    })()
  }

  if (apiStatus) {
    if (apiStatus === 'success') {
      return (
        <div className="max-w-lg mx-auto">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <CakeIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              We received your request!
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Thanks for your interest, we will get back to you as soon as
              possible!
            </p>
          </div>
        </div>
      )
    }

    if (apiStatus === 'fail') {
      return (
        <div className="max-w-lg mx-auto">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <EmojiSadIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              Something went wrong
            </h3>
            <div className="mt-4">
              <p className="text-base text-gray-600">
                We had troubles receiving your request for this story. Could you
                try again?
              </p>
            </div>
          </div>
        </div>
      )
    }
  }

  if (isInterested) {
    return (
      <div className="max-w-lg mx-auto">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Thanks for your interest!
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Leave your email below so we know how to get back to you.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmitInterest)}>
          <div className="mt-4">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                {...register('email', { required: true })}
                className="mt-1 focus:ring-blue-600 focus:border-blue-600 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                Please leave your email, otherwise we will not be able to get
                back to you.
              </p>
            )}
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="submit"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 sm:text-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100">
        <EmojiSadIcon className="h-6 w-6 text-orange-600" aria-hidden="true" />
      </div>
      <div className="mt-3 text-center sm:mt-5">
        <h3
          className="text-lg leading-6 font-medium text-gray-900"
          id="modal-title"
        >
          This story is not available yet
        </h3>
        <div className="mt-4">
          <p className="text-base text-gray-600">
            <span className="font-bold">But, don&apos;t worry!</span> Press the
            button below to get us notified that you are interested in this
            story and we will get in touch with you to get you up and running.
          </p>
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 sm:text-sm"
          onClick={() => setIsInterested(true)}
        >
          I need this story!
        </button>
      </div>
    </div>
  )
}
