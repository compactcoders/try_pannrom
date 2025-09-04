import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import api from "@/services/api"
import { useNavigate } from "react-router-dom"
import { User, Building2, Lock, Mail } from "lucide-react"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.login({ username: email, password: password })
      navigate("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <div className="min-h-[80vh] grid place-items-center px-4">
      <div className="w-full max-w-md">
        {/* Floating card with glassmorphism */}
        <div className="rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 shadow-2xl shadow-purple-500/10 relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 animate-pulse" />
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white font-black text-2xl">P</span>
              </div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h2>
              <p className="text-slate-400 text-sm">Sign in to your knowledge universe</p>
            </div>
            
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl p-3 mb-6 border border-cyan-500/20">
              <p className="text-xs text-cyan-300 text-center">
                <span className="font-semibold">Demo:</span> test@example.com / password123
              </p>
            </div>
            
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10 p-1">
                <TabsTrigger value="personal" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-600 data-[state=active]:text-white flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Personal</span>
                </TabsTrigger>
                <TabsTrigger value="organization" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white flex items-center space-x-2">
                  <Building2 className="w-4 h-4" />
                  <span>Organization</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <form onSubmit={handleLogin} className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-200 font-medium">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="test@example.com"
                        className="pl-11 bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-200 font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input 
                        id="password" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="password123"
                        className="pl-11 bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-6 rounded-xl shadow-lg shadow-purple-500/25 border-0">
                    Sign In
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="organization">
                <form onSubmit={handleLogin} className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="org-email" className="text-slate-200 font-medium">Organization Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input 
                        id="org-email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="admin@company.com"
                        className="pl-11 bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-500/50 focus:ring-purple-500/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-password" className="text-slate-200 font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input 
                        id="org-password" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="password123"
                        className="pl-11 bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-500/50 focus:ring-purple-500/20"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-6 rounded-xl shadow-lg shadow-pink-500/25 border-0">
                    Sign In as Organization
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Demo login: <span className="font-medium">test@example.com</span> / <span className="font-medium">password123</span></p>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="organization">Organization</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <form onSubmit={handleLogin} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="test@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password123" />
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </TabsContent>
          <TabsContent value="organization">
            <form onSubmit={handleLogin} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="org-email">Email</Label>
                <Input id="org-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="test@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-password">Password</Label>
                <Input id="org-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password123" />
              </div>
              <Button type="submit" className="w-full">Login as Organization</Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default LoginPage
