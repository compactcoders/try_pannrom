import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import api from "@/services/api"
import { BookOpen, Plus, FileText, Calendar, Tag } from "lucide-react"

const BlogManager = () => {
  const [blogs, setBlogs] = useState([])

  const fetchBlogs = async () => {
    const userBlogs = await api.getBlogs()
    setBlogs(userBlogs)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-xl border border-purple-500/30 shadow-2xl overflow-hidden relative neon-border hover:glow-purple transition-all duration-500 group slide-in-right interactive-glow wave-animation magnetic-field hover-lift">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent circuit-pattern" />
      <div className="absolute inset-0 energy-field" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50" />
      <CardHeader className="flex flex-row items-center justify-between relative z-10 scan-line parallax-slow">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-xl flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-300 hologram breathing energy-ripple">
            <BookOpen className="h-6 w-6 text-white relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700" />
          </div>
          <span className="font-mono tracking-wider">KNOWLEDGE.BASE</span>
          <span className="text-xs px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 text-purple-300 font-mono font-bold tracking-widest pulse-glow">
            {blogs.length} items
          </span>
        </CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-mono font-bold rounded-xl shadow-2xl border border-purple-500/30 flex items-center space-x-3 hover:scale-105 hover:glow-purple transition-all duration-300 relative overflow-hidden group px-6 py-3 magnetic energy-ripple">
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="tracking-wider">ADD.CONTENT</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gradient-to-br from-slate-900/95 to-slate-800/90 border border-purple-500/30 text-white backdrop-blur-xl neon-border wave-animation">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-mono tracking-wider">
                CREATE.KNOWLEDGE.ITEM
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddBlog} className="space-y-6 pt-4">
              <div className="space-y-3">
                <Label htmlFor="title" className="text-purple-300 font-mono font-bold text-xs uppercase tracking-widest flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>TITLE</span>
                </Label>
                <Input 
                  id="title" 
                  placeholder="Enter a descriptive title..."
                  className="bg-slate-900/50 border-purple-500/30 text-white placeholder:text-slate-500 focus:border-purple-400 focus:glow-purple font-mono transition-all duration-300 magnetic"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="description" className="text-purple-300 font-mono font-bold text-xs uppercase tracking-widest flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-purple-400" />
                  <span>DESCRIPTION</span>
                </Label>
                <Input 
                  id="description" 
                  placeholder="Brief description of the content..."
                  className="bg-slate-900/50 border-purple-500/30 text-white placeholder:text-slate-500 focus:border-purple-400 focus:glow-purple font-mono transition-all duration-300 magnetic"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="content" className="text-purple-300 font-mono font-bold text-xs uppercase tracking-widest">CONTENT</Label>
                <Textarea 
                  id="content" 
                  placeholder="Enter your knowledge content here..."
                  className="bg-slate-900/50 border-purple-500/30 text-white placeholder:text-slate-500 focus:border-purple-400 focus:glow-purple font-mono min-h-[120px] transition-all duration-300 magnetic"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-mono font-bold py-4 rounded-xl shadow-2xl border border-purple-500/30 hover:scale-105 hover:glow-purple transition-all duration-300 relative overflow-hidden group tracking-wider magnetic energy-ripple">
                CREATE.KNOWLEDGE.ITEM
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700" />
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="relative z-10 parallax-fast">
        {blogs.length > 0 ? (
          <div className="space-y-4">
            {blogs.map((blog: any) => (
              <div key={blog.blogId} className="group p-6 rounded-xl bg-gradient-to-br from-slate-900/60 to-slate-800/30 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:glow-purple neon-border data-stream magnetic wave-animation hover-lift">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 hologram breathing">
                        <FileText className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300" />
                      </div>
                      <h3 className="font-mono font-bold text-white group-hover:text-purple-300 transition-colors duration-300 tracking-wide">{blog.title}</h3>
                    </div>
                    <p className="text-slate-300 text-sm mb-3 leading-relaxed font-mono">{blog.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-slate-400 font-mono">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        <span className="tracking-wider">CREATED.TODAY</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Tag className="w-3 h-3 text-purple-400" />
                        <span className="tracking-wider">ID: {blog.blogId}</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 pulse-glow tracking-widest">
                      ACTIVE
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 float hologram breathing energy-ripple">
              <BookOpen className="w-10 h-10 text-purple-400 animate-pulse" />
            </div>
            <p className="text-slate-400 text-lg mb-2 font-mono tracking-wider">NO.KNOWLEDGE.ITEMS.YET</p>
            <p className="text-slate-500 text-sm font-mono tracking-wide">Start building your knowledge base by adding your first item</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default BlogManager
