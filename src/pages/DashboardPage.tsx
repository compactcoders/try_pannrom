import AudioUpload from "@/components/AudioUpload"
import BlogManager from "@/components/BlogManager"
import Chatbot from "@/components/Chatbot"
import { Activity, TrendingUp, Users, Database } from "lucide-react"

const DashboardPage = () => {
  return (
    <div className="space-y-8 pb-8 fade-in">
      {/* Dashboard Header */}
      <div className="rounded-2xl p-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl card-hover">
        <h2 className="text-4xl font-bold text-white mb-3">
          Knowledge Dashboard
        </h2>
        <p className="text-gray-300 text-lg">Transform ideas into intelligence</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 card-hover professional-glow">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-10 h-10 text-indigo-400" />
            <span className="text-3xl font-bold text-white">24</span>
          </div>
          <p className="text-indigo-300 font-semibold text-sm">Active Sessions</p>
          <p className="text-xs text-gray-400">+12% from last week</p>
        </div>
        
        <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 card-hover professional-glow">
          <div className="flex items-center justify-between mb-4">
            <Database className="w-10 h-10 text-purple-400" />
            <span className="text-3xl font-bold text-white">156</span>
          </div>
          <p className="text-purple-300 font-semibold text-sm">Knowledge Items</p>
          <p className="text-xs text-gray-400">+8 new today</p>
        </div>
        
        <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 card-hover professional-glow">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-10 h-10 text-pink-400" />
            <span className="text-3xl font-bold text-white">89</span>
          </div>
          <p className="text-pink-300 font-semibold text-sm">Conversations</p>
          <p className="text-xs text-gray-400">+23% engagement</p>
        </div>
        
        <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 card-hover professional-glow">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-10 h-10 text-emerald-400" />
            <span className="text-3xl font-bold text-white">94%</span>
          </div>
          <p className="text-emerald-300 font-semibold text-sm">Accuracy Score</p>
          <p className="text-xs text-gray-400">AI Performance</p>
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