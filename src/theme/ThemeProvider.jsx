import React, { useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './useTheme'
import { themeList, DEFAULT_THEME } from '../themes/meta'

// `theme` = which design (classic, gta, ...). `mode` = light/dark, which only
// the classic theme uses (GTA is dark by design).
function read(key, allowed, fallback) {
    try {
        const v = localStorage.getItem(key)
        return allowed.includes(v) ? v : fallback
    } catch {
        return fallback
    }
}

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => read('theme', themeList.map(t => t.id), DEFAULT_THEME))
    const [mode, setMode] = useState(() => read('mode', ['light', 'dark'], 'light'))

    useEffect(() => {
        const root = document.documentElement
        root.dataset.theme = theme
        root.classList.toggle('dark', mode === 'dark')
        try {
            localStorage.setItem('theme', theme)
            localStorage.setItem('mode', mode)
        } catch { /* storage unavailable (private mode) - theme still works for this visit */ }
    }, [theme, mode])

    const value = useMemo(() => ({
        theme,
        setTheme,
        mode,
        toggleMode: () => setMode(m => (m === 'dark' ? 'light' : 'dark')),
    }), [theme, mode])

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
