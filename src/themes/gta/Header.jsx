import React, { useEffect } from 'react'
import './gta.css'
import ThemeSwitcher from '../../components/ThemeSwitcher'
import { sections } from '../../data/nav'

// Fonts load via a <link> (not a CSS @import) so a blocked/failed font request can never
// take the whole theme down with it - the CSS falls back to system condensed fonts.
const FONTS = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;500;600;700&display=swap'
function useGtaFonts() {
    useEffect(() => {
        if (document.querySelector('link[data-gta-fonts]')) return
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = FONTS
        link.dataset.gtaFonts = ''
        document.head.appendChild(link)
    }, [])
}

function Minimap() {
    return (
        <div className="g-map-wrap" aria-hidden="true">
            <svg className="g-map" viewBox="0 0 60 44">
                <path d="M0 30 60 10M18 0l12 44M44 0l-4 44M0 12l60 22" fill="none" stroke="#6f7f74" strokeWidth="1.5" />
                <circle cx="30" cy="22" r="2.6" fill="#5be37a" />
            </svg>
            <div className="g-map-bars"><i /><i /></div>
        </div>
    )
}

export default function Header({ active }) {
    useGtaFonts()

    // keep the active tab visible when the nav scrolls sideways on small screens
    useEffect(() => {
        document.querySelector('.g-tab[aria-current="page"]')?.scrollIntoView({ inline: 'center', block: 'nearest' })
    }, [active])

    return (
        <header className="g-header">
            <a href="/#home" className="g-logo" aria-label="Griffin Hongo - home">Griffin Hongo</a>

            <nav className="g-nav" aria-label="Primary">
                <ul>
                    {sections.map((s) => (
                        <li key={s.id}>
                            <a href={`/#${s.id}`} className="g-tab cut-a" aria-current={active === s.id ? 'page' : undefined}>
                                {s.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="g-hud">
                <ThemeSwitcher />
                <Minimap />
                <span className="g-money" aria-hidden="true">$106800</span>
            </div>
        </header>
    )
}
