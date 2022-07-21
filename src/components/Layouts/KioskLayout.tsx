import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export const KioskLayout = ({ children }: LayoutProps) => {
  return <>{children}</>
}
