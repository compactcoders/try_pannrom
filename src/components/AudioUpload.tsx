import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { Upload, Mic, AudioWaveform as Waveform, CheckCircle } from "lucide-react"
import api from "@/services/api"

const AudioUpload = () => {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [sessionId, setSessionId] = useState<string>(`${Date.now()}`)
  const [userId, setUserId] = useState<string>("1")
  const [blogId, setBlogId] = useState<string>("1")
  const [message, setMessage] = useState<string>("")

  const simulateProgress = () => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 150)
  }

  const handleUpload = async () => {
    if (!file) return
    setMessage("")
    setProgress(0)
    simulateProgress()
    try {
      const res = await api.ingestAudio(sessionId, userId, blogId, file)
      // Persist latest context for the chatbot
      localStorage.setItem("lastSessionId", sessionId)
      localStorage.setItem("lastUserId", userId)
      localStorage.setItem("lastBlogId", blogId)
      // Notify same-tab listeners (storage event doesn't fire in same tab)
      window.dispatchEvent(new CustomEvent("panda-context-updated"))
      setMessage(res?.message || "Uploaded and ingested successfully.")
    } catch (e: any) {
      setMessage(e?.message || "Upload failed.")
    }
  }

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-xl border border-cyan-500/30 shadow-2xl overflow-hidden relative neon-border hover:glow-cyan transition-all duration-300 group fade-in-smooth subtle-glow">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent circuit-pattern" />
      <div className="absolute inset-0 energy-field" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-white relative z-10 group-hover:text-cyan-300 transition-colors duration-300">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300 gentle-float">
            <Mic className="h-6 w-6 text-white relative z-10" />
          </div>
          <span className="font-mono tracking-wider">AUDIO.INTELLIGENCE</span>
          <div className="ml-auto flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400 font-mono font-bold tracking-widest">READY</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="session" className="text-cyan-300 font-mono font-bold text-xs uppercase tracking-widest flex items-center space-x-2">
              <Waveform className="w-4 h-4 text-cyan-400" />
              <span>SESSION.ID</span>
            </Label>
            <Input 
              id="session" 
              value={sessionId} 
              onChange={(e) => setSessionId(e.target.value)}
              className="bg-slate-900/50 border-cyan-500/30 text-cyan-100 placeholder:text-slate-500 focus:border-cyan-400 focus:glow-cyan font-mono transition-all duration-300 hover:bg-slate-800/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user" className="text-purple-300 font-mono font-bold text-xs uppercase tracking-widest">USER.ID</Label>
            <Input 
              id="user" 
              value={userId} 
              onChange={(e) => setUserId(e.target.value)}
              className="bg-slate-900/50 border-purple-500/30 text-purple-100 placeholder:text-slate-500 focus:border-purple-400 focus:glow-purple font-mono transition-all duration-300 hover:bg-slate-800/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="blog" className="text-pink-300 font-mono font-bold text-xs uppercase tracking-widest">BLOG.ID</Label>
            <Input 
              id="blog" 
              value={blogId} 
              onChange={(e) => setBlogId(e.target.value)}
              className="bg-slate-900/50 border-pink-500/30 text-pink-100 placeholder:text-slate-500 focus:border-pink-400 focus:glow-pink font-mono transition-all duration-300 hover:bg-slate-800/50"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="audio-file" className="text-slate-200 font-mono font-bold text-xs uppercase tracking-widest">AUDIO.FILE</Label>
          <div className="relative">
            <Input 
              id="audio-file" 
              type="file" 
              accept="audio/*" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="bg-slate-900/50 border-white/20 text-white file:bg-gradient-to-r file:from-cyan-500 file:to-purple-600 file:text-white file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:font-mono file:font-bold file:shadow-lg hover:border-cyan-500/50 transition-all duration-300"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <Button 
            onClick={handleUpload} 
            disabled={!file}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-mono font-bold px-8 py-4 rounded-xl shadow-2xl border border-cyan-500/30 flex items-center space-x-3 hover:scale-105 hover:glow-cyan transition-all duration-300 relative overflow-hidden group"
          >
            <Upload className="w-5 h-5 transition-transform duration-300" />
            <span className="tracking-wider">PROCESS.AUDIO</span>
          </Button>
          {message && (
            <div className="flex items-center space-x-3 fade-in-smooth">
              <CheckCircle className="w-5 h-5 text-green-400 animate-pulse" />
              <span className="text-sm text-green-400 font-mono font-bold tracking-wide">{message}</span>
            </div>
          )}
        </div>
        
        {progress > 0 && (
          <div className="space-y-3 fade-in-smooth">
            <div className="flex justify-between text-sm font-mono">
              <span className="text-slate-300 tracking-wider">PROCESSING...</span>
              <span className="text-cyan-400 font-bold tracking-widest">{progress}%</span>
            </div>
            <Progress value={progress} className="h-3 bg-slate-900/50 border border-cyan-500/30 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-300 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </div>
            </Progress>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default AudioUpload
