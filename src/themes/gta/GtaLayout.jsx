import React, { useCallback, useEffect, useRef, useState } from 'react'
import Header from './Header'
import Home from './Home'
import About from './About'
import Projects from './Projects'
import Certifications from './Certifications'
import Contact from './Contact'
import Loading from './Loading'
import { CertStrip } from './parts'
import { earn, visit } from './game'
import { sections } from '../../data/nav'

// This theme works like a game menu: one screen at a time, chosen by the URL hash
// (/#about etc.). The same /#section links used by the Classic theme keep working.
const pages = { home: Home, about: About, projects: Projects, certifications: Certifications, contact: Contact }
const ids = sections.map((s) => s.id)
const read = () => {
    const h = window.location.hash.slice(1)
    return ids.includes(h) ? h : 'home'
}
const LOADED = 'gta-loaded'

export default function GtaLayout() {
    const [active, setActive] = useState(read)
    const [wipe, setWipe] = useState(null)
    const [loading, setLoading] = useState(() => { try { return !localStorage.getItem(LOADED) } catch { return false } })
    const main = useRef(null)
    const prev = useRef(active)
    const current = useRef(active)

    const finishLoading = useCallback(() => {
        try { localStorage.setItem(LOADED, '1') } catch { /* ignore */ }
        setLoading(false)
    }, [])

    // hash change -> short "mission" wipe, swap the screen while the bars cover it
    useEffect(() => {
        let timer
        const onHash = () => {
            const next = read()
            if (next === current.current) return
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setActive(next); return }
            setWipe({ key: Date.now(), label: sections.find((s) => s.id === next).label })
            clearTimeout(timer)
            timer = setTimeout(() => setActive(next), 240)
        }
        window.addEventListener('hashchange', onHash)
        return () => { window.removeEventListener('hashchange', onHash); clearTimeout(timer) }
    }, [])

    // keys 1-5 jump between screens
    useEffect(() => {
        const onKey = (e) => {
            if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.key.length !== 1) return
            if (e.target.closest?.('input, textarea, select, dialog, [contenteditable]')) return
            const i = '12345'.indexOf(e.key)
            if (i >= 0) window.location.hash = ids[i]
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    useEffect(() => {
        current.current = active
        visit(active)
        if (prev.current === active) return
        prev.current = active
        earn(25) // a little cash for exploring
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
            {wipe && <div key={wipe.key} className="g-wipe" aria-hidden="true" onAnimationEnd={(e) => { if (e.target === e.currentTarget) setWipe(null) }}><span>{wipe.label}</span></div>}
            {loading && <Loading onDone={finishLoading} />}
        </div>
    )
}
