import { ReactNode, useState } from 'react'

import { FormView } from '@/components/AwellActivity/Form/FormView'
import { DemoLayout } from '@/components/Layouts/DemoLayout'
import { useForms } from '@/hooks/awell-orchestration/useForms'

const FORM_LIBRARY_PATHWAY_DEFINITION_ID = '5z4Ekg37iu-I'

export default function CityBlockFormLibraryDemo() {
  const { loading: isLoadingForms, forms } = useForms(
    FORM_LIBRARY_PATHWAY_DEFINITION_ID
  )
  const [selectedFormId, setSelectedFormId] = useState<null | string>(null)

  if (selectedFormId) {
    const selectedForm = forms.find((form) => form.id === selectedFormId)

    if (selectedForm) {
      return (
        <>
          <div className="mb-4">
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              onClick={() => setSelectedFormId(null)}
            >
              Go back to list
            </button>
          </div>
          <FormView form={selectedForm} />
          {selectedForm.questions.length > 10 && (
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                onClick={() => setSelectedFormId(null)}
              >
                Go back to list
              </button>
            </div>
          )}
        </>
      )
    } else {
      return <p>Could not find form.</p>
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Forms</h1>
          <p className="mt-2 text-base text-gray-700">
            A list of all form elements in the last published version of your
            care flow.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
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
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Nbr of questions
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {isLoadingForms
                    ? [...Array(10)].map((pageNumber, i) => (
                        <tr key={i}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            <div className="animate-pulse h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
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
                    : forms.map((form) => (
                        <tr key={form.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {form.id}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {form.title}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {form.questions.length}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a
                              href="#"
                              className="text-blue-600 hover:text-blue-900"
                              onClick={(e) => {
                                e.preventDefault()
                                setSelectedFormId(form.id)
                              }}
                            >
                              Open form
                            </a>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

CityBlockFormLibraryDemo.getLayout = function getLayout(page: ReactNode) {
  return (
    <DemoLayout
      title="Cityblock Form Library Demo"
      slug="cityblock-form-library-demo"
      description="A demo page showing how you can use Awell to build and query forms in a care flow"
      docsUrl="#"
      codeUrl="https://github.com/awell-health/orchestration-stories/blob/main/pages/demos/cityblock/index.tsx"
      browserUrl="https://www.cityblock.com/"
    >
      {page}
    </DemoLayout>
  )
}
