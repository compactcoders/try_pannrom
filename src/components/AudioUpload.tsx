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
    <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-transparent" />
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-white relative z-10">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center">
            <Mic className="h-5 w-5 text-white" />
          </div>
          Audio Intelligence
          <div className="ml-auto flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400 font-medium">READY</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="session" className="text-slate-200 font-medium flex items-center space-x-2">
              <Waveform className="w-4 h-4 text-cyan-400" />
              <span>Session ID</span>
            </Label>
            <Input 
              id="session" 
              value={sessionId} 
              onChange={(e) => setSessionId(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-cyan-500/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user" className="text-slate-200 font-medium">User ID</Label>
            <Input 
              id="user" 
              value={userId} 
              onChange={(e) => setUserId(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-500/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="blog" className="text-slate-200 font-medium">Blog ID</Label>
            <Input 
              id="blog" 
              value={blogId} 
              onChange={(e) => setBlogId(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-pink-500/50"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="audio-file" className="text-slate-200 font-medium">Audio File</Label>
          <div className="relative">
            <Input 
              id="audio-file" 
              type="file" 
              accept="audio/*" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="bg-white/5 border-white/20 text-white file:bg-gradient-to-r file:from-cyan-500 file:to-purple-600 file:text-white file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Button 
            onClick={handleUpload} 
            disabled={!file}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg border-0 flex items-center space-x-2"
          >
            <Upload className="w-5 h-5" />
            <span>Process Audio</span>
          </Button>
          {message && (
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400 font-medium">{message}</span>
            </div>
          )}
        </div>
        
        {progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Processing...</span>
              <span className="text-cyan-400 font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/10" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default AudioUpload
