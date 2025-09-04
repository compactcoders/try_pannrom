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
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const fetchBlogs = async () => {
    try {
      const userBlogs = await api.getBlogs()
      setBlogs(userBlogs)
    } catch (error) {
      console.error("Failed to fetch blogs:", error)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await api.ingestBlog({
        ownerType: "user",
        ownerId: "1",
        blogId: Date.now().toString(),
        title,
        description,
        content
      })
      
      setTitle("")
      setDescription("")
      setContent("")
      fetchBlogs()
    } catch (error) {
      console.error("Failed to create blog:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl card-hover professional-glow">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-white">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <span>Knowledge Base</span>
          <span className="text-xs px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30 text-purple-300 font-medium">
            {blogs.length} items
          </span>
        </CardTitle>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-semibold flex items-center space-x-2 button-hover">
              <Plus className="w-5 h-5" />
              <span>Add Content</span>
            </Button>
          </DialogTrigger>
          
          <DialogContent className="bg-white/10 backdrop-blur-xl border border-white/20 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                Create Knowledge Item
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleAddBlog} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300 font-medium flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>Title</span>
                </Label>
                <Input 
                  id="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a descriptive title..."
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-purple-400 focus-ring"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300 font-medium flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-purple-400" />
                  <span>Description</span>
                </Label>
                <Input 
                  id="description" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the content..."
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-purple-400 focus-ring"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content" className="text-gray-300 font-medium">Content</Label>
                <Textarea 
                  id="content" 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter your knowledge content here..."
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-purple-400 focus-ring min-h-[120px]"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-semibold py-3 button-hover disabled:opacity-50"
              >
                {isLoading ? "Creating..." : "Create Knowledge Item"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent>
        {blogs.length > 0 ? (
          <div className="space-y-4">
            {blogs.map((blog: any) => (
              <div key={blog.blogId} className="p-6 rounded-xl bg-white/5 border border-white/10 card-hover">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-semibold text-white">{blog.title}</h3>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 leading-relaxed">{blog.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-indigo-400" />
                        <span>Created today</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Tag className="w-3 h-3 text-purple-400" />
                        <span>ID: {blog.blogId}</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-gray-300 text-lg mb-2 font-semibold">No knowledge items yet</p>
            <p className="text-gray-400 text-sm">Start building your knowledge base by adding your first item</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default BlogManager