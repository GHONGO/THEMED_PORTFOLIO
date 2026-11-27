import { sections } from '../../data/nav'

// "Did you mean...?" for the 404 page: match the mistyped path to the closest real screen.
const aliases = {
    work: 'projects', project: 'projects', portfolio: 'projects',
    cv: 'about', resume: 'about', me: 'about',
    cert: 'certifications', certs: 'certifications', certificates: 'certifications',
    hire: 'contact', email: 'contact', index: 'home',
}

function distance(a, b) {
    const row = Array.from({ length: b.length + 1 }, (_, i) => i)
    for (let i = 1; i <= a.length; i++) {
        let prev = row[0]
        row[0] = i
        for (let j = 1; j <= b.length; j++) {
            const tmp = row[j]
            row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1))
            prev = tmp
        }
    }
    return row[b.length]
}

const build = (id) => {
    const s = sections.find((x) => x.id === id)
    return { id, label: s.label, href: `/#${id}` }
}

export function suggest(pathname) {
    const slug = pathname.replace(/^\/+|\/+$/g, '').split('/')[0].toLowerCase().replace(/\.[a-z]+$/, '')
    if (!slug) return null
    if (aliases[slug]) return build(aliases[slug])
    let best = null
    for (const s of sections) {
        const d = slug.length >= 2 && s.id.startsWith(slug) ? 0 : distance(slug, s.id)
        if (!best || d < best.d) best = { id: s.id, d }
    }
    return best.d <= Math.max(2, Math.floor(best.id.length / 3)) ? build(best.id) : null
}
