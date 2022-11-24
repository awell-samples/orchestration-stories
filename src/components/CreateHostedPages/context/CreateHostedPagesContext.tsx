import { createContext, ReactNode, useContext, useState } from 'react'

interface CreateHostedPagesContextStateType {
  currentStage: number
  goToNextStage: () => void
  goToPreviousStage: () => void
  goToStage: (stage: number) => void
  apiKey: string
  environment: 'sandbox' | 'production'
  pathwayDefinitionId: string
  setApiKey: (apiKey: string) => void
  setEnvironment: (environment: 'sandbox' | 'production') => void
  setPathwayDefinitionId: (pathwayDefinitionId: string) => void
  reset: () => void
}

const initialState: CreateHostedPagesContextStateType = {
  currentStage: 0,
  goToNextStage: () => null,
  goToPreviousStage: () => null,
  goToStage: () => null,
  apiKey: '',
  environment: 'sandbox',
  pathwayDefinitionId: '',
  setApiKey: () => null,
  setEnvironment: () => null,
  setPathwayDefinitionId: () => null,
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
  const [environment, setEnvironment] = useState(initialState.environment)
  const [pathwayDefinitionId, setPathwayDefinitionId] = useState(
    initialState.pathwayDefinitionId
  )
  const [currentStage, setCurrentStage] = useState(initialState.currentStage)

  const goToNextStage = () => {
    setCurrentStage(currentStage + 1)
  }

  const goToPreviousStage = () => {
    setCurrentStage(currentStage - 1)
  }

  const goToStage = (stage: number) => {
    setCurrentStage(stage)
  }

  const reset = () => {
    setApiKey('')
    setEnvironment('sandbox')
    setPathwayDefinitionId('')
  }

  return (
    <CreateHostedPagesContext.Provider
      value={{
        currentStage,
        goToStage,
        goToNextStage,
        goToPreviousStage,
        apiKey,
        environment,
        pathwayDefinitionId,
        setApiKey,
        setEnvironment,
        setPathwayDefinitionId,
        reset,
      }}
    >
      {children}
    </CreateHostedPagesContext.Provider>
  )
}

export const useCreateHostedPagesContext = () =>
  useContext(CreateHostedPagesContext)
