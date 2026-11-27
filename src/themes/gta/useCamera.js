import { useCallback, useEffect, useRef, useState } from 'react'

// Zoom + pan for an SVG map: wheel, drag, pinch, keyboard, and tweened buttons.
// Camera = { k: zoom, x, y } applied as translate(x y) scale(k) in viewBox units.
const MIN_K = 1
const MAX_K = 6

export default function useCamera(figRef, svgRef, W, H) {
    const [cam, setCam] = useState({ k: 1, x: 0, y: 0 })
    const camRef = useRef(cam)
    const tween = useRef(0)

    const clamp = useCallback((c) => {
        const k = Math.min(MAX_K, Math.max(MIN_K, c.k))
        return { k, x: Math.min(0, Math.max(W - W * k, c.x)), y: Math.min(0, Math.max(H - H * k, c.y)) }
    }, [W, H])

    const set = useCallback((c) => { const n = clamp(c); camRef.current = n; setCam(n) }, [clamp])

    const animateTo = useCallback((target) => {
        cancelAnimationFrame(tween.current)
        const from = camRef.current, to = clamp(target), t0 = performance.now()
        const step = (t) => {
            const p = Math.min(1, (t - t0) / 220), e = 1 - (1 - p) ** 3
            set({ k: from.k + (to.k - from.k) * e, x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e })
            if (p < 1) tween.current = requestAnimationFrame(step)
        }
        tween.current = requestAnimationFrame(step)
    }, [clamp, set])

    // zoom by factor f around a point given in viewBox units
    const zoomAt = useCallback((f, vx, vy, smooth) => {
        const c = camRef.current
        const k = Math.min(MAX_K, Math.max(MIN_K, c.k * f)), r = k / c.k
        const target = { k, x: vx - (vx - c.x) * r, y: vy - (vy - c.y) * r }
        if (smooth) animateTo(target); else { cancelAnimationFrame(tween.current); set(target) }
    }, [animateTo, set])

    const zoomCenter = useCallback((f) => zoomAt(f, W / 2, H / 2, true), [zoomAt, W, H])
    const reset = useCallback(() => animateTo({ k: 1, x: 0, y: 0 }), [animateTo])

    useEffect(() => {
        const el = figRef.current, svg = svgRef.current
        if (!el || !svg) return
        const ptrs = new Map()
        const toView = (x, y) => new DOMPoint(x, y).matrixTransform(svg.getScreenCTM().inverse())

        const onWheel = (e) => {
            if (camRef.current.k === 1 && e.deltaY > 0) return // let the page scroll past the map
            e.preventDefault()
            const v = toView(e.clientX, e.clientY)
            zoomAt(Math.exp(-e.deltaY * 0.0016), v.x, v.y, false)
        }
        const onDown = (e) => {
            if (e.target.closest('button')) return // map buttons keep their own clicks
            ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY })
            if (e.pointerType === 'mouse' || camRef.current.k > 1 || ptrs.size > 1) el.setPointerCapture?.(e.pointerId)
        }
        const onMove = (e) => {
            const p = ptrs.get(e.pointerId)
            if (!p) return
            const n = { x: e.clientX, y: e.clientY }
            if (ptrs.size === 1) {
                cancelAnimationFrame(tween.current)
                const s = svg.getScreenCTM().a, c = camRef.current
                set({ ...c, x: c.x + (n.x - p.x) / s, y: c.y + (n.y - p.y) / s })
            } else if (ptrs.size === 2) {
                const other = [...ptrs.entries()].find(([id]) => id !== e.pointerId)[1]
                const d0 = Math.hypot(p.x - other.x, p.y - other.y) || 1
                const d1 = Math.hypot(n.x - other.x, n.y - other.y)
                const mid = toView((n.x + other.x) / 2, (n.y + other.y) / 2)
                zoomAt(d1 / d0, mid.x, mid.y, false)
            }
            ptrs.set(e.pointerId, n)
        }
        const onUp = (e) => ptrs.delete(e.pointerId)
        const onKey = (e) => {
            const c = camRef.current, pan = 70
            const moves = { ArrowLeft: [pan, 0], ArrowRight: [-pan, 0], ArrowUp: [0, pan], ArrowDown: [0, -pan] }
            if (e.key === '+' || e.key === '=') zoomAt(1.5, W / 2, H / 2, true)
            else if (e.key === '-' || e.key === '_') zoomAt(1 / 1.5, W / 2, H / 2, true)
            else if (e.key === '0') animateTo({ k: 1, x: 0, y: 0 })
            else if (moves[e.key] && c.k > 1) animateTo({ ...c, x: c.x + moves[e.key][0], y: c.y + moves[e.key][1] })
            else return
            e.preventDefault()
        }

        el.addEventListener('wheel', onWheel, { passive: false })
        el.addEventListener('pointerdown', onDown)
        el.addEventListener('pointermove', onMove)
        el.addEventListener('pointerup', onUp)
        el.addEventListener('pointercancel', onUp)
        el.addEventListener('keydown', onKey)
        return () => {
            cancelAnimationFrame(tween.current)
            el.removeEventListener('wheel', onWheel)
            el.removeEventListener('pointerdown', onDown)
            el.removeEventListener('pointermove', onMove)
            el.removeEventListener('pointerup', onUp)
            el.removeEventListener('pointercancel', onUp)
            el.removeEventListener('keydown', onKey)
        }
    }, [figRef, svgRef, W, H, set, zoomAt, animateTo])

    return { cam, zoomCenter, reset }
}
