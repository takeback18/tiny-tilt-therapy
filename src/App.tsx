import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import Resources from './pages/Resources'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/resources" element={<Resources />} />
    </Routes>
  )
}
