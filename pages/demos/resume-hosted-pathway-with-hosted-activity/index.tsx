import { CalendarIcon, UsersIcon } from '@heroicons/react/solid'
import { FC, ReactNode, useEffect } from 'react'

import { DemoLayout } from '@/components/Layouts/DemoLayout'
import { Spinner } from '@/components/Spinner'
import {
  usePathwayActivities,
  usePatient,
  usePatientPathways,
  useStartHostedActivitySession,
  useStartHostedPathwaySession,
} from '@/hooks/awell-orchestration'
import { ActivityStatus, PathwayStatus } from '@/types/generated/api.types'

const STORY_PATHWAY_DEFINITION_ID = 'D-WDcmIBBNpk'
const STORY_PATIENT_ID = 'ynPY9UKhXMlcu6h0dJFwb'

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
      successUrl: `https://orchestration-stories.vercel.app/demos/resume-hosted-pathway-with-hosted-activity`,
      cancelUrl: `https://orchestration-stories.vercel.app/demos/resume-hosted-pathway-with-hosted-activity`,
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
        <p>
          You already have an active pathway, let&apos;s resume it with the
          Hosted Activity Integration by clicking the button below.
        </p>
        <div className="mt-4 overflow-hidden bg-white sm:rounded-md border border-gray-200">
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

export default function DemoPage() {
  const { startHostedPathwaySession } = useStartHostedPathwaySession()
  const { patient, loading: loadingPatient } = usePatient(STORY_PATIENT_ID)
  const { patientPathways, loading: loadingPatientPathways } =
    usePatientPathways({
      patientId: STORY_PATIENT_ID,
      status: [PathwayStatus.Active],
    })

  const onStartHostedPathway = async () => {
    const session = await startHostedPathwaySession({
      pathwayDefinitionId: STORY_PATHWAY_DEFINITION_ID,
      patientId: STORY_PATIENT_ID,
      successUrl: `https://orchestration-stories.vercel.app/demos/resume-hosted-pathway-with-hosted-activity`,
      cancelUrl: `https://orchestration-stories.vercel.app/demos/resume-hosted-pathway-with-hosted-activity`,
    })

    window.location.href = session.session_url || ''
  }

  if (loadingPatient || loadingPatientPathways) {
    return (
      <div className="flex justify-center text-center">
        <Spinner size="lg" message="Loading..." />
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-bold text-xl text-slate-800 mb-4">
        You are currently logged in as &quot;{patient?.profile?.first_name}{' '}
        {patient?.profile?.last_name}&quot;
      </h2>
      {patientPathways.length === 0 ? (
        <>
          <p>There are currently no active pathways for you.</p>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:cursor-not-allowed"
              onClick={() => {
                onStartHostedPathway()
              }}
            >
              Start new pathway via Hosted Pathway
            </button>
          </div>
        </>
      ) : (
        <>
          {patientPathways.map((patientPathway) => (
            <PatientPathwayActivityList
              pathwayId={patientPathway.id}
              key={patientPathway.id}
            />
          ))}
        </>
      )}
    </div>
  )
}

DemoPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <DemoLayout
      title="Resume Hosted Pathway"
      slug="hosted-pathway"
      description="Open Awell Hosted Pages for a pathway that was already started via the Hosted Pathway integration. "
      docsUrl="#"
      codeUrl="https://github.com/awell-health/orchestration-stories/blob/main/pages/demos/resume-hosted-pathway-with-hosted-activity/index.tsx"
      browserUrl="https://yourdomain.com/"
    >
      {page}
    </DemoLayout>
  )
}
