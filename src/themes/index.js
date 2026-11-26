import { lazy } from 'react'
import ClassicLayout from './classic/ClassicLayout'
import ClassicNotFound from '../pages/NotFound'

// Each theme provides a full-page Layout and a NotFound page.
// Non-default themes are lazy-loaded so visitors only download the theme they use.
export const themes = {
    classic: { Layout: ClassicLayout, NotFound: ClassicNotFound },
    gta: {
        Layout: lazy(() => import('./gta/GtaLayout')),
        NotFound: lazy(() => import('./gta/GtaNotFound')),
    },
}
