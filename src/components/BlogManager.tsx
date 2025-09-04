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
    <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent" />
      <CardHeader className="flex flex-row items-center justify-between relative z-10">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-white">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-xl flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          Knowledge Base
          <span className="text-xs px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 text-purple-300 font-medium">
            {blogs.length} items
          </span>
        </CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg border-0 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Content</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/20 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Create Knowledge Item
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddBlog} className="space-y-6 pt-4">
              <div className="space-y-3">
                <Label htmlFor="title" className="text-slate-200 font-medium flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>Title</span>
                </Label>
                <Input 
                  id="title" 
                  placeholder="Enter a descriptive title..."
                  className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-500/50"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="description" className="text-slate-200 font-medium flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-purple-400" />
                  <span>Description</span>
                </Label>
                <Input 
                  id="description" 
                  placeholder="Brief description of the content..."
                  className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-500/50"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="content" className="text-slate-200 font-medium">Content</Label>
                <Textarea 
                  id="content" 
                  placeholder="Enter your knowledge content here..."
                  className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-500/50 min-h-[120px]"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 rounded-xl shadow-lg border-0">
                Create Knowledge Item
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="relative z-10">
        {blogs.length > 0 ? (
          <div className="space-y-4">
            {blogs.map((blog: any) => (
              <div key={blog.blogId} className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-[1.02]">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors">{blog.title}</h3>
                    </div>
                    <p className="text-slate-300 text-sm mb-3 leading-relaxed">{blog.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Created today</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Tag className="w-3 h-3" />
                        <span>ID: {blog.blogId}</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-slate-400 text-lg mb-2">No knowledge items yet</p>
            <p className="text-slate-500 text-sm">Start building your knowledge base by adding your first item</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default BlogManager
