import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Mic, MessageSquare, Sparkles } from "lucide-react"

const LandingPage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative fade-in-smooth">
      {/* Hero Section */}
      <div className="text-center max-w-5xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-500/30 rounded-full px-6 py-3 mb-8 hover:scale-102 transition-all duration-300 magnetic">
          <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span className="text-sm font-mono font-bold text-cyan-300 tracking-widest">NEXT.GEN.KNOWLEDGE.PLATFORM</span>
        </div>
        
        <h2 className="text-6xl md:text-8xl font-black tracking-wider mb-8 font-mono">
          <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent transition-all duration-500">
            Transform
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent transition-all duration-500">
            Knowledge
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto font-mono tracking-wide">
          CAPTURE.CONVERSATIONS → TRANSCRIBE.INSIGHTS → BUILD.KNOWLEDGE.GRAPH → UNLOCK.INTELLIGENCE
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-2xl shadow-purple-500/25 border border-cyan-500/30 px-10 py-8 text-lg font-mono font-bold group hover:scale-105 subtle-glow transition-all duration-300 tracking-wider magnetic">
            <Link to="/login" className="flex items-center space-x-2">
              <span>GET.STARTED</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="backdrop-blur-xl bg-slate-900/50 border-white/30 text-white hover:bg-white/10 hover:border-purple-500/50 px-10 py-8 text-lg font-mono font-bold hover:scale-105 subtle-glow transition-all duration-300 tracking-wider magnetic">
            <Link to="/register">CREATE.ACCOUNT</Link>
          </Button>
        </div>
      </div>
      
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="group p-8 rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-800/30 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-102 subtle-glow magnetic">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 gentle-float">
            <Mic className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-black text-white mb-4 font-mono tracking-wider group-hover:text-cyan-300 transition-colors duration-300">AUDIO.CAPTURE</h3>
          <p className="text-slate-300 leading-relaxed font-mono tracking-wide text-sm">
            RECORD.AND.TRANSCRIBE conversations, lectures, and meetings with advanced AI-powered speech recognition.
          </p>
        </div>
        
        <div className="group p-8 rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-800/30 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-102 subtle-glow magnetic">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 gentle-float">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-black text-white mb-4 font-mono tracking-wider group-hover:text-purple-300 transition-colors duration-300">KNOWLEDGE.GRAPH</h3>
          <p className="text-slate-300 leading-relaxed font-mono tracking-wide text-sm">
            BUILD.INTELLIGENT.CONNECTIONS between your content with semantic understanding and contextual relationships.
          </p>
        </div>
        
        <div className="group p-8 rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-800/30 backdrop-blur-xl border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:transform hover:scale-102 subtle-glow magnetic">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 gentle-float">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-black text-white mb-4 font-mono tracking-wider group-hover:text-pink-300 transition-colors duration-300">AI.CONVERSATIONS</h3>
          <p className="text-slate-300 leading-relaxed font-mono tracking-wide text-sm">
            CHAT.NATURALLY with your knowledge base using advanced AI that understands context and nuance.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
