import uPlot from 'uplot'

export function resolveCssVar(value: string): string {
  if (!value.startsWith('var(')) return value
  const match = value.match(/var\(--([^)]+)\)/)
  if (!match) return value
  return getComputedStyle(document.body).getPropertyValue(`--${match[1]}`).trim() || value
}

export function fmtDate(self: uPlot, rawValue: number, seriesIdx: number, idx: number | null) {
  void self; void seriesIdx; void idx
  return new Date(rawValue * 1000).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export function fmtTick(self: uPlot, ticks: number[], space: number, incr: number) {
  void self; void space; void incr
  return ticks.map(t => {
    const d = new Date(t * 1000)
    const range = ticks[ticks.length - 1] - ticks[0]
    if (range < 86400) return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    if (range < 86400 * 30) return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: '2-digit' })
  })
}