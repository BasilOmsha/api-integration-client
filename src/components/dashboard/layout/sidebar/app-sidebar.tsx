import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenuButton,
    useSidebar
} from '../../../ui/sidebar.tsx'
import { ScrollArea } from '../../../ui/scroll-area.tsx'
import { NavMain } from './nav-main.tsx'
import { useIsTablet } from '../../../../hooks/use-mobile.ts'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { setOpen, setOpenMobile, isMobile } = useSidebar()
    const isTablet = useIsTablet()
    const navigate = useNavigate()

    useEffect(() => {
        if (isMobile) setOpenMobile(false)
    }, [isMobile])

    useEffect(() => {
        setOpen(!isTablet)
    }, [isTablet])

    function handleClick(): void {
        navigate('/')
    }

    return (
        // <Sidebar collapsible="icon" {...props}>
        //   <SidebarHeader>
        //     <SidebarMenuButton className="h-10 font-semibold hover:bg-primary/5 cursor-pointer">
        //       <span>🇫🇮</span>
        //       <span>Finnish Open Data</span>
        //     </SidebarMenuButton>
        //   </SidebarHeader>
        //   <SidebarContent>
        //     <ScrollArea className="h-full">
        //       <NavMain />
        //     </ScrollArea>
        //   </SidebarContent>
        // </Sidebar>

        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenuButton
                    className="hover:text-foreground h-10 group-data-[collapsible=icon]:px-0! hover:bg-[var(--primary)]/5 cursor-pointer"
                    onClick={handleClick}
                >
                    <span className="font-semibold">Open Finnish Data</span>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                <ScrollArea className="h-full">
                    <NavMain />
                </ScrollArea>
            </SidebarContent>
            {/* <SidebarFooter>
				<Card className="gap-4 overflow-hidden py-4 group-data-[collapsible=icon]:hidden">
					<CardHeader className="px-3">
						<CardTitle>Download</CardTitle>
						<CardDescription>
							
							and components.
						</CardDescription>
					</CardHeader>
					<CardContent className="px-3">
						<Button className="w-full" asChild>
							<a
								href="https:"
								target="_blank"
								rel="noopener noreferrer"
							>
								Get Shadcn UI Kit
							</a>
						</Button>
					</CardContent>
				</Card>
				<NavUser />
			</SidebarFooter> */}
        </Sidebar>
    )
}
