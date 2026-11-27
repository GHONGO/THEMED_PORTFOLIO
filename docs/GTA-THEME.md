# GTA theme - deep dive

Everything lives in `src/themes/gta/`. It is plain CSS plus React, with no extra dependencies,
and nothing here leaks into Classic (all styles are scoped under `.gta`).

## File map

| File | Role |
|------|------|
| `GtaLayout.jsx` | The shell for `/`. Reads the URL hash, shows one screen at a time, runs the transition wipe, the 1-5 shortcuts, and the first-visit loading screen |
| `Header.jsx` | HUD bar: logo, nav tabs, theme switcher, radar, money. Also loads the theme fonts |
| `Hud.jsx` | `Radar` (rotating sweep), `Money` (counts up as you earn), `Toasts` (achievement pop-ups) |
| `Home.jsx` `About.jsx` `Projects.jsx` `Certifications.jsx` `Contact.jsx` | The five screens |
| `MissionCard.jsx` | A project shown as a "mission". "Select mission" opens its briefing |
| `Briefing.jsx` | Mission briefing, built on a native `<dialog>` (Esc, backdrop click, focus trap for free) |
| `parts.jsx` | Shared bits: `Portrait`, hexagon `Hex` badge, scrolling `CertStrip` |
| `Loading.jsx` | First-visit "Loading Los Santos..." screen (skippable) |
| `game.js` | Tiny persisted store: money earned, achievements, screens visited |
| `GtaNotFound.jsx` | The 404 page: title, map, "Did you mean...?" lookup, three action buttons |
| `lookup.js` | Matches a mistyped path to the closest real screen (aliases + edit distance) |
| `CityMap.jsx` | The interactive map and its overlays (stars, controls, radio, callout) |
| `cityArt.jsx` | The fictional city, drawn in SVG from a seeded random generator |
| `world.js` | Map constants, seeded RNG, and `pinFor(path)` (where the missing page "is") |
| `useCamera.js` | Zoom + pan: wheel, drag, pinch, keyboard, animated buttons |
| `useChopper.js` | Helicopter behaviour loop (patrol, pursue, lock-on, evade, crash) |
| `Chopper.jsx` | The helicopter sprite (original vector art) |
| `gta.css` | Theme tokens, shapes, header, cards, pages, HUD, loading, transitions, briefing |
| `map.css` | Only the 404 map and helicopter (loaded with the 404 page only) |

## How screens work

The theme behaves like a game menu. `GtaLayout` stores the active screen from `location.hash`
(`#home`, `#about`, `#projects`, `#certifications`, `#contact`; unknown hashes show Home).
Clicking a tab or pressing **1-5** changes the hash; a short bar wipe covers the swap, scroll
resets, and focus moves into the new screen. The same `/#about` style links used by Classic keep
working.

## Visual system

- **Cut corners:** `.cut-a` (top-left and bottom-right chamfer) and `.cut-b` (top-right chamfer)
  are `clip-path` shapes. `--edge` is the border colour and `--fill` the inside, both overridable.
  No image files are used for panels.
- **Tokens:** colours and fonts are CSS variables on `.gta` (`--g-green`, `--g-cyan`, ...).
- **Textures:** scanlines, film grain and the city skyline are inline SVG data URIs.
- **Fonts:** Bebas Neue (headlines) and Barlow Condensed (UI text).
- **Portrait:** `parts.jsx` uses `/griffin.webp` with a colour grade. Swap the path for an
  illustrated portrait if you have one.

## Game layer

| Feature | Behaviour |
|---------|-----------|
| Money | Starts at `$106800`. +$25 for each new screen, plus achievement rewards. Counts up smoothly |
| Achievements (8) | Full tour, Mission briefing, Data pack, Decrypted, Direct dispatch, Lost in Los Santos, Ghost, Air support down |
| Persistence | `localStorage` key `gta-game` (money earned, unlocked achievements, screens seen) |
| Loading screen | First visit only (`gta-loaded` flag). Skip with the button, Enter, or Esc |
| Shortcuts | Keys 1-5. Ignored while typing in a form field or when a dialog is open |

To add an achievement, add an entry to `achievements` in `game.js`, then call `unlock('id')`
wherever the action happens.

## The 404 page

- **Missing-page lookup:** `lookup.js` normalises the path, checks aliases (`/cv` -> About,
  `/work` -> Projects), then falls back to edit distance. The result drives the
  "Did you mean ...?" button.
- **The map:** a fictional city (coastline, districts, rotated street grids, arteries, parks)
  generated once from a seeded RNG, so it is identical every load. The missing page appears as a
  red pin whose position comes from a hash of the path, with a dashed route to the Safehouse.
- **Camera (`useCamera.js`):** zoom 1x-6x about the pointer. Wheel (at 1x the page still scrolls
  past), drag, two-finger pinch, buttons, and keys (`+`, `-`, arrows, `0`). Phones: one finger
  scrolls the page until you zoom in, then drags the map.
- **Layers:** the layers button toggles a heat map.
- **Helicopter (`useChopper.js`):** runs in its own animation loop and writes to the DOM
  directly, so it never causes React re-renders. Sizes and speeds are measured in screen pixels,
  so it behaves the same at any zoom or screen size.

  | State | Trigger | What happens |
  |-------|---------|--------------|
  | Patrol | Default, or touch devices | Loops over the city |
  | Pursue | Mouse or pen moves over the map | Follows the cursor; searchlight turns yellow |
  | Lock-on | Cursor stays in the light ~1 s | "TARGET ACQUIRED", +1 wanted star, helicopter backs off |
  | Escape | Evade for 10 s | "SIGNAL LOST", stars clear, unlocks Ghost |
  | Crash | Konami code | Falls, explosion, respawns ~6 s later, unlocks Air support down |

- **Wanted level:** rises slowly to 3 stars while you linger; lock-ons can push it to 5;
  escaping or crashing the helicopter clears it.
- **Radio:** on-screen chatter that reacts to what the helicopter does. No audio anywhere.
- **Reduced motion:** the helicopter hovers perfectly still, there is no chase, no wipe.

## Customising

| To change | Where |
|-----------|-------|
| Colours | `.gta` variables at the top of `gta.css` |
| Hero tagline ("Los Santos") | `Home.jsx` |
| Stat bars, experience, level label | `src/data/profile.js` |
| Money start value, achievements | `game.js` |
| Map layout, district names | `cityArt.jsx` |
| Helicopter speed, lock time, evade time | `useChopper.js` (`speed`, `s.lock >= 0.9`, `s.evade >= 10`) |
| Chatter lines | `CityMap.jsx` |
