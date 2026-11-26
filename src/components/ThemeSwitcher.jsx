import React from 'react'
import { useTheme } from '../theme/useTheme'
import { themeList } from '../themes/meta'

// Segmented control. Driven by the theme list, so new themes appear automatically.
// The GTA stylesheet restyles it through the `.theme-switch` hook class.
export default function ThemeSwitcher({ className = '' }) {
    const { theme, setTheme } = useTheme()
    return (
        <div
            role="group"
            aria-label="Site theme"
            className={`theme-switch inline-flex rounded-md border border-border p-0.5 ${className}`}
        >
            {themeList.map(t => (
                <button
                    key={t.id}
                    type="button"
                    aria-pressed={theme === t.id}
                    onClick={() => setTheme(t.id)}
                    className="px-2.5 py-1 text-xs font-semibold rounded cursor-pointer text-muted-foreground hover:text-foreground aria-pressed:bg-primary aria-pressed:text-primary-foreground transition-colors"
                >
                    {t.label}
                </button>
            ))}
        </div>
    )
}
