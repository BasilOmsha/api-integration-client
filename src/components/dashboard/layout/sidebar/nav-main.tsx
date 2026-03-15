import { ChevronRight } from 'lucide-react'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible.tsx'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx'
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar
} from '@/components/ui/sidebar.tsx'
import { useActiveSection } from '@/hooks/use-active-section.ts'

import { navItems } from './nav-main.data.ts'

export function NavMain() {
    const { isMobile, setOpenMobile } = useSidebar()
    const { activeSection, setActiveSection } = useActiveSection()

    const handleSectionChange = (sectionId: string) => {
        setActiveSection(sectionId)
        if (isMobile) {
            setOpenMobile(false)
        }
    }

    return (
        <>
            {navItems.map((nav) => (
                <SidebarGroup key={nav.title}>
                    <SidebarGroupLabel>{nav.title}</SidebarGroupLabel>
                    <SidebarGroupContent className="flex flex-col gap-2">
                        <SidebarMenu>
                            {nav.items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    {Array.isArray(item.items) && item.items.length > 0 ? (
                                        <>
                                            <div className="hidden group-data-[collapsible=icon]:block">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <SidebarMenuButton tooltip={item.title}>
                                                            {item.icon && <item.icon />}
                                                            <span>{item.title}</span>
                                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                        </SidebarMenuButton>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        side={isMobile ? 'bottom' : 'right'}
                                                        align={isMobile ? 'end' : 'start'}
                                                        className="min-w-48 rounded-lg"
                                                    >
                                                        <DropdownMenuLabel>
                                                            {item.title}
                                                        </DropdownMenuLabel>
                                                        {item.items?.map((item) => (
                                                            <DropdownMenuItem
                                                                className="hover:text-foreground active:text-foreground hover:bg-[var(--primary)]/10! active:bg-[var(--primary)]/10!"
                                                                asChild
                                                                key={item.title}
                                                            >
                                                                <a href={`#${item.sectionId}`}>
                                                                    {item.title}
                                                                </a>
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                            <Collapsible className="group/collapsible block group-data-[collapsible=icon]:hidden">
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton
                                                        className="hover:text-foreground active:text-foreground hover:bg-[var(--primary)]/10 active:bg-[var(--primary)]/10"
                                                        tooltip={item.title}
                                                    >
                                                        {item.icon && <item.icon />}
                                                        <span>{item.title}</span>
                                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item?.items?.map((subItem, key) => (
                                                            <SidebarMenuSubItem key={key}>
                                                                <SidebarMenuSubButton
                                                                    className="hover:text-foreground active:text-foreground hover:bg-[var(--primary)]/10 active:bg-[var(--primary)]/10"
                                                                    asChild
                                                                >
                                                                    <a
                                                                        href={`#${subItem.sectionId}`}
                                                                        target={
                                                                            subItem.newTab
                                                                                ? '_blank'
                                                                                : ''
                                                                        }
                                                                        rel={
                                                                            subItem.newTab
                                                                                ? 'noopener noreferrer'
                                                                                : undefined
                                                                        }
                                                                    >
                                                                        <span>{subItem.title}</span>
                                                                    </a>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </Collapsible>
                                        </>
                                    ) : (
                                        <SidebarMenuButton
                                            className="hover:text-foreground active:text-foreground hover:bg-[var(--primary)]/10 active:bg-[var(--primary)]/10 data-[active=true]:bg-[var(--primary)]/15 data-[active=true]:text-primary cursor-pointer"
                                            tooltip={item.title}
                                            data-active={activeSection === item.sectionId}
                                            onClick={() => handleSectionChange(item.sectionId)}
                                        >
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    )}
                                    {!!item.isComing && (
                                        <SidebarMenuBadge className="peer-hover/menu-button:text-foreground opacity-50">
                                            Coming
                                        </SidebarMenuBadge>
                                    )}
                                    {!!item.isNew && (
                                        <SidebarMenuBadge className="border border-green-400 text-green-600 peer-hover/menu-button:text-green-600">
                                            New
                                        </SidebarMenuBadge>
                                    )}
                                    {!!item.isDataBadge && (
                                        <SidebarMenuBadge className="peer-hover/menu-button:text-foreground">
                                            {item.isDataBadge}
                                        </SidebarMenuBadge>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            ))}
        </>
    )
}
