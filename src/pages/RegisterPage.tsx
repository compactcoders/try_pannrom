import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import api from "@/services/api"
import { useNavigate } from "react-router-dom"
import { User, Building2, Lock, Mail, UserPlus } from "lucide-react"

const RegisterPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent, type: 'personal' | 'organization') => {
    e.preventDefault()
    try {
      if (type === 'personal') {
        await api.registerUser({ userid: Date.now().toString(), name, email, password })
      } else {
        await api.registerOrg({ orgid: Date.now().toString(), name, email, password })
      }
      navigate("/login")
    } catch (error) {
      console.error("Registration failed:", error)
    }
  }

  return (
    <div className="min-h-[80vh] grid place-items-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 shadow-2xl shadow-pink-500/10 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-cyan-500/5 animate-pulse" />
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 via-pink-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                Join PANDA
              </h2>
              <p className="text-slate-400 text-sm">Create your knowledge transformation account</p>
            </div>
            
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10 p-1 mb-6">
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
                <form onSubmit={(e) => handleRegister(e, 'personal')} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-200 font-medium">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="pl-11 bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-200 font-medium">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
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
                        placeholder="Create a strong password"
                        className="pl-11 bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-6 rounded-xl shadow-lg shadow-purple-500/25 border-0">
                    Create Personal Account
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="organization">
                <form onSubmit={(e) => handleRegister(e, 'organization')} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="org-name" className="text-slate-200 font-medium">Organization Name</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input 
                        id="org-name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Acme Corporation"
                        className="pl-11 bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-500/50 focus:ring-purple-500/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-email" className="text-slate-200 font-medium">Admin Email</Label>
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
                        placeholder="Create a strong password"
                        className="pl-11 bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-500/50 focus:ring-purple-500/20"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-6 rounded-xl shadow-lg shadow-pink-500/25 border-0">
                    Create Organization Account
                  </Button>
                </form>
              </TabsContent>
                        </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
