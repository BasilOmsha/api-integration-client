import {
    ActiveSectionContext,
    type ActiveSectionContextType
} from '@/contexts/types/active-section-context-definition'
import { useContext } from 'react'

export function useActiveSection(): ActiveSectionContextType {
    const context = useContext(ActiveSectionContext)
    if (context === undefined) {
        throw new Error('useActiveSection must be used within an ActiveSectionProvider')
    }
    return context
}
