import React, { useEffect, useMemo } from 'react'
import { FaHome, FaFolderOpen, FaSyncAlt, FaCompass } from 'react-icons/fa'
import Header from './Header'
import CityMap from './CityMap'
import { suggest } from './lookup'
import { unlock } from './game'

export default function GtaNotFound() {
    const raw = window.location.pathname
    const path = useMemo(() => (raw.length > 26 ? `${raw.slice(0, 25)}...` : raw), [raw])
    const match = useMemo(() => suggest(raw), [raw])
    useEffect(() => { unlock('lost') }, [])

    return (
        <div className="gta g-404">
            <div className="g-windows" aria-hidden="true"><i /><i /><i /></div>
            <Header />
            <main className="g-main">
                <section className="g-fail cut-a">
                    <h1>404 - Target acquisition <em>failed</em></h1>
                    <p>You are wanted.<br />Location not found in database.<br />Mission aborted.</p>
                </section>

                <CityMap path={path} />

                <section className="g-lookup cut-a" aria-label="Page lookup">
                    <p>Searched: <b>{path}</b></p>
                    {match
                        ? <a href={match.href} className="g-btn g-btn--hot cut-a"><FaCompass aria-hidden="true" /> Did you mean {match.label}?</a>
                        : <p className="g-dim">No close match on file. Fall back to the safehouse.</p>}
                </section>

                <div className="g-actions">
                    <a href="/" className="g-act cut-a"><FaHome aria-hidden="true" /><span>Retreat to safehouse<small>(Home)</small></span></a>
                    <a href="/#projects" className="g-act cut-a"><FaFolderOpen aria-hidden="true" /><span>Re-analyze briefing<small>(View projects)</small></span></a>
                    <button type="button" onClick={() => window.location.reload()} className="g-act cut-a"><FaSyncAlt aria-hidden="true" /><span>Retry mission<small>(Reload)</small></span></button>
                </div>
            </main>
        </div>
    )
}
