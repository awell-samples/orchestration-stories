import { SearchIcon } from '@heroicons/react/outline'
import { isEmpty, isNil } from 'lodash'
import Link from 'next/link'
import { FC, ReactNode, useEffect, useState } from 'react'

import { StoryLayout } from '@/components/Layouts/StoryLayout'
import { Spinner } from '@/components/Spinner'
import {
  usePatient,
  usePublishedPathwayDefinitions,
  useStartPathway,
} from '@/hooks/awell-orchestration'

const StartPathway: FC<{ patientId: string }> = ({ patientId }) => {
  const [selectedPathwayId, setSelectedPathwayId] = useState<string>('')
  const [startedPathwayId, setStartedPathwayId] = useState<string | null>(null)
  const [isStartingPathway, setIsStartingPathway] = useState(false)

  const { patient, loading: loadingPatient } = usePatient(patientId)
  const {
    loading: loadingPublishedPathwayDefinitions,
    publishedPathwayDefinitions,
  } = usePublishedPathwayDefinitions()
  const { startPathway } = useStartPathway()

  const reset = () => {
    setStartedPathwayId(null)
    setSelectedPathwayId('')
  }

  const onStartPathway = async () => {
    setIsStartingPathway(true)
    await startPathway({
      patient_id: patientId,
      pathway_definition_id: selectedPathwayId,
    }).then((res) => {
      setIsStartingPathway(false)
      setStartedPathwayId(res)
    })
  }

  if (loadingPatient || loadingPublishedPathwayDefinitions) {
    return (
      <div className="flex justify-center text-center">
        <Spinner size="lg" message="Loading..." />
      </div>
    )
  }

  if (isNil(patient) || isEmpty(patient)) {
    return (
      <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
        <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden transform transition-all sm:my-8 sm:max-w-md sm:w-full sm:p-6">
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <SearchIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Patient not found
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  We could not find the patient you were looking for. You can
                  use the patient list to select another patient or create a new
                  one.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <Link href="/stories/patient-list">
              <a
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 sm:text-sm"
              >
                Go to patient list
              </a>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (isStartingPathway) {
    return (
      <div className="flex justify-center text-center">
        <Spinner size="lg" message="Starting a pathway..." />
      </div>
    )
  }

  if (startedPathwayId) {
    return (
      <div className="max-w-xl mx-auto text-slate-600">
        <div>
          <div className="mb-2">
            <Link href="/stories/patient-list">
              <a
                type="button"
                className="text-blue-600 text-sm hover:underline"
              >
                &#8592; Back to patient list
              </a>
            </Link>
          </div>
          <h3 className="text-center text-lg leading-6 font-medium text-gray-900">
            Pathway started!
          </h3>
        </div>
        <p className="text-sm mt-2">{`Pathway with definition id "${selectedPathwayId}" was started for patient with id "${patientId}". The pathway id is "${startedPathwayId}".`}</p>
        <div className="flex justify-center items-center mt-4">
          <Link href={`/stories/patient-profile?patientId=${patientId}`}>
            <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:cursor-not-allowed">
              View patient profile
            </a>
          </Link>
          <button
            type="button"
            className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blue-700 bg-blue-200 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 disabled:cursor-not-allowed"
            onClick={() => reset()}
          >
            Start another pathway
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
        <div className="mb-4">
          <div className="mb-2">
            <Link href="/stories/patient-list">
              <a
                type="button"
                className="text-blue-600 text-sm hover:underline"
              >
                &#8592; Back to patient list
              </a>
            </Link>
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Start a pathway for{' '}
            {patient.profile?.first_name || patient.profile?.last_name ? (
              <span>
                {patient.profile?.first_name} {patient.profile?.last_name}
              </span>
            ) : (
              <span>Anonymous</span>
            )}
          </h3>
        </div>
        <div>
          <label
            htmlFor="pathway"
            className="block text-sm font-medium text-gray-700"
          >
            Published pathways
          </label>
          <select
            id="location"
            name="location"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm rounded-md"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedPathwayId(e.target.value)
            }
            defaultValue={selectedPathwayId === '' ? '' : selectedPathwayId}
          >
            <option disabled={true} value="">
              Select pathway to start
            </option>
            {/* Filter out pathways with baseline info as they are not supported yet with in this story. */}
            {publishedPathwayDefinitions
              .filter(
                (publishedPathway) =>
                  publishedPathway.dataPointDefinitions.length === 0
              )
              .map((publishedPathway) => (
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
            disabled={selectedPathwayId === '' ? true : false}
            onClick={() => onStartPathway()}
          >
            Start pathway
          </button>
        </div>
      </div>
    </>
  )
}

export default function StartPathwayStory() {
  const [patientId, setPatientId] = useState<string | null>(null)

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)

    const patientIdQueryParam = query.get('patientId')

    if (!isEmpty(patientIdQueryParam)) {
      setPatientId(patientIdQueryParam)
    }
  }, [])

  if (!patientId) {
    return (
      <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
        <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden transform transition-all sm:my-8 sm:max-w-md sm:w-full sm:p-6">
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
              <SearchIcon
                className="h-6 w-6 text-blue-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Select a patient first
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Go to the patient list story and select a patient you would
                  like to start a pathway for. You can also create a new
                  patient.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <Link href="/stories/patient-list">
              <a
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 sm:text-sm"
              >
                Go to patient list
              </a>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <StartPathway patientId={patientId} />
}

StartPathwayStory.getLayout = function getLayout(page: ReactNode) {
  return <StoryLayout>{page}</StoryLayout>
}
