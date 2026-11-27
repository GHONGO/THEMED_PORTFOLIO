import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './map.css'
import CityArt from './cityArt'
import { WORLD, pinFor } from './world'
import Chopper from './Chopper'
import useCamera from './useCamera'
import useChopper from './useChopper'
import { unlock } from './game'

const STAR = '10,1 12.6,7.2 19.4,7.7 14.2,12 15.9,18.6 10,15 4.1,18.6 5.8,12 0.6,7.7 7.4,7.2'

export default function CityMap({ path }) {
    const figRef = useRef(null), svgRef = useRef(null), worldRef = useRef(null)
    const spriteRef = useRef(null), calloutRef = useRef(null), meterRef = useRef(null), readRef = useRef(null), ptrRef = useRef(null)

    const pin = useMemo(() => pinFor(path), [path])
    const [heat, setHeat] = useState(false)
    const [wanted, setWanted] = useState(0)
    const [blast, setBlast] = useState(null)
    const [log, setLog] = useState(() => [`Dispatch: Unit 7, suspect last seen near ${path}.`])
    const [coarse] = useState(() => window.matchMedia('(pointer: coarse)').matches)
    const { cam, zoomCenter, reset } = useCamera(figRef, svgRef, WORLD.w, WORLD.h)

    const say = useCallback((msg) => setLog((l) => [...l.slice(-2), msg]), [])

    const onEvent = useCallback((type, data) => {
        if (type === 'chase') say('Air-1: Suspect spotted. Moving to intercept.')
        else if (type === 'lost') say('Air-1: Lost visual. Regrouping.')
        else if (type === 'lock') { setWanted((w) => Math.min(5, w + 1)); say('Air-1: Target acquired. Hold position!') }
        else if (type === 'escaped') { setWanted(0); say('Dispatch: Suspect evaded. All units stand down.'); unlock('ghost') }
        else if (type === 'down') { setWanted(0); setBlast(data); say('Dispatch: Air-1 is down! Repeat, Air-1 is down!'); unlock('downed') }
        else if (type === 'respawn') { setBlast(null); say('Dispatch: Backup chopper en route.') }
    }, [say])

    useChopper({ worldRef, figRef, spriteRef, calloutRef, meterRef, ptrRef, onEvent })

    // idle radio chatter + heat that builds slowly while you linger
    useEffect(() => {
        const lines = [
            `Air-1: Scanning for ${path}... nothing.`,
            'Dispatch: All units, sector unknown. Proceed with caution.',
            'Air-1: No visual. Location is not in the database.',
            'Dispatch: Rumour says an old cheat code still works: ↑ ↑ ↓ ↓ ← → ← → B A',
            `Dispatch: Unit 7, suspect last seen near ${path}.`,
        ]
        let i = 0
        const chatter = setInterval(() => say(lines[i++ % lines.length]), 5200)
        const heatUp = setInterval(() => setWanted((w) => (w < 3 ? w + 1 : w)), 7000)
        return () => { clearInterval(chatter); clearInterval(heatUp) }
    }, [path, say])

    const onPointerMove = (e) => {
        ptrRef.current = { x: e.clientX, y: e.clientY, t: performance.now(), type: e.pointerType }
        const m = worldRef.current?.getScreenCTM()
        if (m && readRef.current) {
            const w = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse())
            readRef.current.textContent = `X: ${w.x.toFixed(3)}  Y: ${w.y.toFixed(3)}`
        }
    }

    return (
        <div
            ref={figRef}
            className="g-scan cut-a"
            data-zoomed={cam.k > 1.001 || undefined}
            tabIndex={0}
            role="application"
            aria-label="Interactive map. Use plus and minus to zoom, arrow keys to pan, zero to reset."
            onPointerMove={onPointerMove}
            onPointerLeave={() => { ptrRef.current = null }}
        >
            <svg ref={svgRef} className="g-scan-svg" viewBox={`0 0 ${WORLD.w} ${WORLD.h}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <g ref={worldRef} transform={`translate(${cam.x} ${cam.y}) scale(${cam.k})`}>
                    <CityArt pin={pin} path={path} heat={heat} />
                    {blast && (
                        <g transform={`translate(${blast.x} ${blast.y}) scale(${blast.inv})`}>
                            <circle className="g-blast g-blast--1" r="56" /><circle className="g-blast g-blast--2" r="34" /><circle className="g-blast g-blast--3" r="16" />
                        </g>
                    )}
                    <Chopper spriteRef={spriteRef} />
                </g>
            </svg>
            <div className="g-scan-fx" aria-hidden="true" />

            <div className="g-scan-top">
                <div className="g-wanted" role="img" aria-label={`Wanted level ${wanted} of 5`}>
                    <span>Wanted</span>
                    {[0, 1, 2, 3, 4].map((i) => (
                        <svg key={`${i}${i < wanted}`} viewBox="0 0 20 20" className={i < wanted ? 'on' : ''} aria-hidden="true"><polygon points={STAR} /></svg>
                    ))}
                </div>
                <div ref={meterRef} className="g-evade" aria-hidden="true"><span>Evade</span><b>0.0s</b><i /></div>
            </div>

            <div className="g-scan-sig" aria-hidden="true"><b>Connection lost</b><b>Signal fading</b><span ref={readRef}>X: 0.000  Y: 0.000</span></div>

            <div className="g-scan-ctl">
                <button type="button" aria-label="Zoom in" disabled={cam.k >= 5.99} onClick={() => zoomCenter(1.6)}>+</button>
                <button type="button" aria-label="Zoom out" disabled={cam.k <= 1.001} onClick={() => zoomCenter(1 / 1.6)}>&minus;</button>
                <button type="button" aria-label={heat ? 'Show street layer' : 'Show heat layer'} aria-pressed={heat} onClick={() => setHeat((h) => !h)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 3 2 8l10 5 10-5z" /><path d="m2 13 10 5 10-5" /></svg>
                </button>
                <button type="button" className="g-scan-reset" onClick={reset}>Reset scanner</button>
            </div>

            <ul className="g-radio" aria-hidden="true">{log.map((l, i) => <li key={`${i}${l}`}>{l}</li>)}</ul>
            <p className="g-scan-hint" aria-hidden="true">{coarse ? 'Pinch or drag to explore' : 'Move over the map. Evade the chopper for 10 s'}</p>

            <div ref={calloutRef} className="g-callout" data-state="patrol" aria-hidden="true">
                <div className="c-main"><span><b>Sector unknown</b><small>Re-establishing connection...</small></span><em>Error: 404<small>Location unreachable</small></em></div>
                <div className="c-lock">Target acquired</div>
                <div className="c-esc">Signal lost. You escaped</div>
            </div>
            {blast && <p className="g-down" role="status">Air-1 down. You are free</p>}
        </div>
    )
}
