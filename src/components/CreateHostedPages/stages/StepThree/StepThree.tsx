import { useContext } from 'react'

import { CreateHostedPagesContext } from '../../context'
import { useStartHostedPathway } from '../../hooks'

export const StepThree = () => {
  const { startHostedPathway } = useStartHostedPathway()
  const { apiKey, environment, pathwayDefinitionId, baselineDataPoints } =
    useContext(CreateHostedPagesContext)

  const onStartHostedPathwaySession = async () => {
    const { sessionUrl, pathwayId } = await startHostedPathway({
      apiKey,
      environment,
      pathwayDefinitionId,
      baselineDataPoints,
    })

    console.log('Pathway id: ' + pathwayId)

    if (sessionUrl) {
      window.open(sessionUrl, '_blank')?.focus()
    }
  }

  return (
    <>
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
        <div>
          <h3 className="font-semibold leading-none pb-2">Developer Tip</h3>
          When clicking the button below, we will log the pathway id in your
          console.
        </div>
      </div>
      <button
        type="button"
        onClick={() => onStartHostedPathwaySession()}
        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Start care flow and open hosted page
      </button>
    </>
  )
}
