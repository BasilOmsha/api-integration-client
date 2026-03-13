import { PanelLeftIcon, Users } from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import { useSidebar } from '@/components/ui/sidebar.tsx'
import { ThemeCustomizerPanel } from '../../../theme-customizer/panel.tsx'
import ThemeSwitch from '../../../theme-switch.tsx'
import { useViewerCount } from '@/features/useViewerCount.ts'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx'

export function SiteHeader() {
	const { toggleSidebar } = useSidebar()
	const viewerCount = useViewerCount()

	return (
		<header className="bg-background/40 sticky top-0 z-50 flex h-(--header-height) shrink-0 items-center gap-2 border-b backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) md:rounded-tl-xl md:rounded-tr-xl">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2">
				<Button onClick={toggleSidebar} size="icon" variant="ghost">
					<PanelLeftIcon />
				</Button>
				<Separator
					orientation="vertical"
					className="mx-2 data-[orientation=vertical]:h-4"
				/>
				{/* <h1 className="text-xs font-semibold md:text-lg">
					{activeSectionTitle}
				</h1> */}

				<div className="ml-auto flex items-center gap-2">
					<ThemeSwitch />
					<ThemeCustomizerPanel />
					<Separator
						orientation="vertical"
						className="mx-2 data-[orientation=vertical]:h-4"
					/>
					<Tooltip>
						<TooltipTrigger asChild>
							<div className="flex items-center gap-1.5 text-sm text-muted-foreground cursor-default">
							<Users className="h-4 w-4" />
							<span>{viewerCount}</span>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>{viewerCount} {viewerCount === 1 ? 'viewer' : 'viewers'} watching live</p>
						</TooltipContent>
					</Tooltip>	
				</div>
			</div>
		</header>
	)
}
