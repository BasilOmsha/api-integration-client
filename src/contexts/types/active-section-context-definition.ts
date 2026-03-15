import { createContext } from 'react'

export interface ActiveSectionContextType {
    activeSection: string
    setActiveSection: (section: string) => void
    activeSectionTitle: string
}

export const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined)
