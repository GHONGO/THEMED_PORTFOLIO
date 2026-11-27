import React, { useEffect, useRef, useState } from 'react'
import { BASE_MONEY, achievements, useGame } from './game'

// Radar with a rotating sweep (replaces the static minimap).
export function Radar() {
    return (
        <div className="g-radar" aria-hidden="true">
            <i className="g-sweep" />
            <b /><b /><b />
        </div>
    )
}

// Money counter: starts at $106800 and counts up whenever you earn something.
export function Money() {
    const { earned } = useGame()
    const target = BASE_MONEY + earned
    const [shown, setShown] = useState(target)
    const from = useRef(target)

    useEffect(() => {
        const a = from.current
        if (a === target) return
        const t0 = performance.now()
        let id
        const step = (t) => {
            const p = Math.min(1, (t - t0) / 700)
            from.current = Math.round(a + (target - a) * p)
            setShown(from.current)
            if (p < 1) id = requestAnimationFrame(step)
        }
        id = requestAnimationFrame(step)
        return () => cancelAnimationFrame(id)
    }, [target])

    return <span className="g-money" aria-hidden="true">${shown}</span>
}

// "Achievement unlocked" toast. It fades itself out with CSS, so no timers are needed.
export function Toasts() {
    const { last } = useGame()
    const a = last && achievements[last.id]
    return (
        <div className="g-toasts" aria-live="polite">
            {a && (
                <div key={last.at} className="g-toast cut-a">
                    <small>Achievement unlocked</small>
                    <b>{a.title}</b>
                    <span>{a.desc} &middot; +${a.reward.toLocaleString()}</span>
                </div>
            )}
        </div>
    )
}
