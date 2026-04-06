import type { RefObject } from 'react'

interface ChartPlotProps {
    containerRef: RefObject<HTMLDivElement | null>
    isEmpty: boolean
}

export function ChartPlot({ containerRef, isEmpty }: ChartPlotProps) {
    return (
        <div className="relative flex-1 min-h-[380px] flex flex-col pb-6">
            <div
                ref={containerRef}
                className="absolute inset-x-0 bottom-0 top-[15px] overflow-visible"
            />
            {isEmpty && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <span className="text-sm text-muted-foreground bg-background/80 px-3 py-1.5 rounded-md">
                        No data to display. Search a dataset to see the chart.
                    </span>
                </div>
            )}
        </div>
    )
}
