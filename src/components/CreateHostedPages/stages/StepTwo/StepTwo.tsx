import { isEmpty } from 'lodash'
import { ChangeEvent, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

import { BaselineInfo } from '../../components/BaselineInfo'
import { CreateHostedPagesContext } from '../../context'
import { usePublishedPathwayDefinitions } from '../../hooks'

export const StepTwo = () => {
  const [
    pathwayDefinitionHasBaselineDatapoints,
    setPathwayDefinitionHasBaselineDatapoints,
  ] = useState(false)

  const {
    apiKey,
    environment,
    pathwayDefinitionId,
    setPathwayDefinitionId,
    setBaselineDataPoints,
    goToNextStage,
  } = useContext(CreateHostedPagesContext)

  const { data: publishedPathwayDefinitions, loading } =
    usePublishedPathwayDefinitions({
      apiKey,
      environment,
    })

  const {
    handleSubmit,
    formState: { errors },
    register,
    resetField,
  } = useForm({ mode: 'all' })

  const onPathwayDefinitionSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    resetField('data_points')

    const selectedPathwayId = e.target.value
    setPathwayDefinitionId(selectedPathwayId)

    const pathway = publishedPathwayDefinitions.find(
      (publishedPathway) => publishedPathway.id === selectedPathwayId
    )

    if (pathway) {
      const pathwayHasBaselineInfo = pathway?.dataPointDefinitions.length > 0

      if (pathwayHasBaselineInfo) {
        setPathwayDefinitionHasBaselineDatapoints(true)
      }
    }
  }

  const onSubmit = () => {
    handleSubmit(async (data) => {
      if (!isEmpty(data.data_points)) {
        const dp_array = Object.entries(data.data_points).map(
          ([key, value]) => {
            return {
              data_point_definition_id: key,
              value: String(value).trim(),
            }
          }
        )

        setBaselineDataPoints(dp_array)
      }

      goToNextStage()
    })()
  }

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <div>
            <label
              htmlFor="care_flow"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Care flow
            </label>
            <select
              id="care_flow"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register('care_flow', { required: true })}
              onChange={onPathwayDefinitionSelect}
              defaultValue={pathwayDefinitionId}
            >
              <option value="">Select a care flow</option>
              {publishedPathwayDefinitions.map((publishedPathway) => (
                <option value={publishedPathway.id} key={publishedPathway.id}>
                  {publishedPathway.title}
                </option>
              ))}
            </select>
            {errors?.care_flow && (
              <p className="pt-1 text-sm text-red-500">Select a care flow</p>
            )}
          </div>
          {pathwayDefinitionHasBaselineDatapoints && (
            <BaselineInfo
              register={register}
              errors={errors}
              dataPoints={
                publishedPathwayDefinitions.find(
                  (publishedPathway) =>
                    publishedPathway.id === pathwayDefinitionId
                )?.dataPointDefinitions || []
              }
            />
          )}
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={pathwayDefinitionId === ''}
          >
            Next
          </button>
        </>
      )}
    </form>
  )
}
