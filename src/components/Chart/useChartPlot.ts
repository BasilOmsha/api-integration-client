import { useMemo, useRef, useEffect } from 'react'
import uPlot from 'uplot'
import { useThemeConfig } from '@/hooks/use-theme-config'
import { useTheme } from '@/hooks/use-theme'
import { resolveCssVar, fmtDate, fmtTick } from './formatters'
import { tooltipPlugin } from './tooltipPlugin'
import { rangeSliderPlugin } from './rangeSliderPlugin'
import type { ChartProps } from './types'

const STABLE_NOW = Math.floor(Date.now() / 1000)

export function useChartPlot({ dataPoints, comboData, unit, chartType, isLoading, isFullscreen }: ChartProps & { isFullscreen: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<uPlot | null>(null)
  const hasRenderedRef = useRef(false)

  const { theme: themeConfig } = useThemeConfig()
  const { theme: colorMode } = useTheme()

  const isCombo = comboData && comboData.some(s => s.points.length > 0)
  const isEmpty = isCombo
    ? !comboData!.some(s => s.points.length > 0)
    : dataPoints.length === 0

  const comboKey = isCombo && comboData
    ? comboData.map(s => `${s.config.datasetId}|${s.config.label}|${s.config.unit}|${s.config.color}|${s.config.yAxis}`).join(',')
    : ''

  const plotData = useMemo<uPlot.AlignedData>(() => {
    if (isEmpty) return [[STABLE_NOW - 3600, STABLE_NOW], [null, null]]

    if (isCombo) {
      const timeSet = new Set<number>()
      for (const s of comboData!) {
        for (const p of s.points) {
          timeSet.add(Math.floor(new Date(p.startTime).getTime() / 1000))
        }
      }
      const times = Array.from(timeSet).sort((a, b) => a - b)
      const timeIndex = new Map(times.map((t, i) => [t, i]))
      const series: (number | null)[][] = comboData!.map(s => {
        const arr: (number | null)[] = new Array(times.length).fill(null)
        for (const p of s.points) {
          const t = Math.floor(new Date(p.startTime).getTime() / 1000)
          const idx = timeIndex.get(t)
          if (idx !== undefined) arr[idx] = p.value
        }
        return arr
      })
      return [times, ...series]
    }

    const x: number[] = []
    const y: (number | null)[] = []
    for (const p of dataPoints) {
      x.push(Math.floor(new Date(p.startTime).getTime() / 1000))
      y.push(p.value)
    }
    return [x, y]
  }, [dataPoints, comboData, isEmpty, isCombo])

  useEffect(() => {
    const el = containerRef.current
    if (!el || isLoading) return

    let ro: ResizeObserver | null = null

    const rafId = requestAnimationFrame(() => {
      const wrapper = el.parentElement!
      const sliderHeight = 36
      const width = wrapper.clientWidth
      const rawHeight = wrapper.clientHeight
      if (width === 0 || rawHeight === 0) return
      const height = Math.max(rawHeight - sliderHeight, 80)

      const colors = {
        primary: resolveCssVar('var(--primary)'),
        mutedFg: resolveCssVar('var(--muted-foreground)'),
        border: resolveCssVar('var(--border)'),
      }

      const seriesDefs: uPlot.Series[] = [{ label: 'Time', value: fmtDate }]

      if (isCombo && comboData) {
        comboData.forEach((s, i) => {
          seriesDefs.push({
            label: `${s.config.label} (${s.config.unit})`,
            stroke: s.config.color,
            width: 2,
            scale: i === 0 ? 'y' : 'y2',
            value: (_self, rawValue) => rawValue != null ? `${rawValue.toFixed(2)} ${s.config.unit}` : '--',
          })
        })
      } else {
        seriesDefs.push({
          label: `Value (${unit})`,
          stroke: colors.primary,
          width: 2,
          scale: 'y',
          paths: chartType === 'step' ? uPlot.paths.stepped!({ align: 1 }) : undefined,
          value: (_self, rawValue) => rawValue != null ? `${rawValue.toFixed(2)} ${unit}` : '--',
        })
      }

      const axes: uPlot.Axis[] = [
        {
          stroke: colors.mutedFg,
          grid: { stroke: colors.border, width: 1 },
          ticks: { stroke: colors.border, width: 1 },
          font: '11px system-ui, sans-serif',
          values: fmtTick,
        },
        {
          stroke: colors.mutedFg,
          grid: { stroke: colors.border, width: 1 },
          ticks: { stroke: colors.border, width: 1 },
          font: '11px system-ui, sans-serif',
          scale: 'y',
          label: isCombo && comboData ? comboData[0]?.config.unit ?? '' : unit,
          labelFont: '12px system-ui, sans-serif',
          labelSize: 20,
          size: 60,
        },
      ]

      if (isCombo && comboData && comboData.length > 1) {
        axes.push({
          stroke: colors.mutedFg,
          grid: { show: false },
          ticks: { stroke: colors.border, width: 1 },
          font: '11px system-ui, sans-serif',
          scale: 'y2',
          side: 1,
          label: comboData[1].config.unit,
          labelFont: '12px system-ui, sans-serif',
          labelSize: 20,
          size: 60,
        })
      }

      const scales: uPlot.Scales = { x: { time: true }, y: { auto: true } }
      if (isCombo && comboData && comboData.length > 1) {
        scales.y2 = { auto: true }
      }

      el.parentElement?.querySelectorAll('[data-range-slider]').forEach(s => s.remove())

      const oldChart = chartRef.current
      const chart = new uPlot(
        {
          width,
          height,
          series: seriesDefs,
          axes,
          scales,
          cursor: {
            drag: { x: true, y: false, setScale: true },
            focus: { prox: 30 },
            points: {
              size: 6,
              fill: (self: uPlot, si: number) => {
                const oi = isCombo ? (si === 1 ? 2 : si === 2 ? 1 : si) : si
                const s = self.series[oi] ?? self.series[si]
                return (typeof s.stroke === 'function' ? s.stroke(self, oi) : s.stroke as string) || colors.primary
              },
              stroke: (self: uPlot, si: number) => {
                const oi = isCombo ? (si === 1 ? 2 : si === 2 ? 1 : si) : si
                const s = self.series[oi] ?? self.series[si]
                return (typeof s.stroke === 'function' ? s.stroke(self, oi) : s.stroke as string) || colors.primary
              },
            },
          },
          legend: { show: true },
          plugins: isEmpty ? [tooltipPlugin()] : [tooltipPlugin(), rangeSliderPlugin()],
        // plugins: [tooltipPlugin(), rangeSliderPlugin()],
        },
        plotData,
        el,
      )
      oldChart?.destroy()
      chartRef.current = chart

      if (hasRenderedRef.current && !isEmpty) {
        el.style.transition = 'none'
        el.style.clipPath = 'inset(0 100% 0 0)'
        void el.offsetHeight
        el.style.transition = 'clip-path 450ms cubic-bezier(0.22, 1, 0.36, 1)'
        el.style.clipPath = 'inset(0 0% 0 0)'
      }
      hasRenderedRef.current = true

      ro = new ResizeObserver(entries => {
        for (const entry of entries) {
          const { width: w, height: h } = entry.contentRect
          if (w > 0 && h > 0) {
            // chart.setSize({ width: Math.floor(w), height: Math.max(Math.floor(h) - sliderHeight, 80) })
            chart.setSize({ width: Math.floor(w), height: Math.max(Math.floor(h) - sliderHeight, 80) })
          }
        }
      })
      ro.observe(wrapper)
    })

    return () => {
      cancelAnimationFrame(rafId)
      ro?.disconnect()
      el.parentElement?.querySelectorAll('[data-range-slider]').forEach(s => s.remove())
      chartRef.current?.destroy()
      chartRef.current = null
    }
  }, [plotData, unit, chartType, isCombo, comboKey, comboData, themeConfig, colorMode, isLoading, isFullscreen, isEmpty])

  return { containerRef, isEmpty, isCombo }
}