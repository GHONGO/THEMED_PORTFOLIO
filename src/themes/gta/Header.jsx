import React, { useEffect } from 'react'
import './gta.css'
import ThemeSwitcher from '../../components/ThemeSwitcher'
import { sections } from '../../data/nav'
import { Radar, Money, Toasts } from './Hud'

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
                <span className="g-keys" aria-hidden="true">Keys 1-5</span>
                <Radar />
                <Money />
            </div>
            <Toasts />
        </header>
    )
}
