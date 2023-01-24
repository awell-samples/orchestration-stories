import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

import { CreateHostedPagesContext } from '../../context'
import { useTestConnection } from '../../hooks'

export const StepOne = () => {
  const [testingConnection, setTestingConnection] = useState(false)
  const [connectionError, setConnectionError] = useState(false)

  const { goToNextStage, setApiKey, setEnvironment } = useContext(
    CreateHostedPagesContext
  )

  const { testConnection } = useTestConnection()
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ mode: 'all' })

  const onSubmit = () => {
    handleSubmit(async (data) => {
      setTestingConnection(true)
      const connectionSuccessful = await testConnection({
        environment: data?.environment || '',
        apiKey: data?.apiKey || '',
      })

      setTestingConnection(false)

      if (connectionSuccessful) {
        setConnectionError(false)
        setApiKey(data?.apiKey)
        setEnvironment(data?.environment)
        goToNextStage()
      } else {
        setConnectionError(true)
      }
    })()
  }

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="environment"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Environment
        </label>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
            <input
              {...register('environment', { required: true })}
              id="sandbox"
              defaultChecked
              value="sandbox"
              type="radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="sandbox"
              className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Sandbox
            </label>
          </div>
          <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
            <input
              {...register('environment', { required: true })}
              id="production"
              value="production"
              type="radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="production"
              className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Prod (EU)
            </label>
          </div>
          <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
            <input
              {...register('environment', { required: true })}
              id="production_us"
              value="production_us"
              type="radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="production_us"
              className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Prod (US)
            </label>
          </div>
        </div>
        {errors?.environment && (
          <p className="pt-1 text-sm text-red-500">Select an environment</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          API key
        </label>
        <input
          {...register('apiKey', { required: true })}
          type="password"
          id="apiKey"
          placeholder="••••••••••••••••••••••••••••••••"
          autoComplete="off"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        {errors?.apiKey && (
          <p className="pt-1 text-sm text-red-500">API key is required</p>
        )}
      </div>
      {connectionError && (
        <div
          className="flex p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
          role="alert"
        >
          <svg
            aria-hidden="true"
            className="flex-shrink-0 inline w-5 h-5 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Connection unsuccessful!</span> Could
            not connect to the Awell API with the provided API key and
            environment. Please try again.
          </div>
        </div>
      )}
      <button
        type="submit"
        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {testingConnection ? (
          <div>
            <svg
              aria-hidden="true"
              role="status"
              className="inline mr-3 w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Testing connection...
          </div>
        ) : (
          <div>Next</div>
        )}
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        <a
          href="https://developers.awellhealth.com/awell-orchestration/docs/activities/awell-hosted-pages/what-are-awell-hosted-pages"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          What are hosted pages?
        </a>
      </p>
    </form>
  )
}
