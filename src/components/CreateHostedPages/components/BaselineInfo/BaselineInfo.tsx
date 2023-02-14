import { FC } from 'react'
import {
  DeepRequired,
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form'

import {
  type DataPointDefinition,
  DataPointValueType,
} from '../../../../types/generated/api.types'

interface BaselineInfoProps {
  dataPoints: Array<DataPointDefinition>
  register: UseFormRegister<FieldValues>
  errors: FieldErrorsImpl<DeepRequired<FieldValues>>
}

export const BaselineInfo: FC<BaselineInfoProps> = ({
  dataPoints,
  register,
  errors,
}) => {
  const SUPPORTED_INPUT_TYPES = [
    DataPointValueType.Number,
    DataPointValueType.String,
    DataPointValueType.Date,
  ]

  const determineInputType = (dataPointType: DataPointValueType) => {
    if (dataPointType === DataPointValueType.Number) {
      return 'number'
    }
    if (dataPointType === DataPointValueType.String) {
      return 'text'
    }
    if (dataPointType === DataPointValueType.Date) {
      return 'date'
    }

    return 'text'
  }

  return (
    <>
      <p className="text-sm text-slate-600">
        This care flow has <strong>baseline data points</strong>. You can
        specify a value for each data point below.
      </p>
      {dataPoints.map((dataPoint) => (
        <div key={dataPoint.id}>
          <label
            htmlFor={dataPoint.id}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {dataPoint.key}
            {!dataPoint.optional && <span className="text-red-500">*</span>}
          </label>
          <input
            {...register(`data_points[${dataPoint.id}]`, {
              required: !dataPoint.optional,
              valueAsNumber: dataPoint.valueType === DataPointValueType.Number,
            })}
            type={determineInputType(dataPoint.valueType)}
            id={dataPoint.id}
            autoComplete="off"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600"
            required={!dataPoint.optional}
            disabled={!SUPPORTED_INPUT_TYPES.includes(dataPoint.valueType)}
          />
          {dataPoint.possibleValues && dataPoint.possibleValues.length > 0 && (
            <p className="pt-2 text-sm text-slate-500">
              Only the following values are allowed:{' '}
              {dataPoint.possibleValues.map((value) => value.value).join(',')}
            </p>
          )}
          {errors?.data_points?.[dataPoint.id] && (
            <p className="pt-1 text-sm text-red-500">
              {dataPoint.key} is required
            </p>
          )}
        </div>
      ))}
    </>
  )
}
