import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import MainPage from './pages/MainPage'
import Resources from './pages/Resources'

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
      </Routes>
    </>
  )
}
