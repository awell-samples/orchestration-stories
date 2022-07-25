import { pickBy } from 'lodash'
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
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Patient created
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Patient information below
            </p>
          </div>
          <div className="mt-5 border-t border-gray-200">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Patient id
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {createdPatient.id}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {createdPatient.profile?.first_name ||
                  createdPatient.profile?.last_name ? (
                    <span>
                      {createdPatient.profile?.first_name}{' '}
                      {createdPatient.profile?.last_name}
                    </span>
                  ) : (
                    <span>Anonymous</span>
                  )}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {createdPatient.profile?.email}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Country</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {createdPatient.profile?.address?.country}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Street address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {createdPatient.profile?.address?.street}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">City</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {createdPatient.profile?.address?.city}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  State / Province
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {createdPatient.profile?.address?.state}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  ZIP / Postal code
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {createdPatient.profile?.address?.zip}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:cursor-not-allowed"
            onClick={() => reset()}
          >
            Create new patient
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-xl mx-auto">
        <div className="mt-5 md:mt-0 md:col-span-2">
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
                  {...register('address.zip')}
                  id="postal-code"
                  autoComplete="postal-code"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:cursor-not-allowed"
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
