import AudioUpload from "@/components/AudioUpload"
import BlogManager from "@/components/BlogManager"
import Chatbot from "@/components/Chatbot"
import { Activity, TrendingUp, Users, Database } from "lucide-react"

const DashboardPage = () => {
  return (
    <div className="space-y-8 pb-8">
      {/* Dashboard Header */}
      <div className="rounded-2xl p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
        <div className="relative z-10">
          <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Knowledge Dashboard
          </h2>
          <p className="text-slate-300 text-lg">Transform your ideas into intelligent conversations</p>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 backdrop-blur-sm border border-cyan-500/20 group hover:scale-105 transition-transform">
          <div className="flex items-center justify-between mb-3">
            <Activity className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold text-white">24</span>
          </div>
          <p className="text-cyan-300 font-medium">Active Sessions</p>
          <p className="text-xs text-slate-400">+12% from last week</p>
        </div>
        
        <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm border border-purple-500/20 group hover:scale-105 transition-transform">
          <div className="flex items-center justify-between mb-3">
            <Database className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">156</span>
          </div>
          <p className="text-purple-300 font-medium">Knowledge Items</p>
          <p className="text-xs text-slate-400">+8 new today</p>
        </div>
        
        <div className="p-6 rounded-xl bg-gradient-to-br from-pink-500/10 to-pink-600/5 backdrop-blur-sm border border-pink-500/20 group hover:scale-105 transition-transform">
          <div className="flex items-center justify-between mb-3">
            <Users className="w-8 h-8 text-pink-400" />
            <span className="text-2xl font-bold text-white">89</span>
          </div>
          <p className="text-pink-300 font-medium">Conversations</p>
          <p className="text-xs text-slate-400">+23% engagement</p>
        </div>
        
        <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 backdrop-blur-sm border border-emerald-500/20 group hover:scale-105 transition-transform">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-8 h-8 text-emerald-400" />
            <span className="text-2xl font-bold text-white">94%</span>
          </div>
          <p className="text-emerald-300 font-medium">Accuracy Score</p>
          <p className="text-xs text-slate-400">AI performance</p>
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
