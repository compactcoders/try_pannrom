import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Mic, MessageSquare, Sparkles } from "lucide-react"

const LandingPage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative fade-in">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-3 bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-full px-6 py-3 mb-8">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <span className="text-sm font-medium text-indigo-300">Next Generation Knowledge Platform</span>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Transform Your
          </span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Knowledge
          </span>
        </h2>
        
        <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
          Capture conversations, transcribe insights, build knowledge graphs, and unlock intelligence with AI-powered tools.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button asChild size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-lg px-8 py-6 text-lg font-semibold button-hover">
            <Link to="/login" className="flex items-center space-x-2">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold button-hover">
            <Link to="/register">Create Account</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 card-hover">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
            <Mic className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Audio Capture</h3>
          <p className="text-gray-300 leading-relaxed">
            Record and transcribe conversations, lectures, and meetings with advanced AI-powered speech recognition.
          </p>
        </div>
        
        <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 card-hover">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Knowledge Graph</h3>
          <p className="text-gray-300 leading-relaxed">
            Build intelligent connections between your content with semantic understanding and contextual relationships.
          </p>
        </div>
        
        <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 card-hover">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">AI Conversations</h3>
          <p className="text-gray-300 leading-relaxed">
            Chat naturally with your knowledge base using advanced AI that understands context and nuance.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage