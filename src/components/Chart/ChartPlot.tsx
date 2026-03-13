import type { RefObject } from 'react'

interface ChartPlotProps {
  containerRef: RefObject<HTMLDivElement | null>
  isEmpty: boolean
}

export const ChartPlot = ({ containerRef, isEmpty }: ChartPlotProps) => (
  <div className="relative flex-1 min-h-[340px] flex flex-col">
    <div ref={containerRef} className="absolute inset-x-0 bottom-0 top-[15px] overflow-visible" />
    {isEmpty && (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <span className="text-sm text-muted-foreground bg-background/80 px-3 py-1.5 rounded-md">
          No data to display. Search a dataset to see the chart.
        </span>
      </div>
    )}
  </div>
)