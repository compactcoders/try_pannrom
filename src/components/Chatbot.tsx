import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useState } from "react"
import api from "@/services/api"
import { MessageSquare, Send, Bot, User, Zap, Settings } from "lucide-react"

const Chatbot = () => {
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([])
  const [input, setInput] = useState("")
  const [sessionId, setSessionId] = useState<string>("")
  const [userId, setUserId] = useState<string>("")
  const [blogId, setBlogId] = useState<string>("")

  useEffect(() => {
    const refresh = () => {
      setSessionId(localStorage.getItem("lastSessionId") || "")
      setUserId(localStorage.getItem("lastUserId") || "")
      setBlogId(localStorage.getItem("lastBlogId") || "")
    }
    refresh()
    const onStorage = () => refresh()
    const onPanda = () => refresh()
    window.addEventListener("storage", onStorage)
    window.addEventListener("panda-context-updated", onPanda as EventListener)
    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener("panda-context-updated", onPanda as EventListener)
    }
  }, [])

  const handleSend = async () => {
    if (!input) return
    const userMessage = { sender: "user", text: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")

    const activeSession = sessionId || localStorage.getItem("lastSessionId") || ""
    const activeUser = userId || localStorage.getItem("lastUserId") || ""
    const activeBlog = blogId || localStorage.getItem("lastBlogId") || ""

    let response: any
    try {
      if (activeUser && activeBlog) {
        response = await api.chat("blog", { user_id: activeUser, blog_id: activeBlog, question: userMessage.text })
      } else if (activeSession) {
        response = await fetch("http://localhost:8000/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ session_id: activeSession, question: userMessage.text })
        }).then(r => r.json())
      } else if (activeUser) {
        response = await api.chat("profile", { user_id: activeUser, question: userMessage.text })
      } else {
        response = { answer: "No context available. Set a User ID + Blog ID (preferred) or a Session ID." }
      }
    } catch (e: any) {
      response = { answer: e?.message || "Error answering question." }
    }

    const botMessage = { sender: "bot", text: response.answer }
    setMessages(prev => [...prev, botMessage])
  }

  return (
    <Card className="flex flex-col h-[700px] bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-xl border border-cyan-500/30 shadow-2xl overflow-hidden relative neon-border hover:glow-cyan transition-all duration-500 group fade-in-up interactive-glow wave-animation magnetic-field hover-lift">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-pink-500/5 circuit-pattern" />
      <div className="absolute inset-0 energy-field" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
      <CardHeader className="scan-line parallax-slow">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-white relative z-10 group-hover:text-cyan-300 transition-colors duration-300">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300 gentle-float">
            <MessageSquare className="h-6 w-6 text-white relative z-10" />
          </div>
          <span className="font-mono tracking-wider">AI.ASSISTANT</span>
          <div className="ml-auto flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse pulse-glow" />
            <span className="text-xs text-green-400 font-mono font-bold tracking-widest">ONLINE</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-4 relative z-10 parallax-medium">
        {/* Context Configuration */}
        <div className="space-y-3 p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 magnetic">
          <div className="flex items-center space-x-2 mb-3">
            <Settings className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-mono font-bold text-cyan-300 tracking-widest">CONTEXT.CONFIG</span>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <div className="flex space-x-2">
              <Input 
                value={userId} 
                onChange={(e) => setUserId(e.target.value)} 
                placeholder="User ID for profile/blog chat"
                className="flex-1 bg-slate-900/50 border-cyan-500/30 text-cyan-100 placeholder:text-slate-500 text-xs focus:border-cyan-400 focus:glow-cyan font-mono transition-all duration-300 magnetic"
              />
              <Button 
                type="button" 
                onClick={() => localStorage.setItem("lastUserId", userId)} 
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white border border-cyan-500/30 px-4 font-mono font-bold hover:scale-102 transition-all duration-300 subtle-glow magnetic"
              >
                SET
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Input 
                value={blogId} 
                onChange={(e) => setBlogId(e.target.value)} 
                placeholder="Blog ID (preferred with User ID)"
                className="flex-1 bg-slate-900/50 border-purple-500/30 text-purple-100 placeholder:text-slate-500 text-xs focus:border-purple-400 focus:glow-purple font-mono transition-all duration-300 magnetic"
              />
              <Button 
                type="button" 
                onClick={() => localStorage.setItem("lastBlogId", blogId)} 
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white border border-purple-500/30 px-4 font-mono font-bold hover:scale-102 transition-all duration-300 subtle-glow magnetic"
              >
                SET
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Input 
                value={sessionId} 
                onChange={(e) => setSessionId(e.target.value)} 
                placeholder="Session ID (fallback)"
                className="flex-1 bg-slate-900/50 border-pink-500/30 text-pink-100 placeholder:text-slate-500 text-xs focus:border-pink-400 focus:glow-pink font-mono transition-all duration-300 magnetic"
              />
              <Button 
                type="button" 
                onClick={() => localStorage.setItem("lastSessionId", sessionId)} 
                size="sm"
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-400 hover:to-pink-500 text-white border border-pink-500/30 px-4 font-mono font-bold hover:scale-102 transition-all duration-300 subtle-glow magnetic"
              >
                SET
              </Button>
            </div>
          </div>
        </div>
        
        {/* Chat Messages */}
        <ScrollArea className="h-[380px] pr-4 data-stream parallax-fast">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 gentle-float">
                  <Bot className="w-8 h-8 text-cyan-400 animate-pulse" />
                </div>
                <p className="text-slate-400 text-sm font-mono tracking-wider">INITIALIZE.CONVERSATION.PROTOCOL</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''} fade-in-smooth`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden hover:scale-105 transition-transform duration-300 gentle-float ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-br from-cyan-400 to-cyan-600' 
                    : 'bg-gradient-to-br from-purple-400 to-purple-600'
                }`}>
                  {msg.sender === 'user' ? (
                    <User className="w-5 h-5 text-white relative z-10" />
                  ) : (
                    <Bot className="w-5 h-5 text-white relative z-10" />
                  )}
                </div>
                <div className={`px-4 py-3 rounded-2xl max-w-[80%] shadow-2xl border transition-all duration-300 hover:scale-[1.01] font-mono magnetic ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-br from-cyan-500/80 to-cyan-600/80 text-white border-cyan-500/30 subtle-glow' 
                    : 'bg-gradient-to-br from-slate-900/80 to-slate-800/60 text-slate-200 border-white/20 hover:border-purple-500/30 subtle-glow'
                }`}>
                  <p className="text-sm leading-relaxed tracking-wide">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      
      {/* Chat Input */}
      <div className="p-6 border-t border-cyan-500/20 relative z-10 bg-gradient-to-r from-slate-900/50 to-slate-800/30 backdrop-blur-sm">
        <div className="flex space-x-3">
          <div className="relative flex-1">
            <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400 animate-pulse" />
            <Input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
              placeholder="Ask anything about your knowledge base..."
              className="pl-11 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-slate-500 focus:border-cyan-400 py-4 font-mono tracking-wide transition-all duration-300 hover:bg-slate-800/50 magnetic"
            />
          </div>
          <Button 
            onClick={handleSend}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-mono font-bold px-6 py-4 rounded-xl shadow-2xl border border-cyan-500/30 flex items-center space-x-2 hover:scale-102 subtle-glow transition-all duration-300 magnetic"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default Chatbot
