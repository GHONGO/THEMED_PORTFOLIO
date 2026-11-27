# Griffin Hongo - Portfolio

A themeable personal portfolio. One set of content, several complete designs, switchable at runtime.

| Theme | What it is |
|-------|-----------|
| **Classic** | The original single-page scrolling site, with light and dark mode |
| **GTA** | A game-menu design: HUD, "missions", achievements, and an interactive 404 map with a helicopter |

A third theme is planned. The project is built so adding it is one folder and one line.

Live site: https://griffin-hongo.vercel.app

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm run lint       # ESLint
```

Needs Node 18+ (Node 20+ recommended).

---

## The stack

| Layer | Choice | Why it is here |
|-------|--------|----------------|
| UI | **React 19** | Components and state |
| Build / dev server | **Vite 7** | Fast dev, small production bundles, code splitting |
| Styling (Classic) | **Tailwind CSS 4** via `@tailwindcss/postcss` | Utility classes, theme tokens in `src/index.css` |
| Styling (GTA) | **Plain CSS** (`gta.css`, `map.css`) | Clip-path shapes and animations read better as CSS than as utility strings |
| Animation | **framer-motion** | Classic theme animations |
| Icons | **react-icons** (tree-shaken), **lucide-react** (Classic 404 page) | Brand and UI icons, no image files |
| Routing | **react-router-dom** (`BrowserRouter`) | Wrapper only. Routing is handled by `App.jsx` and the URL hash |
| Contact form | **Formspree** (plain `fetch`) | No backend needed |
| Booking | **Calendly** widget (Classic contact page) | Loaded on demand |
| Hosting | **Vercel** | `vercel.json` rewrites every path to `index.html` (single-page app) |
| Quality | **ESLint 9** + react-hooks + react-refresh | `npm run lint` |

There is **no backend, database or CMS**. It is a static site: everything is built into
`dist/`, and the only network calls are Formspree (form), Calendly (booking widget) and
Google Fonts.

The GTA theme adds **zero** runtime dependencies. The map, helicopter, zoom/pan, and
achievements are all hand-written.

---

## How it works (the 60-second version)

```
index.html
  └─ inline script: restores saved theme + light/dark BEFORE first paint (no flash)
main.jsx
  └─ BrowserRouter > ThemeProvider > App
ThemeProvider   remembers { theme, mode } in localStorage, sets <html data-theme> and the .dark class
App.jsx         looks up the active theme in src/themes/index.js and renders:
                  path "/"        -> theme.Layout
                  any other path  -> theme.NotFound   (that is the 404 page)
```

- **Themes are full replacements, not skins.** Each theme owns its layout and its 404 page.
  They all read the same content from `src/data/`.
- **Non-default themes are lazy-loaded** with `React.lazy`, so Classic visitors never download
  GTA code or CSS, and vice versa.
- **Classic** is one long page: sections `#home`, `#about`, `#projects`, `#certifications`,
  `#contact`, and the nav scrolls to them.
- **GTA** treats those same `/#section` links as *screens*, shows one at a time, and plays a
  transition between them. This works through the `hashchange` event.
- **Light/dark mode** only applies to Classic. GTA is dark by design and ignores it.
- **404 handling:** Vercel rewrites any unknown path to `index.html`, then `App.jsx` sees the
  path is not `/` and renders the theme's 404 page.

---

## Where everything is

```
.
├── index.html               Page shell, SEO/OpenGraph tags, pre-paint theme script, font links
├── vite.config.js           Vite + React plugin, "@" alias -> src/
├── postcss.config.js        Tailwind 4 PostCSS plugin
├── vercel.json              SPA rewrite: every path -> index.html
├── eslint.config.js         Lint rules
├── public/                  Served as-is at the site root
│   ├── griffin.webp           Profile photo (used by both themes)
│   ├── og-image.webp          Social share image (1200x630)
│   └── Griffin Hongo's RESUME.pdf   "Download CV" target (both themes)
├── docs/
│   └── GTA-THEME.md         Deep dive into the GTA theme
└── src/
    ├── main.jsx             Entry: router + ThemeProvider + App
    ├── App.jsx              Picks the active theme; "/" -> Layout, anything else -> NotFound
    ├── index.css            Tailwind import, Classic color tokens (light/dark), global rules
    │
    ├── theme/               Theme + light/dark STATE
    │   ├── ThemeProvider.jsx  Holds theme + mode, persists them, updates <html>
    │   └── useTheme.js        useTheme() hook and its context
    │
    ├── themes/              One folder per design
    │   ├── meta.js            List of themes shown in the switcher (id + label)
    │   ├── index.js           Maps each theme id to its Layout and NotFound (lazy for non-default)
    │   ├── classic/
    │   │   └── ClassicLayout.jsx   Original scrolling page, built from src/pages + src/components
    │   └── gta/             The GTA theme (see docs/GTA-THEME.md)
    │
    ├── data/                CONTENT. Edit these, every theme updates
    │   ├── profile.js         Name, summary, links, email, experience, skill bars
    │   ├── projects.jsx       Project list (title, summary, tech, link, image, category, difficulty)
    │   ├── certifications.jsx Certifications (title, issuer, year, credential link, icon)
    │   ├── skills.jsx         Skill icons grouped as Languages / Frameworks / Tools
    │   └── nav.js             Screen order shared by all navs
    │
    ├── hooks/
    │   └── useContactForm.js  Contact form logic shared by every theme (Formspree)
    │
    ├── pages/               CLASSIC theme sections
    │   ├── Home.jsx  About.jsx  Projects.jsx  Certifications.jsx  Contact.jsx
    │   └── NotFound.jsx       Classic 404 page
    │
    ├── components/          CLASSIC theme building blocks (+ the shared switcher)
    │   ├── Navbar.jsx         Header, mobile menu, theme switcher, light/dark toggle, CV button
    │   ├── Footer.jsx  ProjectCard.jsx  ContactForm.jsx
    │   ├── ThemeSwitcher.jsx  Segmented control; used by BOTH themes
    │   ├── Squares.jsx        Animated canvas background (Classic)
    │   ├── LogoLoop.jsx       Scrolling tech-logo strip (Classic home)
    │   └── RotatingText.jsx   Rotating headline text (Classic home)
    │
    └── assets/              Project screenshots imported by data/projects.jsx
```

