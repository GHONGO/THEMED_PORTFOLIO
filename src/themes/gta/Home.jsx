import React from 'react'
import projects from '../../data/projects'
import { profile } from '../../data/profile'
import MissionCard from './MissionCard'
import { Portrait } from './parts'

export default function Home() {
    return (
        <>
            <section className="g-hero cut-a">
                <Portrait />
                <div className="g-hero-main">
                    <h1 className="g-name">{profile.name}</h1>
                    <p className="g-role">{profile.role} / Creative Technologies</p>
                </div>
                <p className="g-tagline">
                    Building immersive digital experiences based in <b>Nairobi City</b> <span aria-hidden="true">🌴</span>
                </p>
            </section>

            <section aria-labelledby="g-feat">
                <h2 id="g-feat" className="g-h g-h--tight">Featured projects</h2>
                <ul className="g-grid g-grid--feat">
                    {projects.slice(0, 6).map((p) => <li key={p.id}><MissionCard project={p} compact /></li>)}
                </ul>
            </section>
        </>
    )
}
