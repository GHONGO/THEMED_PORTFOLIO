import React from 'react'
import { FaHome, FaFolderOpen, FaSyncAlt } from 'react-icons/fa'
import Header from './Header'

export default function GtaNotFound() {
    return (
        <div className="gta g-404">
            <Header />
            <main className="g-main">
                <section className="g-fail cut-a">
                    <h1>404 - Target acquisition <em>failed</em></h1>
                    <p>You are wanted.<br />Location not found in database.<br />Mission aborted.</p>
                </section>

                <figure className="g-fail-map cut-a" aria-hidden="true">
                    <svg viewBox="0 0 800 280" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor">
                        <defs>
                            <pattern id="g-streets" width="46" height="46" patternUnits="userSpaceOnUse">
                                <path d="M46 0H0V46" strokeWidth="1" opacity=".28" />
                            </pattern>
                        </defs>
                        <rect width="800" height="280" fill="url(#g-streets)" stroke="none" />
                        <path d="M0 210C120 170 190 250 320 200S540 110 650 160 760 90 800 105" strokeWidth="3" opacity=".7" />
                        <path d="M120 0C150 80 260 90 300 150S420 240 440 280" strokeWidth="2.5" opacity=".55" />
                        <path d="M560 0C540 70 600 110 570 190S620 250 640 280" strokeWidth="2.5" opacity=".55" />
                        <path d="M0 60C100 90 200 40 330 70S560 40 800 60" strokeWidth="2" opacity=".4" />
                        <circle cx="400" cy="130" r="9" fill="#ef4444" stroke="none" />
                        <circle cx="400" cy="130" r="26" stroke="#ef4444" strokeWidth="2" />
                    </svg>
                    <figcaption>
                        <span><b>Sector unknown</b><small>Re-establishing connection...</small></span>
                        <em>Error</em>
                    </figcaption>
                </figure>

                <div className="g-actions">
                    <a href="/" className="g-act cut-a"><FaHome aria-hidden="true" /><span>Retreat to safehouse<small>(Home)</small></span></a>
                    <a href="/#projects" className="g-act cut-a"><FaFolderOpen aria-hidden="true" /><span>Re-analyze briefing<small>(View projects)</small></span></a>
                    <button type="button" onClick={() => window.location.reload()} className="g-act cut-a"><FaSyncAlt aria-hidden="true" /><span>Retry mission<small>(Reload)</small></span></button>
                </div>
            </main>
        </div>
    )
}
