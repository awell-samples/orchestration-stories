import { ReactNode, useState } from 'react'

import { StoryLayout } from '@/components/Layouts/StoryLayout'
import { Spinner } from '@/components/Spinner'
import {
  useCreatePatient,
  usePublishedPathwayDefinitions,
  useStartPathway,
} from '@/hooks/awell-orchestration'
import { User } from '@/types/generated/api.types'

export default function StartPathwayStory() {
  // Loading states
  const [isCreatingPatient, setIsCreatingPatient] = useState(false)
  const [isStartingPathway, setIsStartingPathway] = useState(false)

  // State to keep track of the created patient and started pathway
  const [createdPatient, setCreatedPatient] = useState<User | null>(null)
  const [startedPathwayId, setStartedPathwayId] = useState<string | null>(null)

  // State to keep track of selected pathway
  const [selectedPathway, setSelectedPathway] = useState<string>('')

  // Hooks to interact with the Awell API
  const {
    loading: loadingPublishedPathwayDefinitions,
    publishedPathwayDefinitions,
  } = usePublishedPathwayDefinitions()

  const { startPathway } = useStartPathway()
  const { createPatient } = useCreatePatient()

  const reset = () => {
    setCreatedPatient(null)
    setStartedPathwayId(null)
    setSelectedPathway('')
  }

  /**
   * Prerequisites to start a pathway:
   * 1. We need a pathway definition id
   * 2. We need a patient resource to start a pathway for
   */
  const onStartPathway = async () => {
    setIsCreatingPatient(true)
    await createPatient({}).then(async (res) => {
      setIsCreatingPatient(false)
      setCreatedPatient(res)

      setIsStartingPathway(true)
      await startPathway({
        patient_id: res.id,
        pathway_definition_id: selectedPathway,
      }).then((res) => {
        setIsStartingPathway(false)
        setStartedPathwayId(res)
      })
    })
  }

  /**
   * When loading, show a spinner
   */
  if (
    loadingPublishedPathwayDefinitions ||
    isCreatingPatient ||
    isStartingPathway
  ) {
    const loadingMessage = loadingPublishedPathwayDefinitions
      ? 'Loading published pathway definitions'
      : isCreatingPatient
      ? 'Creating anonymous patient'
      : isStartingPathway
      ? 'Starting pathway'
      : ''

    return (
      <div className="flex justify-center text-center">
        <Spinner size="lg" message={loadingMessage} />
      </div>
    )
  }

  /**
   * When a patient was created and a pathway started,
   * show a summary
   */
  if (createdPatient && startedPathwayId) {
    return (
      <div className="max-w-xl mx-auto text-slate-600">
        <div>{`Pathway with definition id "${selectedPathway}" was started for patient with id "${createdPatient?.id}". The pathway id is "${startedPathwayId}".`}</div>
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:cursor-not-allowed"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  /**
   * Show dropdown with list of available pathways and button
   * to start the selected pathway definition.
   */
  return (
    <>
      <div className="max-w-xl mx-auto">
        <div>
          <label
            htmlFor="pathway"
            className="block text-sm font-medium text-gray-700"
          >
            Published pathways (i.e. pathways eligble for a patient to be
            included in)
          </label>
          <select
            id="location"
            name="location"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm rounded-md"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedPathway(e.target.value)
            }
            defaultValue={selectedPathway === '' ? '' : selectedPathway}
          >
            <option disabled={true} value="">
              Select pathway to start
            </option>
            {publishedPathwayDefinitions.map((publishedPathway) => (
              <option key={publishedPathway.id} value={publishedPathway.id}>
                {publishedPathway.title} ({publishedPathway.id})
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:cursor-not-allowed"
            disabled={selectedPathway === '' ? true : false}
            onClick={() => onStartPathway()}
          >
            Start pathway
          </button>
        </div>
      </div>
    </>
  )
}

StartPathwayStory.getLayout = function getLayout(page: ReactNode) {
  return <StoryLayout>{page}</StoryLayout>
}
