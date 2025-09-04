import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Mic, MessageSquare, Sparkles } from "lucide-react"

const LandingPage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative">
      {/* Hero Section */}
      <div className="text-center max-w-5xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-full px-4 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-cyan-300">Next-Gen Knowledge Platform</span>
        </div>
        
        <h2 className="text-6xl md:text-7xl font-black tracking-tight mb-6">
          <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            Transform
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Knowledge
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
          Capture conversations, transcribe insights, build your knowledge graph, and unlock intelligent conversations with your data.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-2xl shadow-purple-500/25 border-0 px-8 py-6 text-lg font-semibold group">
            <Link to="/login" className="flex items-center space-x-2">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="backdrop-blur-sm bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold">
            <Link to="/register">Create Account</Link>
          </Button>
        </div>
      </div>
      
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="group p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:transform hover:scale-105">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Mic className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Audio Capture</h3>
          <p className="text-slate-300 leading-relaxed">
            Record and transcribe conversations, lectures, and meetings with advanced AI-powered speech recognition.
          </p>
        </div>
        
        <div className="group p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Knowledge Graph</h3>
          <p className="text-slate-300 leading-relaxed">
            Build intelligent connections between your content with semantic understanding and contextual relationships.
          </p>
        </div>
        
        <div className="group p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-pink-500/30 transition-all duration-300 hover:transform hover:scale-105">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">AI Conversations</h3>
          <p className="text-slate-300 leading-relaxed">
            Chat naturally with your knowledge base using advanced AI that understands context and nuance.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
