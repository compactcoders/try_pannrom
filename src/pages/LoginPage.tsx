import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "@/services/api"
import { Lock, Mail, ArrowLeft } from "lucide-react"

const LoginPage = () => {
  const [email, setEmail] = useState("test@example.com")
  const [password, setPassword] = useState("password123")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    try {
      const result = await api.login({ username: email, password: password })
      if (result.access_token) {
        navigate("/dashboard")
      } else {
        setError("Invalid credentials")
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.")
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 fade-in">
      <div className="w-full max-w-md">
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl card-hover">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">P</span>
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Welcome Back
            </CardTitle>
            <p className="text-gray-400">Sign in to your account</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}
            
            <div className="p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-center">
              <p className="text-sm text-indigo-300">
                <span className="font-semibold">Demo:</span> test@example.com / password123
              </p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300 font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email"
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
                    placeholder="Enter your password"
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
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
            
            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
                  Create one here
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

export default LoginPage