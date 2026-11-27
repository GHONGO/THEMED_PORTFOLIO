import React from 'react'
import { FaDownload } from 'react-icons/fa'
import { profile } from '../../data/profile'
import { skillGroups } from '../../data/skills'
import { Portrait } from './parts'
import { achievements, unlock, useGame } from './game'

export default function About() {
    const { done } = useGame()
    return (
        <>
            <div className="g-split">
                <div className="g-stack">
                    <section className="g-hero g-hero--about cut-a">
                        <Portrait />
                        <div className="g-hero-main g-hero-main--right">
                            <h1 className="g-name g-name--md">{profile.name}</h1>
                            <p className="g-role g-role--lg">/ The developer</p>
                            <p className="g-bio">{profile.summary}</p>
                        </div>
                    </section>

                    <section className="g-panel cut-a" aria-label="Skill levels">
                        <ul className="g-bars">
                            {profile.attributes.map((a) => (
                                <li key={a.label} className="g-attr">
                                    <div className="g-attr-top"><span>{a.label}</span><b>{a.value}%</b></div>
                                    <div className="g-meter" role="img" aria-label={`${a.label} ${a.value}%`}>
                                        <i style={{ '--v': `${a.value}%` }} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <div className="g-stack">
                    <section aria-labelledby="g-exp">
                        <h2 id="g-exp" className="g-h g-h--tight">Missions completed (experience)</h2>
                        <ul className="g-panel cut-a g-missions">
                            {profile.experience.map((e) => (
                                <li key={e.company} className="g-mission">
                                    <div>
                                        <h3>{e.role} @ {e.company}</h3>
                                        <p className="g-period">{e.period}</p>
                                        <p>{e.summary}</p>
                                    </div>
                                    <span className="g-stamp">Completed</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section aria-labelledby="g-skills">
                        <h2 id="g-skills" className="g-h g-h--tight">Weapons of choice (skills)</h2>
                        <div className="g-skills">
                            {skillGroups.map((g) => (
                                <div key={g.title} className="g-panel cut-a">
                                    <h3>{g.title}</h3>
                                    <ul className="g-tiles">
                                        {g.items.map((s) => {
                                            const Icon = s.icon
                                            return (
                                                <li key={s.label} className="g-tile" style={{ '--c': s.color }}>
                                                    <Icon aria-hidden="true" />
                                                    <span>{s.label}</span>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            <section aria-labelledby="g-pack" style={{ marginTop: 'auto' }}>
                <h2 id="g-pack" className="g-h g-h--tight">Resume &amp; data pack</h2>
                <div className="g-resume">
                    <div className="g-resume-actions">
                        <a href={profile.cv} download onClick={() => unlock('data')} className="g-btn g-btn--hot cut-a"><FaDownload aria-hidden="true" /> Download resume.pdf</a>
                        <a href="/#projects" className="g-btn g-btn--ghost cut-a">Select mission</a>
                    </div>
                    <p className="g-resume-stat">
                        Name: {profile.name} / Class: Full-Stack<br />
                        Stamina: 100% / Rep level: 99<br />
                        Achievements: {done.length}/{Object.keys(achievements).length}
                    </p>
                </div>
            </section>
        </>
    )
}
