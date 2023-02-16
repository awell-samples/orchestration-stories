import { pickBy } from 'lodash'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'

import { StoryLayout } from '@/components/Layouts/StoryLayout'
import { Spinner } from '@/components/Spinner'
import { useCreatePatient } from '@/hooks/awell-orchestration'
import { User } from '@/types/generated/api.types'

export default function CreatePatientStory() {
  // Loading states
  const [isCreatingPatient, setIsCreatingPatient] = useState(false)

  // State to keep track of the created patient and started pathway
  const [createdPatient, setCreatedPatient] = useState<User | null>(null)

  // React hook form to keep track of data in the form
  const { register, handleSubmit } = useForm()

  // Hooks to interact with the Awell API
  const { createPatient } = useCreatePatient()

  const reset = () => {
    setCreatedPatient(null)
  }

  const onCreatePatient = () => {
    handleSubmit(async (data) => {
      // Strip out all values with empty strings
      const sanitizedData = pickBy(data, (value) => {
        return typeof value === 'string' ? value.length > 0 : true
      })
      setIsCreatingPatient(true)
      const patient = await createPatient(sanitizedData)
      setCreatedPatient(patient)
      setIsCreatingPatient(false)
    })()
  }

  /**
   * When loading, show a spinner
   */
  if (isCreatingPatient) {
    return (
      <div className="flex justify-center text-center">
        <Spinner size="lg" message="Creating patient" />
      </div>
    )
  }

  /**
   * If patient is created, show summary
   */
  if (createdPatient) {
    return (
      <div className="max-w-xl mx-auto text-slate-600">
        <div>
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
              Patient created!
            </h3>
          </div>

          <div className="flex justify-center items-center mt-4">
            <Link
              href={`/stories/patient-profile?patientId=${createdPatient.id}`}
            >
              <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:cursor-not-allowed">
                View patient profile
              </a>
            </Link>
            <button
              type="button"
              className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blue-700 bg-blue-200 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 disabled:cursor-not-allowed"
              onClick={() => reset()}
            >
              Create new patient
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-xl mx-auto">
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
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Create patient
          </h3>
        </div>
        <div className="mt-5 md:col-span-2">
          <form onSubmit={handleSubmit(onCreatePatient)}>
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
                  {...register('first_name')}
                  className="mt-1 focus:ring-blue-600 focus:border-blue-600 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                  {...register('last_name')}
                  className="mt-1 focus:ring-blue-600 focus:border-blue-600 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                  {...register('email')}
                  className="mt-1 focus:ring-blue-600 focus:border-blue-600 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                  {...register('address.country')}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
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
                  {...register('address.street')}
                  id="street-address"
                  className="mt-1 focus:ring-blue-600 focus:border-blue-600 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                  {...register('address.city')}
                  id="city"
                  className="mt-1 focus:ring-blue-600 focus:border-blue-600 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                  {...register('address.state')}
                  id="region"
                  className="mt-1 focus:ring-blue-600 focus:border-blue-600 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                  {...register('address.zip')}
                  id="postal-code"
                  autoComplete="postal-code"
                  className="mt-1 focus:ring-blue-600 focus:border-blue-600 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:cursor-not-allowed"
              >
                Create patient
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

CreatePatientStory.getLayout = function getLayout(page: ReactNode) {
  return <StoryLayout>{page}</StoryLayout>
}
