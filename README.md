# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Themes

The site has switchable themes (the switcher is in the header; the choice is remembered).

| Theme | Where | Notes |
|-------|-------|-------|
| Classic | `src/themes/classic` + `src/pages`, `src/components` | Single scrolling page, light/dark mode |
| GTA | `src/themes/gta` | One "screen" at a time, driven by the URL hash (`/#about`), dark only |

**Content lives in `src/data/`** (projects, certifications, profile, skills) and is shared by every theme.
Edit it once and all themes update. Look for `TODO` comments for placeholders to replace.

**Adding a theme:** add `{ id, label }` to `src/themes/meta.js`, create `src/themes/<id>/` with a
`Layout` and `NotFound` component, and register them in `src/themes/index.js` (use `lazy()` so the
theme only downloads when selected).
