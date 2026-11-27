import React from 'react'

// Mission briefing: a native <dialog> (focus trap, Esc to close and backdrop come free).
export default function Briefing({ project: p, ref }) {
    const level = { Easy: 'g-ok', Medium: 'g-warn', Hard: 'g-bad' }[p.difficulty] || ''
    const close = () => ref.current?.close()
    return (
        <dialog ref={ref} className="g-brief cut-a" aria-labelledby={`brief-${p.id}`} onClick={(e) => { if (e.target === e.currentTarget) close() }}>
            <div className="g-brief-in">
                <p className="g-kicker">Mission briefing</p>
                <h2 id={`brief-${p.id}`} className="g-h g-h--xl">{p.title}</h2>
                <dl>
                    <dt>Objective</dt><dd>{p.summary}</dd>
                    <dt>Intel</dt><dd><ul className="g-tags">{p.tech.map((t) => <li key={t} className="g-tag">{t}</li>)}</ul></dd>
                    <dt>Status</dt><dd className={p.soon ? 'g-warn' : 'g-ok'}>{p.soon ? 'In progress' : 'Completed'}</dd>
                    <dt>Difficulty</dt><dd className={level}>{p.difficulty}</dd>
                </dl>
                <div className="g-brief-actions">
                    {p.soon
                        ? <span className="g-btn cut-a" aria-disabled="true">Coming soon</span>
                        : <a href={p.link} target="_blank" rel="noreferrer" className="g-btn g-btn--hot cut-a">Start mission</a>}
                    <button type="button" className="g-btn g-btn--ghost cut-a" onClick={close}>Abort</button>
                </div>
            </div>
        </dialog>
    )
}
