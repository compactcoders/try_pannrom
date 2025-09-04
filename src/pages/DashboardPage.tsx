import AudioUpload from "@/components/AudioUpload"
import BlogManager from "@/components/BlogManager"
import Chatbot from "@/components/Chatbot"
import { Activity, TrendingUp, Users, Database } from "lucide-react"

const DashboardPage = () => {
  return (
    <div className="space-y-8 pb-8 fade-in-up relative">
      {/* Dashboard Header */}
      <div className="rounded-2xl p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-xl border border-white/20 shadow-2xl relative overflow-hidden hover:border-cyan-500/40 transition-all duration-500 magnetic">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse hologram energy-field" />
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-60" />
        <div className="relative z-10">
          <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 font-mono tracking-wider">
            KNOWLEDGE.DASHBOARD
          </h2>
          <p className="text-slate-300 text-lg font-mono tracking-wide">TRANSFORM.IDEAS.INTO.INTELLIGENCE</p>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-sm border border-cyan-500/30 group hover:scale-102 hover:border-cyan-500/50 transition-all duration-300 subtle-glow magnetic">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-10 h-10 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-3xl font-black text-white font-mono tracking-wider">24</span>
          </div>
          <p className="text-cyan-300 font-mono font-bold tracking-widest text-sm">ACTIVE.SESSIONS</p>
          <p className="text-xs text-slate-400 font-mono tracking-wide">+12% FROM.LAST.WEEK</p>
        </div>
        
        <div className="p-6 rounded-xl bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-sm border border-purple-500/30 group hover:scale-102 hover:border-purple-500/50 transition-all duration-300 subtle-glow magnetic">
          <div className="flex items-center justify-between mb-4">
            <Database className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-3xl font-black text-white font-mono tracking-wider">156</span>
          </div>
          <p className="text-purple-300 font-mono font-bold tracking-widest text-sm">KNOWLEDGE.ITEMS</p>
          <p className="text-xs text-slate-400 font-mono tracking-wide">+8 NEW.TODAY</p>
        </div>
        
        <div className="p-6 rounded-xl bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-sm border border-pink-500/30 group hover:scale-102 hover:border-pink-500/50 transition-all duration-300 subtle-glow magnetic">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-10 h-10 text-pink-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-3xl font-black text-white font-mono tracking-wider">89</span>
          </div>
          <p className="text-pink-300 font-mono font-bold tracking-widest text-sm">CONVERSATIONS</p>
          <p className="text-xs text-slate-400 font-mono tracking-wide">+23% ENGAGEMENT</p>
        </div>
        
        <div className="p-6 rounded-xl bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-sm border border-emerald-500/30 group hover:scale-102 hover:border-emerald-500/50 transition-all duration-300 subtle-glow magnetic">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-10 h-10 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-3xl font-black text-white font-mono tracking-wider">94%</span>
          </div>
          <p className="text-emerald-300 font-mono font-bold tracking-widest text-sm">ACCURACY.SCORE</p>
          <p className="text-xs text-slate-400 font-mono tracking-wide">AI.PERFORMANCE</p>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AudioUpload />
          <BlogManager />
        </div>
        <div className="lg:col-span-1">
          <Chatbot />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
