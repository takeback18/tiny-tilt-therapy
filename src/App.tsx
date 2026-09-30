import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import MainPage from './pages/MainPage'
import Resources from './pages/Resources'
import Store from './pages/Store'
import Downloads from './pages/Downloads'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/store" element={<Store />} />
        <Route path="/downloads" element={<Downloads />} />
      </Routes>
    </>
  )
}
