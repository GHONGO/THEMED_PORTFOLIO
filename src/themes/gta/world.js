// Shared constants + helpers for the 404 map (kept out of the component file for fast refresh).
export const WORLD = { w: 1200, h: 500 }
export const SAFEHOUSE = { x: 560, y: 262 }

export const rng = (seed) => () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

// The "location" of the missing page: a stable point on land derived from its path.
export function pinFor(path) {
    let h = 2166136261
    for (const c of path) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) }
    const r = rng(h >>> 0)
    return { x: Math.round(300 + r() * 620), y: Math.round(130 + r() * 250) }
}
