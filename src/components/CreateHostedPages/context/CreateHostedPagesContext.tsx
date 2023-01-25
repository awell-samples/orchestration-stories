import { createContext, ReactNode, useContext, useState } from 'react'

import { DataPointInput } from '@/types/generated/api.types'

type EnvironmentType = 'sandbox' | 'production' | 'production_us'

interface CreateHostedPagesContextStateType {
  currentStage: number
  goToNextStage: () => void
  apiKey: string
  environment: EnvironmentType
  pathwayDefinitionId: string
  setApiKey: (apiKey: string) => void
  setEnvironment: (environment: EnvironmentType) => void
  setPathwayDefinitionId: (pathwayDefinitionId: string) => void
  baselineDataPoints: Array<DataPointInput>
  setBaselineDataPoints: (baselineDatapoints: Array<DataPointInput>) => void
  reset: () => void
}

const initialState: CreateHostedPagesContextStateType = {
  currentStage: 0,
  goToNextStage: () => null,
  apiKey: '',
  environment: 'sandbox',
  pathwayDefinitionId: '',
  setApiKey: () => null,
  setEnvironment: () => null,
  setPathwayDefinitionId: () => null,
  baselineDataPoints: [],
  setBaselineDataPoints: () => null,
  reset: () => null,
}

export const CreateHostedPagesContext =
  createContext<CreateHostedPagesContextStateType>(initialState)

interface CreateHostedPagesProviderProps {
  children: ReactNode
}

export const CreateHostedPagesProvider = ({
  children,
}: CreateHostedPagesProviderProps) => {
  const [apiKey, setApiKey] = useState(initialState.apiKey)
  const [baselineDataPoints, setBaselineDataPoints] = useState(
    initialState.baselineDataPoints
  )
  const [environment, setEnvironment] = useState(initialState.environment)
  const [pathwayDefinitionId, setPathwayDefinitionId] = useState(
    initialState.pathwayDefinitionId
  )
  const [currentStage, setCurrentStage] = useState(initialState.currentStage)

  const goToNextStage = () => {
    setCurrentStage(currentStage + 1)
  }

  const reset = () => {
    setCurrentStage(0)
    setEnvironment('sandbox')
    setApiKey('')
    setPathwayDefinitionId('')
    setBaselineDataPoints([])
  }

  return (
    <CreateHostedPagesContext.Provider
      value={{
        currentStage,
        goToNextStage,
        apiKey,
        environment,
        pathwayDefinitionId,
        setApiKey,
        setEnvironment,
        setPathwayDefinitionId,
        baselineDataPoints,
        setBaselineDataPoints,
        reset,
      }}
    >
      {children}
    </CreateHostedPagesContext.Provider>
  )
}

export const useCreateHostedPagesContext = () =>
  useContext(CreateHostedPagesContext)
