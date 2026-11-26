import React, { useState } from 'react'
import projects from '../../data/projects'
import MissionCard from './MissionCard'

const labels = { web: 'Web apps', mobile: 'Mobile', ux: 'UI/UX', client: 'Client work', misc: 'Misc' }

export default function Projects() {
    const [cat, setCat] = useState('all')
    // only offer filters that have at least one project
    const filters = ['all', ...Object.keys(labels).filter((k) => projects.some((p) => p.category === k))]
    const shown = cat === 'all' ? projects : projects.filter((p) => p.category === cat)

    return (
        <>
            <div className="g-page-head">
                <h1 className="g-h g-h--xl">Projects dossier</h1>
                <div className="g-filters" role="group" aria-label="Filter projects">
                    {filters.map((k) => (
                        <button key={k} type="button" className="g-chip cut-a" aria-pressed={cat === k} onClick={() => setCat(k)}>
                            {k === 'all' ? 'All' : labels[k]}
                        </button>
                    ))}
                </div>
            </div>

            <ul className="g-grid g-grid--proj">
                {shown.map((p) => <li key={p.id}><MissionCard project={p} /></li>)}
            </ul>
        </>
    )
}
