import 'uplot/dist/uPlot.min.css'
import { useState, useCallback } from 'react'
import { ChartCard } from './ChartCard'
import { ChartPlot } from './ChartPlot'
import { useChartPlot } from './useChartPlot'
import type { ChartProps } from './types'

export const Chart = (props: ChartProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const toggleFullscreen = useCallback(() => setIsFullscreen(prev => !prev), [])
  const { containerRef, isEmpty, isCombo } = useChartPlot({ ...props, isFullscreen })

  return (
    <ChartCard
      isCombo={!!isCombo}
      isLoading={props.isLoading}
      isFullscreen={isFullscreen}
      toggleFullscreen={toggleFullscreen}
    >
      <ChartPlot containerRef={containerRef} isEmpty={isEmpty} />
    </ChartCard>
  )
}