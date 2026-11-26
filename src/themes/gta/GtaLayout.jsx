import React, { useEffect, useRef, useState } from 'react'
import Header from './Header'
import Home from './Home'
import About from './About'
import Projects from './Projects'
import Certifications from './Certifications'
import Contact from './Contact'
import { CertStrip } from './parts'
import { sections } from '../../data/nav'

// This theme works like a game menu: one screen at a time, chosen by the URL hash
// (/#about etc.). The same /#section links used by the Classic theme keep working.
const pages = { home: Home, about: About, projects: Projects, certifications: Certifications, contact: Contact }
const ids = sections.map((s) => s.id)
const read = () => {
    const h = window.location.hash.slice(1)
    return ids.includes(h) ? h : 'home'
}

export default function GtaLayout() {
    const [active, setActive] = useState(read)
    const main = useRef(null)
    const prev = useRef(active)

    useEffect(() => {
        const onHash = () => setActive(read())
        window.addEventListener('hashchange', onHash)
        return () => window.removeEventListener('hashchange', onHash)
    }, [])

    // new screen: back to top and move focus into it (keyboard / screen reader users)
    useEffect(() => {
        if (prev.current === active) return
        prev.current = active
        window.scrollTo({ top: 0, behavior: 'instant' })
        main.current?.focus({ preventScroll: true })
    }, [active])

    const Page = pages[active]
    return (
        <div className="gta">
            <Header active={active} />
            <main ref={main} tabIndex={-1} className="g-main">
                <Page />
            </main>
            {active === 'home' && <CertStrip heading />}
            {active === 'contact' && <CertStrip />}
        </div>
    )
}
