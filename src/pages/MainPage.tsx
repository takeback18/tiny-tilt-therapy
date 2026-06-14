import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import WhatIsTorticollis from '../components/WhatIsTorticollis'
import Services from '../components/Services'
import Team from '../components/Team'
import Affiliates from '../components/Affiliates'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function MainPage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <WhatIsTorticollis />
        <Services />
        <Team />
        <Affiliates />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
