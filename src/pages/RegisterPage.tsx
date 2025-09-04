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
    <div className="min-h-[80vh] grid place-items-center px-4 fade-in-up">
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-800/70 backdrop-blur-xl border border-purple-500/30 p-8 shadow-2xl shadow-purple-500/20 relative overflow-hidden neon-border hover:glow-purple transition-all duration-500 float circuit-pattern">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-cyan-500/5 animate-pulse hologram" />
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 opacity-60" />
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 via-pink-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl hover:scale-110 transition-transform duration-300 hologram pulse-glow">
                <UserPlus className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-3 font-mono tracking-wider">
                JOIN.PANDA
              </h2>
              <p className="text-slate-400 text-sm font-mono tracking-widest">CREATE.YOUR.KNOWLEDGE.TRANSFORMATION.ACCOUNT</p>
            </div>
            
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-900/50 border border-white/20 p-1 mb-6 rounded-xl">
                <TabsTrigger value="personal" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-600 data-[state=active]:text-white flex items-center space-x-2 font-mono font-bold tracking-wider hover:scale-105 transition-all duration-300">
                  <User className="w-4 h-4" />
                  <span>PERSONAL</span>
                </TabsTrigger>
                <TabsTrigger value="organization" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white flex items-center space-x-2 font-mono font-bold tracking-wider hover:scale-105 transition-all duration-300">
                  <Building2 className="w-4 h-4" />
                  <span>ORGANIZATION</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <form onSubmit={(e) => handleRegister(e, 'personal')} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-cyan-300 font-mono font-bold text-xs uppercase tracking-widest">FULL.NAME</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400 animate-pulse" />
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="pl-11 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:glow-cyan font-mono transition-all duration-300 py-4"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-cyan-300 font-mono font-bold text-xs uppercase tracking-widest">EMAIL.ADDRESS</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400 animate-pulse" />
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="pl-11 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:glow-cyan font-mono transition-all duration-300 py-4"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-cyan-300 font-mono font-bold text-xs uppercase tracking-widest">PASSWORD</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400 animate-pulse" />
                      <Input 
                        id="password" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a strong password"
                        className="pl-11 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:glow-cyan font-mono transition-all duration-300 py-4"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-mono font-bold py-8 rounded-xl shadow-2xl shadow-cyan-500/25 border border-cyan-500/30 hover:scale-105 hover:glow-cyan transition-all duration-300 relative overflow-hidden group tracking-wider">
                    CREATE.PERSONAL.ACCOUNT
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700" />
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="organization">
                <form onSubmit={(e) => handleRegister(e, 'organization')} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="org-name" className="text-purple-300 font-mono font-bold text-xs uppercase tracking-widest">ORGANIZATION.NAME</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400 animate-pulse" />
                      <Input 
                        id="org-name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Acme Corporation"
                        className="pl-11 bg-slate-900/50 border-purple-500/30 text-white placeholder:text-slate-500 focus:border-purple-400 focus:glow-purple font-mono transition-all duration-300 py-4"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-email" className="text-purple-300 font-mono font-bold text-xs uppercase tracking-widest">ADMIN.EMAIL</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400 animate-pulse" />
                      <Input 
                        id="org-email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@company.com"
                        className="pl-11 bg-slate-900/50 border-purple-500/30 text-white placeholder:text-slate-500 focus:border-purple-400 focus:glow-purple font-mono transition-all duration-300 py-4"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-password" className="text-purple-300 font-mono font-bold text-xs uppercase tracking-widest">PASSWORD</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400 animate-pulse" />
                      <Input 
                        id="org-password" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a strong password"
                        className="pl-11 bg-slate-900/50 border-purple-500/30 text-white placeholder:text-slate-500 focus:border-purple-400 focus:glow-purple font-mono transition-all duration-300 py-4"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-mono font-bold py-8 rounded-xl shadow-2xl shadow-purple-500/25 border border-purple-500/30 hover:scale-105 hover:glow-purple transition-all duration-300 relative overflow-hidden group tracking-wider">
                    CREATE.ORGANIZATION.ACCOUNT
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700" />
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
