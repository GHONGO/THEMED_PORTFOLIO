// Theme list shown in the switcher. Kept free of component imports so the
// switcher and provider can use it without creating import cycles.
//
// To add a theme: add an entry here, a folder in src/themes/<id>/, and one
// line in src/themes/index.js. Nothing else needs to change.
export const themeList = [
    { id: 'classic', label: 'Classic' },
    { id: 'gta', label: 'GTA' },
]

export const DEFAULT_THEME = 'classic'
