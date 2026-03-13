import { BanIcon } from 'lucide-react'

import { Label } from '@/components/ui/label.tsx'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.tsx'

import { useThemeConfig } from '../../hooks/use-theme-config.ts'
import type { ThemeRadius } from '../../lib/themes.ts'

export function ThemeRadiusSelector() {
	const { theme, setTheme } = useThemeConfig()

	const handleRadiusChange = (value: string) => {
		const validRadii: ThemeRadius[] = [
			'none',
			'sm',
			'md',
			'lg',
			'xl',
			'default',
		]
		if (validRadii.includes(value as ThemeRadius)) {
			setTheme({ ...theme, radius: value as ThemeRadius })
		}
	}

	return (
		<div className="flex flex-col gap-4">
			<Label htmlFor="roundedCorner">Radius:</Label>
			<ToggleGroup
				value={theme.radius}
				type="single"
				onValueChange={handleRadiusChange}
				className="*:border-input w-full gap-3 *:rounded-md *:border"
			>
				<ToggleGroupItem variant="outline" value="none">
					<BanIcon />
				</ToggleGroupItem>
				<ToggleGroupItem
					variant="outline"
					value="sm"
					className="text-xs data-[variant=outline]:border-l-1"
				>
					SM
				</ToggleGroupItem>
				<ToggleGroupItem
					variant="outline"
					value="md"
					className="text-xs data-[variant=outline]:border-l-1"
				>
					MD
				</ToggleGroupItem>
				<ToggleGroupItem
					variant="outline"
					value="lg"
					className="text-xs data-[variant=outline]:border-l-1"
				>
					LG
				</ToggleGroupItem>
				<ToggleGroupItem
					variant="outline"
					value="xl"
					className="text-xs data-[variant=outline]:border-l-1"
				>
					XL
				</ToggleGroupItem>
			</ToggleGroup>
		</div>
	)
}
