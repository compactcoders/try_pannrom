import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"
import { useEffect, useState } from "react"

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorTrails, setCursorTrails] = useState<Array<{ id: number, x: number, y: number }>>([])

  useEffect(() => {
    let trailId = 0
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      const newTrail = { id: trailId++, x: e.clientX, y: e.clientY }
      setCursorTrails(prev => [...prev.slice(-5), newTrail])
    }

    const handleMouseDown = () => {
      document.querySelector('.custom-cursor')?.classList.add('click')
    }

    const handleMouseUp = () => {
      document.querySelector('.custom-cursor')?.classList.remove('click')
    }

    const handleMouseEnter = (e: Event) => {
      if (e.target instanceof Element && e.target.matches('button, input, a, [role="button"]')) {
        document.querySelector('.custom-cursor')?.classList.add('hover')
      }
    }

    const handleMouseLeave = (e: Event) => {
      if (e.target instanceof Element && e.target.matches('button, input, a, [role="button"]')) {
        document.querySelector('.custom-cursor')?.classList.remove('hover')
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden professional-bg grid-pattern">
      <div 
        className="custom-cursor"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
        }}
      />
      
      {cursorTrails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x - 3,
            top: trail.y - 3,
            opacity: (index + 1) / cursorTrails.length * 0.6,
          }}
        />
      ))}

      <div className="relative z-10 container mx-auto p-6">
        <header className="flex justify-between items-center py-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 mb-8 px-6 card-hover">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <h1 className="text-2xl font-bold text-white">
              PANDA
            </h1>
            <span className="text-xs px-3 py-1 bg-indigo-500/20 rounded-full border border-indigo-500/30 text-indigo-300 font-medium">
              BETA
            </span>
          </div>
        </header>
        <main className="relative z-10 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </Router>
        </main>
      </div>
    </div>
  )
}

export default App
