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
    <Card className="flex flex-col h-[700px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-white relative z-10">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          AI Assistant
          <div className="ml-auto flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400 font-medium">ONLINE</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-4 relative z-10">
        {/* Context Configuration */}
        <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center space-x-2 mb-3">
            <Settings className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-300">Context Configuration</span>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <div className="flex space-x-2">
              <Input 
                value={userId} 
                onChange={(e) => setUserId(e.target.value)} 
                placeholder="User ID for profile/blog chat"
                className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-slate-400 text-xs focus:border-cyan-500/50"
              />
              <Button 
                type="button" 
                onClick={() => localStorage.setItem("lastUserId", userId)} 
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0 px-4"
              >
                Set
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Input 
                value={blogId} 
                onChange={(e) => setBlogId(e.target.value)} 
                placeholder="Blog ID (preferred with User ID)"
                className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-slate-400 text-xs focus:border-purple-500/50"
              />
              <Button 
                type="button" 
                onClick={() => localStorage.setItem("lastBlogId", blogId)} 
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0 px-4"
              >
                Set
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Input 
                value={sessionId} 
                onChange={(e) => setSessionId(e.target.value)} 
                placeholder="Session ID (fallback)"
                className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-slate-400 text-xs focus:border-pink-500/50"
              />
              <Button 
                type="button" 
                onClick={() => localStorage.setItem("lastSessionId", sessionId)} 
                size="sm"
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white border-0 px-4"
              >
                Set
              </Button>
            </div>
          </div>
        </div>
        
        {/* Chat Messages */}
        <ScrollArea className="h-[380px] pr-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Bot className="w-6 h-6 text-cyan-400" />
                </div>
                <p className="text-slate-400 text-sm">Start a conversation with your AI assistant</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-br from-cyan-400 to-cyan-600' 
                    : 'bg-gradient-to-br from-purple-400 to-purple-600'
                }`}>
                  {msg.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`px-4 py-3 rounded-2xl max-w-[80%] shadow-lg ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-br from-cyan-500 to-cyan-600 text-white' 
                    : 'bg-gradient-to-br from-white/10 to-white/5 text-slate-200 border border-white/20'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      
      {/* Chat Input */}
      <div className="p-6 border-t border-white/10 relative z-10">
        <div className="flex space-x-3">
          <div className="relative flex-1">
            <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
              placeholder="Ask anything about your knowledge base..."
              className="pl-11 bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-cyan-500/50 py-3"
            />
          </div>
          <Button 
            onClick={handleSend}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg border-0 flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default Chatbot
