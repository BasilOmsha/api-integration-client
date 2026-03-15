import { Button } from '@/components/ui/button.tsx'

import { DEFAULT_THEME } from '@/lib/themes'
import { useThemeConfig } from '../../hooks/use-theme-config.ts'

export function ResetThemeButton() {
    const { setTheme } = useThemeConfig()

    const resetThemeHandle = () => {
        setTheme(DEFAULT_THEME)
    }

    return (
        <Button variant="default" className="mt-4 w-full" onClick={resetThemeHandle}>
            Reset to Default
        </Button>
    )
}
