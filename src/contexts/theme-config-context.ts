import { createContext } from 'react'
import type { ThemeType } from '../lib/themes'

export type ThemeContextType = {
    theme: ThemeType
    setTheme: (theme: ThemeType) => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
