import { LayoutGrid } from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip.tsx'
import { useIsMobile } from '@/hooks/use-mobile.ts'

export function ViewCustomizerPanel() {
	const isMobile = useIsMobile()

	return (
		<DropdownMenu>
			<TooltipProvider delayDuration={0}>
				<Tooltip>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger asChild>
							<Button size="icon" variant="ghost">
								<LayoutGrid />
								<span className="sr-only">View Options</span>
							</Button>
						</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipContent side="bottom">
						<p>View Options</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<DropdownMenuContent
				className="w-72 p-4 shadow-xl"
				align={isMobile ? 'center' : 'end'}
			>
				<div className="grid space-y-4">
					<div className="space-y-2">
						<h4 className="font-medium text-sm">View Options</h4>
						<p className="text-muted-foreground text-xs">
							Customize how content is displayed
						</p>
					</div>
					{/* Add your custom view options here */}
					<div className="space-y-2">
						<label className="text-sm font-medium">
							Display Mode
						</label>
						<div className="flex gap-2">
							<Button
								variant="outline"
								size="sm"
								className="flex-1"
							>
								Grid
							</Button>
							<Button
								variant="outline"
								size="sm"
								className="flex-1"
							>
								List
							</Button>
							<Button
								variant="outline"
								size="sm"
								className="flex-1"
							>
								Compact
							</Button>
						</div>
					</div>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
