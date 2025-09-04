import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { Upload, AudioWaveform, CheckCircle, Activity } from "lucide-react"
import api from "@/services/api"

const AudioUpload = () => {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [sessionId, setSessionId] = useState<string>(`${Date.now()}`)
  const [userId, setUserId] = useState<string>("1")
  const [blogId, setBlogId] = useState<string>("1")
  const [message, setMessage] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)

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
    setIsUploading(true)
    simulateProgress()
    
    try {
      const res = await api.ingestAudio(sessionId, userId, blogId, file)
      localStorage.setItem("lastSessionId", sessionId)
      localStorage.setItem("lastUserId", userId)
      localStorage.setItem("lastBlogId", blogId)
      window.dispatchEvent(new CustomEvent("panda-context-updated"))
      setMessage(res?.message || "Audio processed successfully.")
    } catch (e: any) {
      setMessage(e?.message || "Upload failed.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl card-hover professional-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-white">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <AudioWaveform className="h-6 w-6 text-white" />
          </div>
          <span>Audio Intelligence</span>
          <div className="ml-auto flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full status-online" />
            <span className="text-xs text-green-400 font-medium">Ready</span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="session" className="text-gray-300 font-medium flex items-center space-x-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              <span>Session ID</span>
            </Label>
            <Input 
              id="session" 
              value={sessionId} 
              onChange={(e) => setSessionId(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-indigo-400 focus-ring"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="user" className="text-gray-300 font-medium">User ID</Label>
            <Input 
              id="user" 
              value={userId} 
              onChange={(e) => setUserId(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-indigo-400 focus-ring"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="blog" className="text-gray-300 font-medium">Blog ID</Label>
            <Input 
              id="blog" 
              value={blogId} 
              onChange={(e) => setBlogId(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-indigo-400 focus-ring"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="audio-file" className="text-gray-300 font-medium">Audio File</Label>
          <Input 
            id="audio-file" 
            type="file" 
            accept="audio/*" 
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="bg-white/5 border-white/20 text-white file:bg-indigo-500 file:text-white file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:font-medium focus:border-indigo-400 focus-ring"
          />
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <Button 
            onClick={handleUpload} 
            disabled={!file || isUploading}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold px-8 py-3 flex items-center space-x-2 button-hover disabled:opacity-50"
          >
            <Upload className="w-5 h-5" />
            <span>{isUploading ? "Processing..." : "Process Audio"}</span>
          </Button>
          
          {message && (
            <div className="flex items-center space-x-2 fade-in">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm text-green-400 font-medium">{message}</span>
            </div>
          )}
        </div>
        
        {progress > 0 && (
          <div className="space-y-3 fade-in">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Processing audio...</span>
              <span className="text-indigo-400 font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default AudioUpload