---

## Editing your content

Everything people read lives in `src/data/`. Search the folder for `TODO`.

| To change | Edit |
|-----------|------|
| Name, bio, email, social links, CV path, Formspree URL, Calendly link | `profile.js` |
| Work experience and skill bars (GTA About page) | `profile.js` |
| Add / edit a project | `projects.jsx` (put the screenshot in `src/assets/`) |
| Add / edit a certification | `certifications.jsx` |
| Skill icons | `skills.jsx` |
| Order of pages | `nav.js` |

**Replace these placeholders before sharing publicly.** They came from the design mockups:
the 8 certifications, the "LS Digital" and "Vinewood Labs" jobs, the skill percentages, the
"Senior Dev" level label, and the email address.

Project fields that matter:

```js
{
  id, title, summary, tech: ['React', ...], link, image,
  category: 'web' | 'mobile' | 'ux' | 'client' | 'misc',  // GTA filter chips appear for categories in use
  difficulty: 'Easy' | 'Medium' | 'Hard',                  // GTA cards + briefings
  soon: true                                               // optional: shows "Coming soon"
}
```

Certifications: set `url` to the credential page and the button activates. Set `expires` (a
year) and the status flips to "Expired" automatically once it passes.

---

## Themes

### Switching
The Classic | GTA switcher is in the header of both themes. The choice is saved in
`localStorage` (`theme`, `mode`) and restored before first paint.

### Adding a new theme
1. Add `{ id: 'mytheme', label: 'My Theme' }` to `src/themes/meta.js`.
2. Create `src/themes/mytheme/` with a `Layout` component (the `/` page) and a `NotFound` component.
   Read content from `src/data/`, and build navigation from `src/data/nav.js`.
3. Register both in `src/themes/index.js`, using `lazy(() => import(...))` so the theme only
   downloads when selected.
4. Reuse `ThemeSwitcher` so people can switch back, and `useContactForm` for the contact form.

Nothing else changes. The switcher, persistence and routing pick the theme up automatically.

---

## Contact form

`src/hooks/useContactForm.js` posts JSON to the Formspree endpoint in `profile.js` and tracks
`idle | sending | sent | error`. It submits in the background so the visitor stays on the page.
Both themes use it, each with their own markup and wording.

---

## Deployment

Deployed on **Vercel**: connect the repo, framework preset *Vite*, build command `npm run build`,
output directory `dist`. `vercel.json` already contains the rewrite that makes deep links and the
404 page work. The static `dist/` folder also works on Netlify or any static host, as long as you
add the same "all paths -> index.html" rule.

Social previews use absolute URLs in `index.html` (`https://griffin-hongo.vercel.app/...`).
Update them if the domain changes.

---

## Things worth knowing

- **Accessibility:** keyboard operable, visible focus states, labelled controls, native `<dialog>`
  for the GTA briefings, and `prefers-reduced-motion` is respected (GTA's helicopter hovers still,
  transitions and chase are off).
- **Responsive:** checked from 320px to 1440px. GTA's grids use `auto-fit`/`auto-fill`, so they
  adapt without piles of breakpoints.
- **Performance:** theme code is split by route/theme. Your project screenshots are the heaviest
  assets (about 1.9 MB total). Converting them to WebP would help both themes.
- **Fonts:** Inter (Classic) is loaded from `index.html`. GTA's Bebas Neue and Barlow Condensed load
  from a `<link>` the theme adds itself, so a blocked font request can never break the page.
- **Package metadata:** `package.json` describes the portfolio and points to this repository.
