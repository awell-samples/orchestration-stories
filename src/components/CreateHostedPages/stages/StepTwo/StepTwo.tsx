import { useContext } from 'react'
import { useForm } from 'react-hook-form'

import { CreateHostedPagesContext } from '../../context'
import { usePublishedPathwayDefinitions } from '../../hooks'

export const StepTwo = () => {
  const {
    apiKey,
    environment,
    pathwayDefinitionId,
    setPathwayDefinitionId,
    goToNextStage,
  } = useContext(CreateHostedPagesContext)
  const { data: publishedPathwayDefinitions, loading } =
    usePublishedPathwayDefinitions({
      apiKey,
      environment,
    })

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ mode: 'all' })

  const onSubmit = () => {
    handleSubmit(async (data) => {
      setPathwayDefinitionId(data?.care_flow)
      goToNextStage()
    })()
  }

  if (loading) {
    return <p>Loading</p>
  }

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div
        className="flex p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
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
          Please note that care flows with baseline data points are not
          supported yet.
        </div>
      </div>
      <div>
        <label
          htmlFor="care_flow"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Care flow
        </label>
        <select
          id="care_flow"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register('care_flow', { required: true })}
          defaultValue={pathwayDefinitionId}
        >
          {publishedPathwayDefinitions
            .filter(
              (publishedPathway) =>
                publishedPathway.dataPointDefinitions.length === 0
            )
            .map((publishedPathway) => (
              <option value={publishedPathway.id} key={publishedPathway.id}>
                {publishedPathway.title}
              </option>
            ))}
        </select>
        {errors?.care_flow && (
          <p className="pt-1 text-sm text-red-500">Select a care flow</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Next
      </button>
    </form>
  )
}
