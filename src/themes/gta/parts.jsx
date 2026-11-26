import React from 'react'
import { certifications } from '../../data/certifications'

// To use an illustrated GTA-style portrait instead, drop it in /public and change this path.
const PORTRAIT = '/griffin.webp'

export function Portrait() {
    return (
        <figure className="g-portrait">
            <img src={PORTRAIT} alt="Griffin Hongo" width="800" height="800" />
        </figure>
    )
}

// Hexagonal credential badge. Accent colour comes from the certification's `color`.
export function Hex({ cert, large = false }) {
    const Icon = cert.icon
    return (
        <span className="g-hexw" style={{ '--c': cert.color }}>
            <span className={`g-hex${large ? ' g-hex--lg' : ''}`}>
                <Icon aria-hidden="true" />
                <i>Verified</i>
            </span>
        </span>
    )
}

// Endless badge ticker. Pure CSS: the list is rendered twice and the track slides by -50%.
export function CertStrip({ heading = false }) {
    const row = [...certifications, ...certifications]
    const list = (hidden) => (
        <ul aria-hidden={hidden || undefined}>
            {row.map((c, i) => <li key={`${c.id}-${i}`}><Hex cert={c} /></li>)}
        </ul>
    )
    return (
        <section className="g-strip-wrap" aria-label="Industry certifications">
            {heading && <h2 className="g-h g-strip-title">Industry certifications</h2>}
            <div className="g-strip">
                <div className="g-strip-track">{list(false)}{list(true)}</div>
            </div>
        </section>
    )
}
