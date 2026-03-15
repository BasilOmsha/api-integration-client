import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select.tsx'

import { useThemeConfig } from '../../hooks/use-theme-config.ts'
import { DEFAULT_THEME, THEMES, type ThemeType } from '../../lib/themes.ts'

export function PresetSelector() {
    const { theme, setTheme } = useThemeConfig()

    const handlePreset = (value: string) => {
        const selectedPreset = THEMES.find((t) => t.value === value)?.value
        if (selectedPreset) {
            setTheme({
                ...theme,
                ...DEFAULT_THEME,
                preset: selectedPreset
            } as ThemeType)
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <Label>Customize Colors & Layout:</Label>
            <Select value={theme.preset} onValueChange={(value) => handlePreset(value)}>
                <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent align="end">
                    {THEMES.map((theme) => (
                        <SelectItem key={theme.name} value={theme.value} className="cursor-pointer">
                            <div className="flex shrink-0 gap-1">
                                {theme.colors.map((color, key) => (
                                    <span
                                        key={key}
                                        className="size-2 rounded-full"
                                        style={{ backgroundColor: color }}
                                    ></span>
                                ))}
                            </div>
                            {theme.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
