import React from 'react'
import { FaShieldAlt } from 'react-icons/fa'
import { certifications, certStats, isValid } from '../../data/certifications'
import { profile } from '../../data/profile'
import { Hex } from './parts'

export default function Certifications() {
    const stats = [
        ['Total achieved', certStats.total],
        ['Strike rate', `${certStats.validPct}%`],
        ['Level', profile.certLevel],
    ]
    return (
        <>
            <section className="g-banner cut-a">
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h1 className="g-h g-h--xl">Industry certifications</h1>
                    <p className="g-role">Verified credentials &amp; specialized training</p>
                </div>
                <div>
                    <ul className="g-stats">
                        {stats.map(([label, value]) => (
                            <li key={label} className="g-stat cut-a"><span>{label}:</span><strong>{value}</strong></li>
                        ))}
                    </ul>
                    <p className="g-secure"><FaShieldAlt aria-hidden="true" /> Verification secured</p>
                </div>
            </section>

            <ul className="g-grid g-grid--cert">
                {certifications.map((c) => (
                    <li key={c.id}>
                        <article className="g-cert cut-b">
                            <div className="g-cert-head">
                                <Hex cert={c} large />
                                <div>
                                    <h3>{c.title}</h3>
                                    <p className="g-dim" style={{ textTransform: 'uppercase', fontWeight: 600 }}>{c.issuer}</p>
                                </div>
                            </div>
                            <div className="g-cert-mid"><span className="g-stamp">Verified</span></div>
                            <dl>
                                <dt>Earned:</dt><dd>{c.earned}</dd>
                                <dt>Status:</dt><dd className={isValid(c) ? 'g-ok' : 'g-bad'}>{isValid(c) ? 'Valid' : 'Expired'}</dd>
                            </dl>
                            {c.url ? (
                                <a href={c.url} target="_blank" rel="noreferrer" className="g-btn g-btn--block cut-a">View credential</a>
                            ) : (
                                <span className="g-btn g-btn--block cut-a" aria-disabled="true">Credential on request</span>
                            )}
                        </article>
                    </li>
                ))}
            </ul>
        </>
    )
}
