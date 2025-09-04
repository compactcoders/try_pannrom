import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useState } from "react"
import api from "@/services/api"
import { MessageSquare, Send, Bot, User, Settings } from "lucide-react"

const Chatbot = () => {
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([])
  const [input, setInput] = useState("")
  const [sessionId, setSessionId] = useState<string>("")
  const [userId, setUserId] = useState<string>("")
  const [blogId, setBlogId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

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
    if (!input.trim()) return
    
    const userMessage = { sender: "user", text: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    const activeSession = sessionId || localStorage.getItem("lastSessionId") || ""
    const activeUser = userId || localStorage.getItem("lastUserId") || ""
    const activeBlog = blogId || localStorage.getItem("lastBlogId") || ""

    let response: any
    try {
      if (activeUser && activeBlog) {
        response = await api.chat("blog", { user_id: activeUser, blog_id: activeBlog, question: userMessage.text })
      } else if (activeSession) {
        response = await fetch("/api/query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: activeSession, question: userMessage.text })
        }).then(r => r.json())
      } else if (activeUser) {
        response = await api.chat("profile", { user_id: activeUser, question: userMessage.text })
      } else {
        response = { answer: "No context available. Please set a User ID + Blog ID or Session ID." }
      }
    } catch (e: any) {
      response = { answer: e?.message || "Error processing your question." }
    }

    const botMessage = { sender: "bot", text: response.answer }
    setMessages(prev => [...prev, botMessage])
    setIsLoading(false)
  }

  return (
    <Card className="flex flex-col h-[700px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl card-hover professional-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-white">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <span>AI Assistant</span>
          <div className="ml-auto flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full status-online" />
            <span className="text-xs text-green-400 font-medium">Online</span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow space-y-4">
        {/* Context Configuration */}
        <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center space-x-2 mb-3">
            <Settings className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-semibold text-white">Context Configuration</span>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <div className="flex space-x-2">
              <Input 
                value={userId} 
                onChange={(e) => setUserId(e.target.value)} 
                placeholder="User ID for profile/blog chat"
                className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-gray-500 text-sm focus:border-indigo-400 focus-ring"
              />
              <Button 
                type="button" 
                onClick={() => localStorage.setItem("lastUserId", userId)} 
                size="sm"
                className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 font-medium button-hover"
              >
                Set
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Input 
                value={blogId} 
                onChange={(e) => setBlogId(e.target.value)} 
                placeholder="Blog ID (preferred with User ID)"
                className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-gray-500 text-sm focus:border-purple-400 focus-ring"
              />
              <Button 
                type="button" 
                onClick={() => localStorage.setItem("lastBlogId", blogId)} 
                size="sm"
                className="bg-purple-500 hover:bg-purple-400 text-white px-4 font-medium button-hover"
              >
                Set
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Input 
                value={sessionId} 
                onChange={(e) => setSessionId(e.target.value)} 
                placeholder="Session ID (fallback)"
                className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-gray-500 text-sm focus:border-pink-400 focus-ring"
              />
              <Button 
                type="button" 
                onClick={() => localStorage.setItem("lastSessionId", sessionId)} 
                size="sm"
                className="bg-pink-500 hover:bg-pink-400 text-white px-4 font-medium button-hover"
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
                <div className="w-16 h-16 bg-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-indigo-400" />
                </div>
                <p className="text-gray-400 text-sm">Start a conversation with your AI assistant</p>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''} fade-in`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-br from-indigo-500 to-indigo-600' 
                    : 'bg-gradient-to-br from-purple-500 to-purple-600'
                }`}>
                  {msg.sender === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className={`px-4 py-3 rounded-2xl max-w-[80%] shadow-lg border ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-br from-indigo-500/80 to-indigo-600/80 text-white border-indigo-500/30' 
                    : 'bg-white/10 text-gray-200 border-white/20'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start space-x-3 fade-in">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-purple-500 to-purple-600">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white/10 text-gray-200 border border-white/20">
                  <p className="text-sm loading-dots">Thinking</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      
      {/* Chat Input */}
      <div className="p-6 border-t border-white/10 bg-white/5">
        <div className="flex space-x-3">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()} 
            placeholder="Ask anything about your knowledge base..."
            className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-indigo-400 focus-ring"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold px-6 button-hover disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default Chatbot