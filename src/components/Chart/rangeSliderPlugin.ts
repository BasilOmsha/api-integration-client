import uPlot from 'uplot'
import { resolveCssVar } from './formatters'

export function rangeSliderPlugin(): uPlot.Plugin {
    let slider: HTMLDivElement
    let track: HTMLDivElement
    let selection: HTMLDivElement
    let handleL: HTMLDivElement
    let handleR: HTMLDivElement
    let chart: uPlot
    let fullMin: number
    let fullMax: number
    let resizeObserver: ResizeObserver

    function getPlotMetrics() {
        const bbox = chart.bbox
        if (!bbox || bbox.width === 0) return null
        const dpr = devicePixelRatio || 1
        return { left: bbox.left / dpr, width: bbox.width / dpr }
    }

    function valToPx(val: number): number {
        const m = getPlotMetrics()
        if (!m || fullMax === fullMin) return 0
        const pct = (val - fullMin) / (fullMax - fullMin)
        return m.left + pct * m.width
    }

    function pxToVal(px: number): number {
        const m = getPlotMetrics()
        if (!m || m.width === 0) return fullMin
        const pct = Math.max(0, Math.min(1, (px - m.left) / m.width))
        return fullMin + pct * (fullMax - fullMin)
    }

    function sync() {
        const m = getPlotMetrics()
        if (!m) return
        const xMin = chart.scales.x?.min
        const xMax = chart.scales.x?.max
        if (xMin == null || xMax == null || isNaN(xMin) || isNaN(xMax)) return
        track.style.left = `${m.left}px`
        track.style.width = `${m.width}px`
        const lPx = valToPx(Math.max(xMin, fullMin))
        const rPx = valToPx(Math.min(xMax, fullMax))
        handleL.style.left = `${lPx}px`
        handleR.style.left = `${rPx}px`
        selection.style.left = `${lPx}px`
        selection.style.width = `${Math.max(0, rPx - lPx)}px`
    }

    function makeDraggable(el: HTMLElement, mode: 'left' | 'right' | 'pan') {
        let startX: number
        let startMin: number
        let startMax: number

        const onMove = (e: MouseEvent | TouchEvent) => {
            const dx = ('touches' in e ? e.touches[0].clientX : e.clientX) - startX
            if (mode === 'left') {
                const newVal = pxToVal(valToPx(startMin) + dx)
                const curMax = chart.scales.x.max ?? fullMax
                const clamped = Math.max(fullMin, Math.min(newVal, curMax - 60))
                chart.setScale('x', { min: clamped, max: curMax })
            } else if (mode === 'right') {
                const newVal = pxToVal(valToPx(startMax) + dx)
                const curMin = chart.scales.x.min ?? fullMin
                const clamped = Math.min(fullMax, Math.max(newVal, curMin + 60))
                chart.setScale('x', { min: curMin, max: clamped })
            } else {
                const range = startMax - startMin
                const dVal = pxToVal(valToPx(startMin) + dx) - startMin
                let newMin = startMin + dVal
                let newMax = startMax + dVal
                if (newMin < fullMin) {
                    newMin = fullMin
                    newMax = fullMin + range
                }
                if (newMax > fullMax) {
                    newMax = fullMax
                    newMin = fullMax - range
                }
                chart.setScale('x', { min: newMin, max: newMax })
            }
        }

        const onUp = () => {
            document.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseup', onUp)
            document.removeEventListener('touchmove', onMove)
            document.removeEventListener('touchend', onUp)
            if (mode === 'pan') selection.style.cursor = 'grab'
        }

        function onStart(e: MouseEvent | TouchEvent) {
            e.preventDefault()
            e.stopPropagation()
            startX = 'touches' in e ? e.touches[0].clientX : e.clientX
            startMin = chart.scales.x.min ?? fullMin
            startMax = chart.scales.x.max ?? fullMax
            if (mode === 'pan') selection.style.cursor = 'grabbing'
            document.addEventListener('mousemove', onMove)
            document.addEventListener('mouseup', onUp)
            document.addEventListener('touchmove', onMove, { passive: false })
            document.addEventListener('touchend', onUp)
        }
        el.addEventListener('mousedown', onStart)
        el.addEventListener('touchstart', onStart, { passive: false })
    }

    function init(u: uPlot) {
        chart = u
        const ts = u.data[0]
        if (!ts || ts.length === 0) return
        fullMin = ts[0]
        fullMax = ts[ts.length - 1]

        const borderColor = resolveCssVar('var(--border)') || '#e5e7eb'
        const primaryColor = resolveCssVar('var(--primary)') || '#3b82f6'

        slider = document.createElement('div')
        slider.setAttribute('data-range-slider', '')
        slider.style.cssText =
            'flex-shrink:0;height:36px;position:relative;user-select:none;margin-bottom:20px'

        track = document.createElement('div')
        track.style.cssText = `position:absolute;top:50%;transform:translateY(-50%);height:14px;border-radius:7px;background:${borderColor}`
        slider.appendChild(track)

        selection = document.createElement('div')
        selection.style.cssText = `position:absolute;top:50%;transform:translateY(-50%);height:14px;border-radius:7px;background:${primaryColor};cursor:grab;opacity:0.6`
        slider.appendChild(selection)

        handleL = document.createElement('div')
        handleL.style.cssText = `position:absolute;top:50%;transform:translate(-50%,-50%);width:6px;height:28px;border-radius:3px;background:${primaryColor};cursor:ew-resize;z-index:2;box-shadow:0 1px 4px rgba(0,0,0,.3)`
        slider.appendChild(handleL)

        handleR = handleL.cloneNode(true) as HTMLDivElement
        slider.appendChild(handleR)

        const container = u.root.parentElement?.parentElement
        if (container) {
            container.prepend(slider)
        } else {
            u.root.prepend(slider)
        }

        requestAnimationFrame(() => sync())
        resizeObserver = new ResizeObserver(() => requestAnimationFrame(() => sync()))
        resizeObserver.observe(slider)
        makeDraggable(handleL, 'left')
        makeDraggable(handleR, 'right')
        makeDraggable(selection, 'pan')
        track.addEventListener('dblclick', () => {
            chart.setScale('x', { min: fullMin, max: fullMax })
        })
    }

    return {
        hooks: {
            ready: [init],
            destroy: [() => resizeObserver?.disconnect()],
            setScale: [
                (_u: uPlot, key: string) => {
                    if (!slider || key !== 'x') return
                    sync()
                }
            ]
        }
    }
}
