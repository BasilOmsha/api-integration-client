import type { LucideIcon } from 'lucide-react'

export type TabItem = {
	value: string
	label: string
}

export type NavGroup = {
	title: string
	items: NavItem
}

export type NavItem = {
	title: string
	sectionId: string
	icon?: LucideIcon
	isComing?: boolean
	isDataBadge?: string
	isNew?: boolean
	newTab?: boolean
	tabs?: TabItem[]
	items?: NavItem
}[]
