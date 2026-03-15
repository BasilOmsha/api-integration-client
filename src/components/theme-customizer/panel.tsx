import { Paintbrush } from 'lucide-react'

import {
    ColorModeSelector,
    ContentLayoutSelector,
    PresetSelector,
    ResetThemeButton,
    SidebarModeSelector,
    ThemeRadiusSelector,
    ThemeScaleSelector
} from '@/components/theme-customizer/index.ts'
import { Button } from '@/components/ui/button.tsx'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip.tsx'
import { useIsMobile } from '@/hooks/use-mobile.ts'

export function ThemeCustomizerPanel() {
    const isMobile = useIsMobile()

    return (
        <DropdownMenu>
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                                <Paintbrush className="animate-tada" />
                                <span className="sr-only">Theme Customizer</span>
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        <p>Theme Customizer</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent
                className="me-4 w-72 p-4 shadow-xl lg:me-0"
                align={isMobile ? 'center' : 'end'}
            >
                <div className="grid space-y-4">
                    <PresetSelector />
                    <ThemeScaleSelector />
                    <ThemeRadiusSelector />
                    <ColorModeSelector />
                    <ContentLayoutSelector />
                    <SidebarModeSelector />
                </div>
                <ResetThemeButton />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
