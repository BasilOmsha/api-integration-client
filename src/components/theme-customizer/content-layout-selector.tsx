import { Label } from '@/components/ui/label.tsx'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.tsx'
import { useThemeConfig } from '../../hooks/use-theme-config.ts'
import type { ContentLayout } from '../../lib/themes.ts'

export function ContentLayoutSelector() {
	const { theme, setTheme } = useThemeConfig()

	const handleLayoutChange = (value: string) => {
		if (value === 'full' || value === 'centered') {
			setTheme({ ...theme, contentLayout: value as ContentLayout })
		}
	}

	return (
		<div className="hidden flex-col gap-4 lg:flex">
			<Label>Content layout</Label>
			<ToggleGroup
				value={theme.contentLayout}
				type="single"
				onValueChange={handleLayoutChange}
				className="*:border-input w-full gap-4 *:rounded-md *:border"
			>
				<ToggleGroupItem variant="outline" value="full">
					Full
				</ToggleGroupItem>
				<ToggleGroupItem
					variant="outline"
					value="centered"
					className="data-[variant=outline]:border-l-1"
				>
					Centered
				</ToggleGroupItem>
			</ToggleGroup>
		</div>
	)
}
