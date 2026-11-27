import { useEffect, useRef } from 'react'

// Helicopter behaviour. Runs in its own requestAnimationFrame loop and writes straight to the DOM,
// so it never triggers React renders. Everything is measured in screen pixels, converted through the
// map's transform, so it behaves the same at any zoom level or screen size.
//
//  patrol  - loops over the city
//  pursue  - follows the cursor (mouse/pen only). Keep out of its spotlight for 10 s to escape;
//            stay inside it for ~1 s and you are locked on
//  down    - Konami code: crash, explosion, respawn
const SPOT = { x: 34, y: 52 } // searchlight spot offset in sprite units (matches Chopper.jsx)
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

export default function useChopper({ worldRef, figRef, spriteRef, calloutRef, meterRef, ptrRef, onEvent }) {
    const emit = useRef(onEvent)
    useEffect(() => { emit.current = onEvent })

    useEffect(() => {
        const g = worldRef.current, fig = figRef.current, sprite = spriteRef.current, callout = calloutRef.current, meter = meterRef.current
        if (!g || !fig || !sprite || !callout) return
        const meterText = meter?.querySelector('b')
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const say = (type, data) => emit.current?.(type, data)

        const s = { x: 300, y: 150, vx: 0, vy: 0, face: 1, t: 0, mode: 'fly', lock: 0, evade: 0, cool: 0, timer: 0, spin: 0, px: 1, pursuing: false, flash: '', flashT: 0, state: '' }
        if (reduced) { s.x = 600; s.y = 170 } // hover in place, fully still
        let last = performance.now(), raf = 0, frames = 0, seq = 0, box = { w: 260, h: 48 }

        const frame = (now) => {
            raf = requestAnimationFrame(frame)
            const dt = Math.min(0.05, (now - last) / 1000)
            last = now
            s.t += dt
            const m = g.getScreenCTM()
            if (!m) return
            const sc = m.a, px = 1 / sc
            s.px = px
            const size = fig.clientWidth < 520 ? 0.62 : 0.82

            if (s.mode === 'dead') {
                s.timer += dt
                if (s.timer > 5.5) {
                    Object.assign(s, { mode: 'fly', x: 60, y: 90, vx: 0, vy: 0, cool: 0, lock: 0, evade: 0, spin: 0 })
                    sprite.style.visibility = 'visible'
                    callout.style.visibility = 'visible'
                    say('respawn')
                }
                return
            }

            let bank = 0
            if (s.mode === 'down') {
                s.timer += dt
                s.vy += 520 * px * dt
                s.spin += 540 * dt
                s.x += s.vx * dt
                s.y += s.vy * dt
                bank = s.spin
                if (s.timer > 1.15) {
                    s.mode = 'dead'
                    s.timer = 0
                    sprite.style.visibility = 'hidden'
                    callout.style.visibility = 'hidden'
                    if (meter) meter.classList.remove('is-on')
                    say('down', { x: s.x, y: s.y, inv: px })
                    return
                }
            } else {
                const ptr = ptrRef.current
                s.cool = Math.max(0, s.cool - dt)
                const pursuing = !reduced && s.cool <= 0 && !!ptr && ptr.type !== 'touch' && now - ptr.t < 2500
                let tx, ty, speed, p = null

                if (reduced) { tx = 600; ty = 170; speed = 0 }
                else if (pursuing) {
                    p = new DOMPoint(ptr.x, ptr.y).matrixTransform(m.inverse())
                    tx = p.x - s.face * SPOT.x * size * px
                    ty = p.y - SPOT.y * size * px
                    speed = 230
                } else {
                    tx = 600 + 440 * Math.cos(s.t * 0.17)
                    ty = 200 + 140 * Math.sin(s.t * 0.29)
                    speed = 95
                }

                if (pursuing && !s.pursuing) { s.pursuing = true; s.evade = 0; say('chase') }
                if (!pursuing && s.pursuing) { s.pursuing = false; if (s.evade > 0.5) say('lost'); s.evade = 0; s.lock = 0 }

                if (pursuing) {
                    const spotX = s.x + s.face * SPOT.x * size * px, spotY = s.y + SPOT.y * size * px
                    const d = Math.hypot(spotX - p.x, spotY - p.y) * sc
                    s.lock = d < 34 ? s.lock + dt : Math.max(0, s.lock - dt * 1.5)
                    s.evade += dt
                    if (s.lock >= 0.9) { s.lock = 0; s.evade = 0; s.cool = 4; s.flash = 'lock'; s.flashT = 2.2; say('lock') }
                    else if (s.evade >= 10) { s.evade = 0; s.cool = 8; s.flash = 'escaped'; s.flashT = 2.6; say('escaped') }
                }

                const dx = tx - s.x, dy = ty - s.y, dist = Math.hypot(dx, dy) || 1
                const want = Math.min(speed * px, dist * 2.2)
                const k = Math.min(1, dt * 2.4)
                s.vx += ((dx / dist) * want - s.vx) * k
                s.vy += ((dy / dist) * want - s.vy) * k
                s.x += s.vx * dt
                s.y += s.vy * dt + (reduced ? 0 : Math.sin(s.t * 3) * 0.4 * px)
                const vxpx = s.vx * sc
                if (vxpx > 25) s.face = 1
                else if (vxpx < -25) s.face = -1
                bank = Math.min(9, Math.abs(vxpx) * 0.04)

                s.flashT = Math.max(0, s.flashT - dt)
                const flash = s.flashT > 0 ? s.flash : ''
                const state = flash === 'lock' ? 'lock' : pursuing ? (s.lock > 0.25 ? 'lock' : 'chase') : 'patrol'
                if (state !== s.state) { s.state = state; sprite.dataset.state = state; callout.dataset.state = state }
                if (flash) callout.dataset.flash = flash; else delete callout.dataset.flash

                if (meter) {
                    meter.classList.toggle('is-on', pursuing)
                    if (pursuing) { meter.style.setProperty('--p', (s.evade / 10).toFixed(3)); meterText.textContent = `${s.evade.toFixed(1)}s` }
                }
            }

            sprite.setAttribute('transform', `translate(${s.x.toFixed(2)} ${s.y.toFixed(2)}) scale(${(s.face * size * px).toFixed(5)} ${(size * px).toFixed(5)}) rotate(${bank.toFixed(1)})`)

            // keep the on-screen label near the helicopter (pinned to the edge if it flies off-screen)
            if ((frames++ & 31) === 0) box = { w: callout.offsetWidth, h: callout.offsetHeight }
            const r = fig.getBoundingClientRect()
            const cx = m.a * s.x + m.e - r.left, cy = m.d * s.y + m.f - r.top
            const ox = clamp(cx + 18, 8, Math.max(8, r.width - box.w - 8))
            const oy = clamp(cy + 38, 8, Math.max(8, r.height - box.h - 8))
            callout.style.transform = `translate(${ox.toFixed(1)}px, ${oy.toFixed(1)}px)`
        }

        // Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
        const onKey = (e) => {
            const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
            seq = key === KONAMI[seq] ? seq + 1 : key === KONAMI[0] ? 1 : 0
            if (seq === KONAMI.length) {
                seq = 0
                if (s.mode === 'fly') {
                    Object.assign(s, { mode: 'down', timer: 0, spin: 0, vy: 0, vx: s.face * 60 * s.px })
                    sprite.dataset.state = 'lock'
                }
            }
        }

        window.addEventListener('keydown', onKey)
        raf = requestAnimationFrame(frame)
        return () => { cancelAnimationFrame(raf); window.removeEventListener('keydown', onKey) }
    }, [worldRef, figRef, spriteRef, calloutRef, meterRef, ptrRef])
}
