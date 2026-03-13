import { useState, type ReactNode } from 'react'
import { ActiveSectionContext } from './types/active-section-context-definition.ts'

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
	const [activeSection, setActiveSectionState] = useState<string>(() => {
		// Get from localStorage on initial load
		return localStorage.getItem('activeSection') || 'technical'
	})

	const setActiveSection = (section: string) => {
		setActiveSectionState(section)
		localStorage.setItem('activeSection', section)
	}

	// Map section IDs to titles
	const sectionTitles: Record<string, string> = {
    dashboard: 'Fingrid Dashboard',
    settings: 'Settings',
    help: 'Help',
  }

	const activeSectionTitle = sectionTitles[activeSection] || 'Dashboard'

	return (
		<ActiveSectionContext.Provider
			value={{ activeSection, setActiveSection, activeSectionTitle }}
		>
			{children}
		</ActiveSectionContext.Provider>
	)
}
