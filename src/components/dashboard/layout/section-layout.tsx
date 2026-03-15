/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'

import { ViewCustomizerPanel } from '@/components/dashboard/layout/view-customizer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'

interface TabConfig {
    value: string
    label: string
    disabled?: boolean
    content: React.ReactNode
}

interface PageProps {
    title: string
    showExport?: boolean
    tabs?: TabConfig[]
    defaultTab?: string
    children?: React.ReactNode
}

export default function SectionRenderer({
    title,
    showExport = true,
    tabs,
    defaultTab,
    children
}: PageProps) {
    const storageKey = `dashboard-tab-${title.toLowerCase().replace(/\s+/g, '-')}`

    const getInitialTab = () => {
        if (tabs && tabs.length > 0) {
            const savedTab = localStorage.getItem(storageKey)
            const validTab = tabs.find((t) => t.value === savedTab)
            return validTab ? savedTab! : defaultTab || tabs[0].value
        }
        return defaultTab || ''
    }

    const [activeTab, setActiveTab] = useState<string>(getInitialTab)

    useEffect(() => {
        const savedTab = localStorage.getItem(storageKey)
        if (savedTab && tabs?.find((t) => t.value === savedTab)) {
            setActiveTab(savedTab)
        }
    }, [storageKey, tabs])

    // Listen for tab changes from search
    useEffect(() => {
        const handleTabChange = (event: CustomEvent) => {
            if (event.detail.storageKey === storageKey) {
                setActiveTab(event.detail.tabValue)
            }
        }

        window.addEventListener('tabChange', handleTabChange as EventListener)
        return () => window.removeEventListener('tabChange', handleTabChange as EventListener)
    }, [storageKey])

    const handleTabChange = (value: string) => {
        setActiveTab(value)
        localStorage.setItem(storageKey, value)
    }
    // If no tabs provided, render children directly
    if (!tabs || tabs.length === 0) {
        return (
            <>
                <div className="mb-4 flex flex-row items-center justify-between space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                    {showExport && (
                        <div className="flex items-center space-x-2">
                            {/* Let's have something here later */}
                        </div>
                    )}
                </div>
                <div className="space-y-4">{children}</div>
            </>
        )
    }

    // Render with tabs
    return (
        <>
            <div className="mb-4 flex flex-row items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                {showExport && (
                    <div className="flex items-center space-x-2">
                        {/* Let's have somthing here later */}
                    </div>
                )}
            </div>

            <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                    <TabsList className="z-10 flex h-auto flex-wrap flex-1">
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                disabled={tab.disabled}
                                className="cursor-pointer"
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <div className="flex items-center gap-2">
                        <ViewCustomizerPanel />
                    </div>
                </div>
                {tabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value} className="space-y-4">
                        {tab.content}
                    </TabsContent>
                ))}
            </Tabs>
        </>
    )
}
