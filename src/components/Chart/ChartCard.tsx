import { Maximize2, Minimize2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import type { ReactNode } from 'react'

interface ChartCardProps {
    isCombo: boolean
    isLoading: boolean
    isFullscreen: boolean
    toggleFullscreen: () => void
    children: ReactNode
}

export function ChartCard({
    isCombo,
    isLoading,
    isFullscreen,
    toggleFullscreen,
    children
}: ChartCardProps) {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape' && isFullscreen) toggleFullscreen()
    }

    return (
        <>
            {isFullscreen && (
                <div className="fixed inset-0 z-40 bg-background" onClick={toggleFullscreen} />
            )}
            <Card
                className={
                    isFullscreen
                        ? 'fixed inset-0 z-50 flex flex-col rounded-none border-none'
                        : 'h-full flex flex-col'
                }
                onKeyDown={handleKeyDown}
                tabIndex={-1}
            >
                <CardHeader className="flex flex-row items-center justify-between shrink-0">
                    <CardTitle>{isCombo ? 'Combined Chart' : 'Data Points'}</CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleFullscreen}
                        title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                    >
                        {isFullscreen ? (
                            <Minimize2 className="h-4 w-4" />
                        ) : (
                            <Maximize2 className="h-4 w-4" />
                        )}
                    </Button>
                </CardHeader>
                <CardContent className="flex-1 min-h-0 flex flex-col">
                    {isLoading ? <Skeleton className="w-full flex-1 min-h-75" /> : children}
                </CardContent>
            </Card>
        </>
    )
}
