import React from 'react'

// One project, presented as a "mission". `compact` = the tall home-page variant.
export default function MissionCard({ project: p, compact = false }) {
    const extra = p.tech.length - 3
    const completion = p.soon ? <b className="g-warn">In progress</b> : <b className="g-ok">100%</b>
    const level = { Easy: 'g-ok', Medium: 'g-warn', Hard: 'g-bad' }[p.difficulty] || ''

    return (
        <article className={`g-card cut-b${compact ? ' g-card--tall' : ''}`}>
            {p.image && <img className="g-card-art" src={p.image} alt="" loading="lazy" />}
            <div className="g-card-shade" />
            <div className="g-card-body">
                <div>
                    {!compact && <p className="g-kicker">Mission:</p>}
                    <h3>{p.title}</h3>
                </div>

                <div>
                    <ul className="g-tags" aria-label="Technologies">
                        {p.tech.slice(0, 3).map((t) => <li key={t} className="g-tag">{t}</li>)}
                        {extra > 0 && <li className="g-tag">+{extra}</li>}
                    </ul>

                    <div className="g-card-foot">
                        {p.soon ? (
                            <span className={`g-btn cut-a${compact ? ' g-btn--block' : ''}`} aria-disabled="true">Coming soon</span>
                        ) : (
                            <a href={p.link} target="_blank" rel="noreferrer" className={`g-btn cut-a${compact ? ' g-btn--block' : ''}`}>
                                Select mission<span className="sr-only"> {p.title}</span>
                            </a>
                        )}
                        {!compact && (
                            <p className="g-meta">
                                Completion: {completion}<br />
                                Difficulty: <b className={level}>{p.difficulty}</b>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </article>
    )
}
