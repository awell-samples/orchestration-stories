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
      setIsCreatingPatient(true)
      const patient = await createPatient(data)
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
   * When a patient was created and a pathway started,
   * show a summary
   */
  if (createdPatient) {
    return (
      <div className="max-w-xl mx-auto text-slate-600">
        <div>{`Patient with id "${createdPatient?.id}" was created.`}</div>
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:cursor-not-allowed"
            onClick={() => reset()}
          >
            Try again
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
