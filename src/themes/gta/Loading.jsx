import React, { useEffect, useState } from 'react'

const TIPS = [
    'Tip: Hire the developer. Skip the heist.',
    'Tip: Press 1-5 to jump between screens.',
    'Tip: Evade the chopper on the 404 page.',
    'Tip: Every mission here is a real project.',
]

// First-visit loading screen. Skippable (button, Enter, Esc or click).
export default function Loading({ onDone }) {
    const [pct, setPct] = useState(0)
    const [tip] = useState(() => TIPS[new Date().getSeconds() % TIPS.length])

    useEffect(() => {
        const quick = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const t0 = performance.now(), dur = quick ? 300 : 2400
        let id
        const step = (t) => {
            const p = Math.min(1, (t - t0) / dur)
            setPct(Math.round(p * 100))
            if (p < 1) id = requestAnimationFrame(step); else onDone()
        }
        id = requestAnimationFrame(step)
        const onKey = (e) => { if (e.key === 'Enter' || e.key === 'Escape') onDone() }
        window.addEventListener('keydown', onKey)
        return () => { cancelAnimationFrame(id); window.removeEventListener('keydown', onKey) }
    }, [onDone])

    return (
        <div className="g-loading" role="dialog" aria-modal="true" aria-label="Loading">
            <p className="g-logo">Griffin Hongo</p>
            <p className="g-load-title">Loading Los Santos...</p>
            <div className="g-load-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><i style={{ width: `${pct}%` }} /></div>
            <p className="g-load-pct">{pct}%</p>
            <p className="g-load-tip">{tip}</p>
            <button type="button" className="g-btn g-btn--ghost cut-a" onClick={onDone} autoFocus>Skip</button>
        </div>
    )
}
