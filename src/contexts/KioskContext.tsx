import React, { ReactNode, useState } from 'react'

import { Pathway, User } from '../types/generated/api.types'
import { Stages, StageTypes } from '../types/kiosk.types'

interface KioskContextStateType {
  isLanguageModalOpen: boolean
  toggleLanguageModal: () => void
  stages: Stages
  currentStage: StageTypes
  goToNextStage: () => void
  patient: User | null
  setPatient: (patient: User | null) => void
  pathway: Pathway | null
  setPathway: (pathway: Pathway | null) => void
  resetKiosk: () => void
}

const initialState: KioskContextStateType = {
  isLanguageModalOpen: false,
  toggleLanguageModal: () => null,
  stages: [
    'WELCOME',
    'IDENTIFICATION',
    'PATHWAY_SELECTION',
    'PATHWAY_ORCHESTRATION',
  ],
  currentStage: 'WELCOME',
  goToNextStage: () => null,
  patient: null,
  setPatient: () => null,
  pathway: null,
  setPathway: () => null,
  resetKiosk: () => null,
}

export const KioskContext =
  React.createContext<KioskContextStateType>(initialState)

interface KioskProviderProps {
  children: ReactNode
}

export const KioskProvider = ({ children }: KioskProviderProps) => {
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(
    initialState.isLanguageModalOpen
  )
  const [currentStage, setCurrentStage] = useState(initialState.currentStage)
  const [user, setUser] = useState<User | null>(null)
  const [kioskPathway, setKioskPathway] = useState<Pathway | null>(null)
  const stages = initialState.stages

  const toggleLanguageModal = () => setIsLanguageModalOpen(!isLanguageModalOpen)

  const setPatient = (patient: User | null) => {
    setUser(patient)
  }

  const setPathway = (pathway: Pathway | null) => {
    setKioskPathway(pathway)
  }

  const goToNextStage = () => {
    const currStageIndex = stages.findIndex((stage) => stage === currentStage)

    if (currStageIndex === -1) {
      throw new Error('Current stage not found')
    }

    if (currStageIndex === stages.length - 1) {
      throw new Error('This was the last stage')
    }

    const newCurrentStage = stages[currStageIndex + 1]

    setCurrentStage(newCurrentStage)
  }

  const resetKiosk = () => {
    setUser(null)
    setCurrentStage(stages[0])
  }

  return (
    <KioskContext.Provider
      value={{
        isLanguageModalOpen,
        toggleLanguageModal,
        stages,
        currentStage,
        goToNextStage,
        patient: user,
        setPatient,
        pathway: kioskPathway,
        setPathway,
        resetKiosk,
      }}
    >
      {children}
    </KioskContext.Provider>
  )
}
