import { BanIcon } from 'lucide-react'

import { Label } from '@/components/ui/label.tsx'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.tsx'

import { useThemeConfig } from '../../hooks/use-theme-config.ts'
import type { ThemeScale } from '../../lib/themes.ts'

export function ThemeScaleSelector() {
	const { theme, setTheme } = useThemeConfig()

	const handleScaleChange = (value: string) => {
		const validScales: ThemeScale[] = ['none', 'sm', 'lg']
		if (validScales.includes(value as ThemeScale)) {
			setTheme({ ...theme, scale: value as ThemeScale })
		}
	}

	return (
		<div className="flex flex-col gap-4">
			<Label htmlFor="roundedCorner">Scale:</Label>
			<div>
				<ToggleGroup
					value={theme.scale}
					type="single"
					onValueChange={handleScaleChange}
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
						XS
					</ToggleGroupItem>
					<ToggleGroupItem
						variant="outline"
						value="lg"
						className="text-xs data-[variant=outline]:border-l-1"
					>
						LG
					</ToggleGroupItem>
				</ToggleGroup>
			</div>
		</div>
	)
}
