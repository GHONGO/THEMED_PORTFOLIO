import React, { memo } from 'react'
import { WORLD, SAFEHOUSE, rng } from './world'

// A fictional city drawn in SVG (coastline, districts, street grids, arteries, parks).
// Generated from a seeded random generator, so it is identical on every load.
const LAND = 'M130 0H1200V500H420C380 440 300 450 250 400C190 350 230 300 170 250C110 200 160 120 130 0Z'
const zones = [
    { id: 'z1', x: 380, y: 110, w: 400, h: 320, deg: 0, step: 24 },
    { id: 'z2', x: 130, y: 0, w: 880, h: 150, deg: 14, step: 34 },
    { id: 'z3', x: 770, y: 100, w: 430, h: 400, deg: -12, step: 30 },
    { id: 'z4', x: 180, y: 320, w: 300, h: 180, deg: 28, step: 32 },
]

function grid({ x, y, w, h, deg, step }, r) {
    const a = (deg * Math.PI) / 180, cos = Math.cos(a), sin = Math.sin(a)
    const cx = x + w / 2, cy = y + h / 2, R = Math.hypot(w, h) / 2
    const pt = (u, v) => `${(cx + u * cos - v * sin).toFixed(1)} ${(cy + u * sin + v * cos).toFixed(1)}`
    let d = ''
    for (let o = -R; o <= R; o += step * (0.7 + r() * 0.6)) d += `M${pt(o, -R)}L${pt(o, R)}M${pt(-R, o)}L${pt(R, o)}`
    return d
}

const streets = (() => { const r = rng(7); return zones.map((z) => ({ id: z.id, d: grid(z, r) })) })()
const graticule = (() => { let d = ''; for (let x = 100; x < 1200; x += 100) d += `M${x} 0V500`; for (let y = 100; y < 500; y += 100) d += `M0 ${y}H1200`; return d })()
const heatSpots = (() => { const r = rng(31); return Array.from({ length: 9 }, () => ({ x: 200 + r() * 900, y: 60 + r() * 380, r: 50 + r() * 70, o: 0.35 + r() * 0.4 })) })()

const arteries = [
    'M120 300C320 260 480 300 620 250S940 180 1200 220',
    'M420 0C440 140 560 200 600 330S640 460 700 500',
    'M760 0C780 120 900 160 960 300S1040 440 1090 500',
    'M300 60C500 90 700 70 900 110S1100 90 1200 60',
]
const labels = [
    { x: 520, y: 200, t: 'Downtown Dev', s: 17 }, { x: 250, y: 90, t: 'Codewood Hills', s: 15 },
    { x: 940, y: 380, t: 'Port Hongo', s: 15 }, { x: 330, y: 440, t: 'Git Harbor', s: 13 },
    { x: 1020, y: 160, t: 'Localhost Park', s: 13 }, { x: 40, y: 150, t: 'Pixel Bay', s: 15, water: true },
    { x: 24, y: 458, t: 'Null Island', s: 12, water: true },
]

function CityArt({ pin, path, heat }) {
    return (
        <>
            <defs>
                <clipPath id="g-land"><path d={LAND} /></clipPath>
                {zones.map((z) => <clipPath key={z.id} id={`g-${z.id}`}><rect x={z.x} y={z.y} width={z.w} height={z.h} /></clipPath>)}
                <radialGradient id="g-heat"><stop offset="0" stopColor="#ff4d3d" stopOpacity="0.95" /><stop offset=".45" stopColor="#ff9a1f" stopOpacity=".55" /><stop offset="1" stopColor="#ffd43d" stopOpacity="0" /></radialGradient>
            </defs>

            <rect width={WORLD.w} height={WORLD.h} fill="#071419" />
            <path d={graticule} stroke="#38e1f2" strokeWidth=".6" opacity=".1" />
            <path d={LAND} fill="#0f1d19" stroke="#5fd8a6" strokeWidth="2" opacity=".95" />
            <ellipse cx="880" cy="300" rx="72" ry="34" fill="#071419" stroke="#5fd8a6" strokeWidth="1.5" opacity=".9" />
            <ellipse cx="70" cy="440" rx="26" ry="12" fill="#0f1d19" stroke="#5fd8a6" strokeWidth="1.2" />

            <g clipPath="url(#g-land)">
                <ellipse cx="1030" cy="190" rx="70" ry="34" fill="#12301f" />
                <ellipse cx="300" cy="120" rx="80" ry="30" fill="#12301f" />
                <ellipse cx="640" cy="400" rx="60" ry="26" fill="#12301f" />
                {streets.map((s) => (
                    <g key={s.id} clipPath={`url(#g-${s.id})`}><path d={s.d} stroke="#8fb3a4" strokeWidth="1" opacity=".26" fill="none" /></g>
                ))}
                {arteries.map((d) => <path key={d} d={d} stroke="#d8ece2" strokeWidth="3" opacity=".55" fill="none" strokeLinecap="round" />)}
                <ellipse cx="570" cy="262" rx="230" ry="120" stroke="#d8ece2" strokeWidth="2" opacity=".4" fill="none" />
                <path d="M806 290L954 312" stroke="#d8ece2" strokeWidth="3" opacity=".6" />
            </g>

            {labels.map((l) => <text key={l.t} x={l.x} y={l.y} fontSize={l.s} className={`g-lbl${l.water ? ' g-lbl--w' : ''}`}>{l.t}</text>)}

            <g className="g-heat" opacity={heat ? 1 : 0}>
                <rect width={WORLD.w} height={WORLD.h} fill="#06100f" opacity=".55" />
                {heatSpots.map((h, i) => <circle key={i} cx={h.x} cy={h.y} r={h.r} fill="url(#g-heat)" opacity={h.o} />)}
                <circle cx={pin.x} cy={pin.y} r="120" fill="url(#g-heat)" />
            </g>

            <path d={`M${pin.x} ${pin.y}L${SAFEHOUSE.x} ${SAFEHOUSE.y}`} className="g-route" />
            <g transform={`translate(${SAFEHOUSE.x} ${SAFEHOUSE.y})`}>
                <path d="M-9 2L0-8L9 2V9H-9Z" fill="#071419" stroke="#38e1f2" strokeWidth="2" />
                <text y="-14" textAnchor="middle" fontSize="11" className="g-lbl g-lbl--c">Safehouse</text>
            </g>
            <g transform={`translate(${pin.x} ${pin.y})`}>
                <circle r="16" className="g-pin-ring" />
                <circle r="5" fill="#ef4444" />
                <text x="22" y="4" fontSize="12" className="g-lbl g-lbl--r">404 {path}</text>
            </g>
        </>
    )
}

export default memo(CityArt)
