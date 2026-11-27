import { useSyncExternalStore } from 'react'

// Tiny persisted store for the GTA theme: money earned + achievements unlocked.
// No provider needed - any component can call useGame() or the plain functions.

export const BASE_MONEY = 106800
export const SCREENS = 5

export const achievements = {
    tour: { title: 'Full tour', desc: 'Visit all five screens', reward: 5000 },
    briefed: { title: 'Mission briefing', desc: 'Open a mission briefing', reward: 1000 },
    data: { title: 'Data pack', desc: 'Download the resume', reward: 1000 },
    decrypted: { title: 'Decrypted', desc: 'Reveal the WhatsApp channel', reward: 1000 },
    dispatch: { title: 'Direct dispatch', desc: 'Send a message', reward: 2500 },
    lost: { title: 'Lost in Los Santos', desc: 'Find the 404 page', reward: 500 },
    ghost: { title: 'Ghost', desc: 'Evade the helicopter for 10 seconds', reward: 5000 },
    downed: { title: 'Air support down', desc: 'Bring down the chopper', reward: 2500 },
}

const KEY = 'gta-game'
const clean = (s) => ({
    earned: Number(s?.earned) || 0,
    done: (Array.isArray(s?.done) ? s.done : []).filter((id) => id in achievements),
    seen: Array.isArray(s?.seen) ? s.seen : [],
})

let state = (() => {
    try { return { ...clean(JSON.parse(localStorage.getItem(KEY))), last: null } } catch { return { ...clean(null), last: null } }
})()
const listeners = new Set()

function commit(next) {
    state = next
    try { localStorage.setItem(KEY, JSON.stringify({ earned: next.earned, done: next.done, seen: next.seen })) } catch { /* storage unavailable */ }
    listeners.forEach((fn) => fn())
}

export const earn = (n) => commit({ ...state, earned: state.earned + n })

export function unlock(id) {
    if (!(id in achievements) || state.done.includes(id)) return
    commit({ ...state, done: [...state.done, id], earned: state.earned + achievements[id].reward, last: { id, at: Date.now() } })
}

export function visit(screen) {
    if (state.seen.includes(screen)) return
    const seen = [...state.seen, screen]
    commit({ ...state, seen })
    if (seen.length >= SCREENS) unlock('tour')
}

export const useGame = () => useSyncExternalStore((fn) => { listeners.add(fn); return () => listeners.delete(fn) }, () => state)
