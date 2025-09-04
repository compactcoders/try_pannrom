import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"
import { ModeToggle } from "./components/mode-toggle"
import { useEffect, useState } from "react"

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorTrails, setCursorTrails] = useState<Array<{id: number, x: number, y: number}>>([])

  useEffect(() => {
    let trailId = 0
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Add cursor trail
      const newTrail = { id: trailId++, x: e.clientX, y: e.clientY }
      setCursorTrails(prev => [...prev.slice(-8), newTrail])
      
      // Update CSS custom properties for energy field
      document.documentElement.style.setProperty('--mouse-x', `${(e.clientX / window.innerWidth) * 100}%`)
      document.documentElement.style.setProperty('--mouse-y', `${(e.clientY / window.innerHeight) * 100}%`)
    }

    const handleMouseDown = () => {
      document.querySelector('.custom-cursor')?.classList.add('click')
    }

    const handleMouseUp = () => {
      document.querySelector('.custom-cursor')?.classList.remove('click')
    }

    const handleMouseEnter = (e: Event) => {
      if ((e.target as Element).matches('button, input, a, [role="button"]')) {
        document.querySelector('.custom-cursor')?.classList.add('hover')
      }
    }

    const handleMouseLeave = (e: Event) => {
      if ((e.target as Element).matches('button, input, a, [role="button"]')) {
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Custom Cursor */}
      <div 
        className="custom-cursor gpu-accelerated"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
        }}
      />
      
      {/* Cursor Trails */}
      {cursorTrails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail gpu-accelerated"
          style={{
            left: trail.x - 3,
            top: trail.y - 3,
            opacity: (index + 1) / cursorTrails.length * 0.6,
            transform: `scale(${(index + 1) / cursorTrails.length})`,
          }}
        />
      ))}

      {/* Advanced Animated Background */}
      <div className="absolute inset-0 morphing-bg" />
      <div className="absolute inset-0 energy-field" />
      
      {/* Floating Orbs */}
      <div className="floating-orb gpu-accelerated" />
      <div className="floating-orb gpu-accelerated" />
      <div className="floating-orb gpu-accelerated" />
      <div className="floating-orb gpu-accelerated" />
      <div className="floating-orb gpu-accelerated" />
      
      {/* Particle System */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle gpu-accelerated"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
      
      {/* Neural Network Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="neural-line gpu-accelerated"
            style={{
              top: `${10 + i * 12}%`,
              left: `${Math.random() * 20}%`,
              width: `${60 + Math.random() * 30}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      
      {/* Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="geometric-shape gpu-accelerated"
            style={{
              width: `${50 + Math.random() * 100}px`,
              height: `${50 + Math.random() * 100}px`,
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
              animationDelay: `${Math.random() * 30}s`,
            }}
          />
        ))}
      </div>
      
      {/* Matrix rain effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="matrix-rain gpu-accelerated"
            style={{
              left: `${(i * 7) % 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            {Math.random().toString(2).substr(2, 8)}
          </div>
        ))}
      </div>
      
      <div className="relative z-10 container mx-auto p-6">
        <header className="flex justify-between items-center py-6 backdrop-blur-xl bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80 rounded-2xl border border-white/20 mb-8 px-6 neon-border scan-line hover:glow-cyan transition-all duration-500 group interactive-glow wave-animation magnetic-field">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-300 hologram breathing energy-ripple">
              <span className="text-white font-black text-xl relative z-10">P</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700" />
            </div>
            <h1 className="text-3xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:tracking-widest transition-all duration-300 glitch" data-text="PANDA">
              PANDA
            </h1>
            <span className="text-xs px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-500/30 text-cyan-300 font-mono font-bold pulse-glow">
              BETA
            </span>
          </div>
          <div className="magnetic">
            <ModeToggle />
          </div>
        </header>
        <main className="relative z-10 liquid-bg rounded-3xl p-8 backdrop-blur-sm border border-white/10">
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
