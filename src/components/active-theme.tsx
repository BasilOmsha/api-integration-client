import { type ReactNode, useEffect, useState } from 'react'

import { ThemeContext } from '../contexts/theme-config-context.ts'
import { setThemeCookie } from '../lib/theme-utils'
import { DEFAULT_THEME, type ThemeType } from '../lib/themes.ts'

const STORAGE_KEY = 'openapiintegration-theme-config'

export function ActiveThemeProvider({
    children,
    initialTheme
}: {
    children: ReactNode
    initialTheme?: ThemeType
}) {
    const [theme, setTheme] = useState<ThemeType>(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            try {
                return JSON.parse(stored) as ThemeType
            } catch {
                // fall back to default
            }
        }
        return initialTheme ? initialTheme : DEFAULT_THEME
    })

    useEffect(() => {
        const body = document.body

        localStorage.setItem(STORAGE_KEY, JSON.stringify(theme))

        if (theme.radius != 'default') {
            setThemeCookie('theme_radius', theme.radius)
            body.setAttribute('data-theme-radius', theme.radius)
        } else {
            setThemeCookie('theme_radius', null)
            body.removeAttribute('data-theme-radius')
        }

        setThemeCookie('theme_preset', theme.preset)
        body.setAttribute('data-theme-preset', theme.preset)

        setThemeCookie('theme_content_layout', theme.contentLayout)
        body.setAttribute('data-theme-content-layout', theme.contentLayout)

        if (theme.scale != 'none') {
            setThemeCookie('theme_scale', theme.scale)
            body.setAttribute('data-theme-scale', theme.scale)
        } else {
            setThemeCookie('theme_scale', null)
            body.removeAttribute('data-theme-scale')
        }
    }, [theme])

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
