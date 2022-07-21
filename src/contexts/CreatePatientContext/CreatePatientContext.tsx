import { createContext, ReactNode, useContext, useState } from 'react'

interface CreatePatientContextStateType {
  data: { [key in string]: string }
  setPatientData: (newValues: { [key in string]: string }) => void
}

const initialState: CreatePatientContextStateType = {
  data: {},
  setPatientData: () => null,
}

export const CreatePatientContext =
  createContext<CreatePatientContextStateType>(initialState)

interface CreatePatientProviderProps {
  children: ReactNode
}

export const CreatePatientProvider = ({
  children,
}: CreatePatientProviderProps) => {
  const [data, setData] = useState(initialState.data)

  const setPatientData = (values: { [key in string]: string }) => {
    setData(() => ({
      ...data,
      ...values,
    }))
  }

  return (
    <CreatePatientContext.Provider value={{ data, setPatientData }}>
      {children}
    </CreatePatientContext.Provider>
  )
}

export const useCreatePatientContext = () => useContext(CreatePatientContext)
