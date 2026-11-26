import React, { Suspense } from 'react'
import { useTheme } from './theme/useTheme'
import { themes } from './themes'

export default function App() {
  const { theme } = useTheme()
  const { Layout, NotFound } = themes[theme]
  const { pathname } = window.location
  const Page = pathname === '/' || pathname === '/index.html' ? Layout : NotFound

  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  )
}
