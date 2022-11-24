import { useContext } from 'react'

import { CreateHostedPagesContext } from '../../context'
import { useStartHostedPathway } from '../../hooks'

export const StepThree = () => {
  const { startHostedPathway } = useStartHostedPathway()
  const { apiKey, environment, pathwayDefinitionId } = useContext(
    CreateHostedPagesContext
  )

  const onStartHostedPathwaySession = async () => {
    const sessionUrl = await startHostedPathway({
      apiKey,
      environment,
      pathwayDefinitionId,
    })

    window.open(sessionUrl, '_blank')?.focus()
  }

  return (
    <>
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
