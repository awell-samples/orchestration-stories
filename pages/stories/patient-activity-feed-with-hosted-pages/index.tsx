import { CalendarIcon, UsersIcon } from '@heroicons/react/solid'
import { FC, ReactNode, useEffect, useState } from 'react'

import { StoryLayout } from '@/components/Layouts/StoryLayout'
import { Spinner } from '@/components/Spinner'
import {
  useCreatePatient,
  usePathwayActivities,
  useStartHostedActivitySession,
  useStartPathway,
} from '@/hooks/awell-orchestration'
import { ActivityStatus } from '@/types/generated/api.types'

const STORY_PATHWAY_DEFINITION_ID = 'tkwhf-3_xjrM'

const PatientPathwayActivityList: FC<{ pathwayId: string }> = ({
  pathwayId,
}) => {
  const { activities, startPolling } = usePathwayActivities(pathwayId)
  const { startHostedActivitySession } = useStartHostedActivitySession()

  const onCompleteActivities = async ({
    stakeholderId,
  }: {
    stakeholderId: string
  }) => {
    const session = await startHostedActivitySession({
      stakeholderId,
      pathwayId,
      successUrl: `http://localhost:3000/stories/patient-activity-feed-with-hosted-pages?success=true&pathwayId=${pathwayId}`,
      cancelUrl: `http://localhost:3000/stories/patient-activity-feed-with-hosted-pages?canceled=true&pathwayId=${pathwayId}`,
    })

    window.location.href = session.session_url || ''
  }

  useEffect(() => {
    startPolling(2000)
  }, [])

  const patientActivities = activities.filter(
    (activity) =>
      activity.isUserActivity === true &&
      activity.indirect_object?.type === 'PATIENT'
  )

  const pendingActivities = patientActivities.filter(
    (activity) => activity.status === 'ACTIVE'
  )

  if (patientActivities.length > 0) {
    return (
      <div>
        <h2 className="font-bold text-xl text-slate-800 mb-4">
          List of activities for the patient
        </h2>
        <div className="overflow-hidden bg-white sm:rounded-md border border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {patientActivities.map((activity) => (
              <li key={activity.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-blue-600">
                      {activity.object.type}
                    </p>
                    <div className="ml-2 flex flex-shrink-0">
                      {activity.status === ActivityStatus.Done && (
                        <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          {activity.status}
                        </p>
                      )}
                      {activity.status === ActivityStatus.Active && (
                        <p className="inline-flex rounded-full bg-orange-100 px-2 text-xs font-semibold leading-5 text-orange-800">
                          {activity.status}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <UsersIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        {activity.indirect_object?.type}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <CalendarIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <p>
                        Activated on{' '}
                        <time dateTime={activity.date}>{activity.date}</time>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          {pendingActivities.length > 0 ? (
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:text-sm"
              onClick={() => {
                const stakeholderId =
                  patientActivities[0].indirect_object?.id || ''
                onCompleteActivities({ stakeholderId })
              }}
            >
              Complete pending activities
            </button>
          ) : (
            <p>No activities to complete</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center text-center">
      <Spinner size="lg" message="Loading patient activities" />
    </div>
  )
}

export default function PatientActivityFeedWithHostedPagesStory() {
  const [isInitiatingStory, setIsInitiatingStory] = useState(true)
  const [startedPathwayId, setStartedPathwayId] = useState<string | null>(null)

  const { startPathway } = useStartPathway()
  const { createPatient } = useCreatePatient()

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)

    if (query.get('success') || query.get('canceled')) {
      const pathwayId = query.get('pathwayId')
      setStartedPathwayId(pathwayId)
      setIsInitiatingStory(false)
    } else {
      const initStory = async () => {
        const patient = await createPatient({})
        const startedPathwayId = await startPathway({
          patient_id: patient.id,
          pathway_definition_id: STORY_PATHWAY_DEFINITION_ID,
        })

        setStartedPathwayId(startedPathwayId)
        setIsInitiatingStory(false)
      }

      initStory().catch(console.error)
    }
  }, [])

  if (isInitiatingStory) {
    const loadingMessage = 'Initating story...'

    return (
      <div className="flex justify-center text-center">
        <Spinner size="lg" message={loadingMessage} />
      </div>
    )
  }

  if (startedPathwayId) {
    return <PatientPathwayActivityList pathwayId={startedPathwayId} />
  }

  return <div>Something went wrong while initiating the story.</div>
}

PatientActivityFeedWithHostedPagesStory.getLayout = function getLayout(
  page: ReactNode
) {
  return <StoryLayout>{page}</StoryLayout>
}
