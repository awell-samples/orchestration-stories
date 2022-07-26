import clsx from 'clsx'
import { isEmpty, pickBy } from 'lodash'
import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'

import { StoryLayout } from '@/components/Layouts/StoryLayout'
import { Spinner } from '@/components/Spinner'
import { useDeletePathway } from '@/hooks/awell-orchestration/useDeletePathway'
// import { useDeletePatient } from '@/hooks/awell-orchestration/useDeletePatient'
import { usePatient } from '@/hooks/awell-orchestration/usePatient'
import { usePatientPathways } from '@/hooks/awell-orchestration/usePatientPathways'
import { useUpdatePatient } from '@/hooks/awell-orchestration/useUpdatePatient'

const tabs = [
  { name: 'Profile', href: '#' },
  { name: 'Pathways', href: '#' },
  { name: 'Settings', href: '#' },
]

const PatientPathwaysTab = () => {
  const { patientPathways, loading } = usePatientPathways({
    patientId: 'vhDI36vTIlmw3trfe7hGG',
  })
  const { deletePathway } = useDeletePathway()

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
            <svg
              className="-ml-0.5 mr-1.5 h-2 w-2 text-blue-400"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx={4} cy={4} r={3} />
            </svg>
            {status}
          </span>
        )
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
            <svg
              className="-ml-0.5 mr-1.5 h-2 w-2 text-teal-400"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx={4} cy={4} r={3} />
            </svg>
            {status}
          </span>
        )
      case 'stopped':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
            <svg
              className="-ml-0.5 mr-1.5 h-2 w-2 text-red-400"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx={4} cy={4} r={3} />
            </svg>
            {status}
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-slate-100 text-slate-800">
            <svg
              className="-ml-0.5 mr-1.5 h-2 w-2 text-slate-400"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx={4} cy={4} r={3} />
            </svg>
            {status}
          </span>
        )
    }
  }

  const onDeletePathway = async (pathwayId: string) => {
    const res = await deletePathway(pathwayId)
    console.log(res)
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Pathway
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {loading
                  ? [...Array(5)].map((number, i) => (
                      <tr key={i}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          <div className="animate-pulse h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="animate-pulse h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div className="animate-pulse h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                        </td>
                      </tr>
                    ))
                  : patientPathways.map((patientPathway) => (
                      <tr key={patientPathway.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {patientPathway.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {renderStatusBadge(patientPathway.status)}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => onDeletePathway(patientPathway.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete pathway
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const SettingsTab = ({ patientId }: { patientId: string }) => {
  // const { deletePatient } = useDeletePatient()

  const onDeletePatient = async () => {
    // const res = await deletePatient(patientId)
    // console.log(res)

    // Mock patient deletion
    alert(`Mock delete of patient with id ${patientId} successful.`)
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => onDeletePatient()}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:cursor-not-allowed"
      >
        Delete patient
      </button>
    </div>
  )
}

export default function PatientProfileStory() {
  const [activeTab, setActiveTab] = useState('Profile')
  const { patient } = usePatient('bFen_yYlCXm4Gwz_V09ls')
  const { updatePatient, loading: updatingPatient } = useUpdatePatient(
    'bFen_yYlCXm4Gwz_V09ls'
  )

  // React hook form to keep track of data in the form
  const { register, handleSubmit } = useForm()

  const onTabSelect = (tab: string) => {
    setActiveTab(tab)
  }

  const onUpdatePatient = () => {
    handleSubmit(async (data) => {
      // Strip out all values with empty strings
      const sanitizedRootData = pickBy(data, (value) => {
        return typeof value === 'string' ? value.length > 0 : true
      })
      const sanitizedAddressData = pickBy(data?.address, (value) => {
        return typeof value === 'string' ? value.length > 0 : true
      })

      const sanitizedData = {
        ...sanitizedRootData,
        address: isEmpty(sanitizedAddressData) ? null : sanitizedAddressData,
      }

      await updatePatient(sanitizedData)
    })()
  }

  if (!patient) {
    return (
      <div className="flex justify-center text-center">
        <Spinner size="lg" message="Loading patient..." />
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            {patient.profile?.first_name || patient.profile?.last_name ? (
              <span>
                {patient.profile?.first_name} {patient.profile?.last_name}
              </span>
            ) : (
              <span>Anonymous</span>
            )}
          </h1>
        </div>
      </div>
      <div className="mt-4">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            defaultValue={activeTab}
            onChange={(e) => onTabSelect(e.target.value)}
          >
            {tabs.map((tab) => (
              <option key={tab.name} value={tab.name}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  onClick={(e) => {
                    e.preventDefault()
                    onTabSelect(tab.name)
                  }}
                  className={clsx(
                    tab.name === activeTab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                  )}
                  aria-current={tab.name === activeTab ? 'page' : undefined}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <main className="mt-8">
        {activeTab === 'Profile' && (
          <form onSubmit={handleSubmit(onUpdatePatient)}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="first_name"
                  defaultValue={patient.profile?.first_name || ''}
                  {...register('first_name')}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="last_name"
                  defaultValue={patient.profile?.last_name || ''}
                  {...register('last_name')}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  defaultValue={patient.profile?.email || ''}
                  {...register('email')}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <select
                  id="country"
                  defaultValue={patient.profile?.address?.country || ''}
                  {...register('address.country')}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select a country
                  </option>
                  <option>Belgium</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                </select>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street address
                </label>
                <input
                  type="text"
                  defaultValue={patient.profile?.address?.street || ''}
                  {...register('address.street')}
                  id="street-address"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  defaultValue={patient.profile?.address?.city || ''}
                  {...register('address.city')}
                  id="city"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State / Province
                </label>
                <input
                  type="text"
                  defaultValue={patient.profile?.address?.state || ''}
                  {...register('address.state')}
                  id="region"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP / Postal code
                </label>
                <input
                  type="text"
                  defaultValue={patient.profile?.address?.zip || ''}
                  {...register('address.zip')}
                  id="postal-code"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:cursor-not-allowed"
              >
                {updatingPatient ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        )}
        {activeTab === 'Pathways' && <PatientPathwaysTab />}
        {activeTab === 'Settings' && <SettingsTab patientId={patient.id} />}
      </main>
    </div>
  )
}

PatientProfileStory.getLayout = function getLayout(page: ReactNode) {
  return <StoryLayout>{page}</StoryLayout>
}
