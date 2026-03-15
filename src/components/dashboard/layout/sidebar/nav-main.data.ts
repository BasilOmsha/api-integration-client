import { LayoutDashboardIcon, HelpCircleIcon, SettingsIcon } from 'lucide-react'

import type { NavGroup } from './types/nav-main.types.ts'

export const navItems: NavGroup[] = [
    {
        title: 'Menu',
        items: [
            {
                title: 'Dashboard',
                sectionId: 'dashboard',
                icon: LayoutDashboardIcon
            },
            {
                title: 'Settings',
                sectionId: 'settings',
                icon: SettingsIcon
            },
            {
                title: 'Help',
                sectionId: 'help',
                icon: HelpCircleIcon
            }
        ]
    }
]
