import { ReactNode, useEffect, useState } from 'react'

import { StoryLayout } from '@/components/Layouts/StoryLayout'
import { Spinner } from '@/components/Spinner'
import { usePathwayDataPointDefinitions } from '@/hooks/awell-orchestration'
import { DataPointDefinition } from '@/types/generated/api.types'

const EXAMPLE_RELEASE_ID = '5RdmrReO_czhAZTDe30bV'
export default function DataDictionaryStory() {
  const { getPathwayDataPointDefinitions } = usePathwayDataPointDefinitions()
  const [isLoading, setIsLoading] = useState(true)
  const [dataPointDefinitions, setDataPointDefinitions] = useState<
    Array<DataPointDefinition>
  >([])

  const [releaseId, setReleaseId] = useState(EXAMPLE_RELEASE_ID)

  const fetchDataPoints = async () => {
    setIsLoading(true)
    const loadedDataPointDefinitions = await getPathwayDataPointDefinitions({
      releaseId,
    })
    setDataPointDefinitions(loadedDataPointDefinitions)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchDataPoints()
  }, [releaseId])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Data dictionary
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            On overview of all data points in a pathway.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="mb-4">
          <label
            htmlFor="releaseId"
            className="inlien-block text-sm font-medium text-slate-700"
          >
            Release ID
          </label>
          <input
            type="text"
            id="releaseId"
            placeholder="Release ID"
            value={releaseId}
            onChange={(e) => setReleaseId(e.target.value)}
            className="mt-1 focus:ring-blue-600 focus:border-blue-600 block w-full max-w-[350px] shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center text-center">
            <Spinner size="lg" message="Loading data point dictionary" />
          </div>
        ) : (
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
                        Id
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Key
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Value type
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Possible values
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {dataPointDefinitions.map((dataPointDefintion) => (
                      <tr key={dataPointDefintion.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {dataPointDefintion.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {dataPointDefintion.key}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {dataPointDefintion.category}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm sm:pr-6 text-gray-500">
                          {dataPointDefintion.valueType}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm sm:pr-6 text-gray-500">
                          {dataPointDefintion.possibleValues
                            ?.map(
                              (option) => `${option.label} (${option.value})`
                            )
                            .join(', ')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

DataDictionaryStory.getLayout = function getLayout(page: ReactNode) {
  return <StoryLayout>{page}</StoryLayout>
}
