import uPlot from 'uplot'
import { resolveCssVar } from './formatters'

export function tooltipPlugin(): uPlot.Plugin {
  let tooltip: HTMLDivElement
  let over: HTMLElement

  function init(u: uPlot) {
    over = u.over
    tooltip = document.createElement('div')
    tooltip.style.cssText = [
      'display:none',
      'position:absolute',
      'pointer-events:none',
      'z-index:100',
      'padding:8px 12px',
      'border-radius:6px',
      'font:12px/1.4 system-ui,sans-serif',
      'white-space:nowrap',
      'box-shadow:0 2px 8px rgba(0,0,0,.15)',
      'transition:opacity 80ms',
    ].join(';')
    over.appendChild(tooltip)
  }

  function setCursor(u: uPlot) {
    const idx = u.cursor.idx
    if (idx == null) {
      tooltip.style.display = 'none'
      return
    }

    const bg = resolveCssVar('var(--popover)') || '#fff'
    const fg = resolveCssVar('var(--popover-foreground)') || '#000'
    const borderColor = resolveCssVar('var(--border)') || '#e5e7eb'
    tooltip.style.background = bg
    tooltip.style.color = fg
    tooltip.style.border = `1px solid ${borderColor}`

    const ts = u.data[0][idx]
    const date = new Date(ts * 1000)
    let html = `<div style="font-weight:600;margin-bottom:4px">${date.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>`

    for (let s = 1; s < u.series.length; s++) {
      const series = u.series[s]
      if (!series.show) continue
      const val = (u.data[s] as (number | null)[])[idx]
      if (val == null) continue
      const color = typeof series.stroke === 'function' ? series.stroke(u, s) : (series.stroke as string) || '#888'
      html += `<div style="display:flex;align-items:center;gap:6px"><span style="width:14px;height:3px;border-radius:1px;background:${color};flex-shrink:0"></span>${series.label}: <strong>${val.toFixed(2)}</strong></div>`
    }

    tooltip.innerHTML = html
    tooltip.style.display = 'block'

    const cx = u.cursor.left!
    const cy = u.cursor.top!
    const ow = over.clientWidth
    const tw = tooltip.offsetWidth
    const th = tooltip.offsetHeight
    const left = cx + tw + 16 > ow ? cx - tw - 12 : cx + 12
    const top = Math.max(0, Math.min(cy - th / 2, over.clientHeight - th))
    tooltip.style.left = `${left}px`
    tooltip.style.top = `${top}px`
  }

  return { hooks: { init: [init], setCursor: [setCursor] } }
}