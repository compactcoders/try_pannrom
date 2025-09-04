import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"
import { ModeToggle } from "./components/mode-toggle"

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden tech-grid">
      {/* Advanced animated background */}
      <div className="absolute inset-0 matrix-bg" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse float" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000 float" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-2xl animate-pulse delay-500" />
      
      {/* Matrix rain effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="matrix-rain" style={{left: '10%', animationDelay: '0s'}}>01001010</div>
        <div className="matrix-rain" style={{left: '20%', animationDelay: '2s'}}>11010110</div>
        <div className="matrix-rain" style={{left: '30%', animationDelay: '4s'}}>10110101</div>
        <div className="matrix-rain" style={{left: '40%', animationDelay: '1s'}}>01101001</div>
        <div className="matrix-rain" style={{left: '50%', animationDelay: '3s'}}>11001010</div>
        <div className="matrix-rain" style={{left: '60%', animationDelay: '5s'}}>10101101</div>
        <div className="matrix-rain" style={{left: '70%', animationDelay: '2.5s'}}>01010110</div>
        <div className="matrix-rain" style={{left: '80%', animationDelay: '4.5s'}}>11010011</div>
        <div className="matrix-rain" style={{left: '90%', animationDelay: '1.5s'}}>10011010</div>
      </div>
      
      <div className="relative z-10 container mx-auto p-6">
        <header className="flex justify-between items-center py-6 backdrop-blur-xl bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80 rounded-2xl border border-white/20 mb-8 px-6 neon-border scan-line hover:glow-cyan transition-all duration-500 group">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-300 hologram">
              <span className="text-white font-black text-xl relative z-10">P</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700" />
            </div>
            <h1 className="text-3xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:tracking-widest transition-all duration-300">
              PANDA
            </h1>
            <span className="text-xs px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-500/30 text-cyan-300 font-mono font-bold pulse-glow">
              BETA
            </span>
          </div>
          <ModeToggle />
        </header>
        <main className="relative z-10">
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
