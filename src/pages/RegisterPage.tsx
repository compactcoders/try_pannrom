import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "@/services/api"
import { User, Building2, Lock, Mail, UserPlus, ArrowLeft } from "lucide-react"

const RegisterPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent, type: 'personal' | 'organization') => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")
    
    try {
      if (type === 'personal') {
        await api.registerUser({ 
          userid: Date.now().toString(), 
          name, 
          email, 
          password 
        })
      } else {
        await api.registerOrg({ 
          orgid: Date.now().toString(), 
          name, 
          email, 
          password 
        })
      }
      setSuccess("Account created successfully! Redirecting to login...")
      setTimeout(() => navigate("/login"), 2000)
    } catch (error) {
      setError("Registration failed. Please try again.")
      console.error("Registration failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 fade-in">
      <div className="w-full max-w-md">
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl card-hover">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Join PANDA
            </CardTitle>
            <p className="text-gray-400">Create your knowledge transformation account</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}
            
            {success && (
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
                {success}
              </div>
            )}
            
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/20 p-1 mb-6">
                <TabsTrigger 
                  value="personal" 
                  className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white flex items-center space-x-2 font-medium"
                >
                  <User className="w-4 h-4" />
                  <span>Personal</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="organization" 
                  className="data-[state=active]:bg-purple-500 data-[state=active]:text-white flex items-center space-x-2 font-medium"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Organization</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <form onSubmit={(e) => handleRegister(e, 'personal')} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300 font-medium">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="pl-11 bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-indigo-400 focus-ring"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300 font-medium">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="pl-11 bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-indigo-400 focus-ring"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300 font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input 
                        id="password" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a strong password"
                        className="pl-11 bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-indigo-400 focus-ring"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold py-6 button-hover disabled:opacity-50"
                  >
                    {isLoading ? "Creating Account..." : "Create Personal Account"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="organization">
                <form onSubmit={(e) => handleRegister(e, 'organization')} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="org-name" className="text-gray-300 font-medium">Organization Name</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input 
                        id="org-name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Acme Corporation"
                        className="pl-11 bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-purple-400 focus-ring"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="org-email" className="text-gray-300 font-medium">Admin Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input 
                        id="org-email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@company.com"
                        className="pl-11 bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-purple-400 focus-ring"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="org-password" className="text-gray-300 font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input 
                        id="org-password" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a strong password"
                        className="pl-11 bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-purple-400 focus-ring"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-semibold py-6 button-hover disabled:opacity-50"
                  >
                    {isLoading ? "Creating Account..." : "Create Organization Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
            
            <div className="text-center">
              <Link 
                to="/" 
                className="inline-flex items-center space-x-2 text-gray-400 hover:text-white text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RegisterPage