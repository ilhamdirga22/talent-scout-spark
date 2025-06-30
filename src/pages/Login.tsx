
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Search, Mail, Lock, ArrowLeft, Sparkles, Bot, Zap, Stars, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMagicLink, setIsMagicLink] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      toast({
        title: "🎉 Welcome back!",
        description: "You've been successfully signed in."
      });
      setIsLoading(false);
    }, 2000);
  };

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      toast({
        title: "✨ Magic Link Sent!",
        description: "Check your email for a secure sign-in link."
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Bot className="absolute top-20 left-20 h-8 w-8 text-blue-400/30 animate-bounce" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute top-40 right-32 h-6 w-6 text-purple-400/40 animate-bounce" style={{ animationDelay: '2s' }} />
        <Zap className="absolute bottom-32 left-32 h-7 w-7 text-pink-400/30 animate-bounce" style={{ animationDelay: '3s' }} />
        <Stars className="absolute bottom-20 right-20 h-9 w-9 text-indigo-400/30 animate-bounce" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="relative">
                <Search className="h-10 w-10 text-white drop-shadow-lg" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-3xl font-bold text-white drop-shadow-lg">TalentScout AI</span>
            </div>
            <p className="text-white/70 text-lg font-medium">Your AI-powered talent discovery platform</p>
          </div>

          {/* Main Card */}
          <Card className="shadow-2xl border-0 backdrop-blur-xl bg-white/10 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl text-white font-bold mb-2">Welcome Back</CardTitle>
              <CardDescription className="text-white/70 text-lg">
                Continue your talent discovery journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Toggle Buttons */}
              <div className="flex rounded-2xl border border-white/20 p-1 bg-white/5">
                <button
                  type="button"
                  className={`flex-1 py-3 px-6 rounded-xl text-sm font-bold transition-all duration-300 ${
                    !isMagicLink 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => setIsMagicLink(false)}
                >
                  🔐 Email & Password
                </button>
                <button
                  type="button"
                  className={`flex-1 py-3 px-6 rounded-xl text-sm font-bold transition-all duration-300 ${
                    isMagicLink 
                      ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg" 
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => setIsMagicLink(true)}
                >
                  ✨ Magic Link
                </button>
              </div>

              {isMagicLink ? (
                /* Magic Link Form */
                <form onSubmit={handleMagicLinkLogin} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-white font-semibold text-base">Email Address</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-4 h-5 w-5 text-white/50 group-focus-within:text-white transition-colors" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-xl" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sending Magic Link...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Send Magic Link
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-white/60 text-center bg-white/5 rounded-lg p-3">
                    ✨ We'll send you a secure link to sign in without a password
                  </p>
                </form>
              ) : (
                /* Email/Password Form */
                <form onSubmit={handleEmailPasswordLogin} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-white font-semibold text-base">Email Address</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-4 h-5 w-5 text-white/50 group-focus-within:text-white transition-colors" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-white font-semibold text-base">Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-4 h-5 w-5 text-white/50 group-focus-within:text-white transition-colors" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-3 cursor-pointer text-white/80 hover:text-white transition-colors">
                      <input type="checkbox" className="rounded border-white/30 bg-white/10 text-purple-500 focus:ring-purple-500 focus:ring-offset-0" />
                      <span>Remember me</span>
                    </label>
                    <a href="#" className="text-white/80 hover:text-white font-semibold transition-colors hover:underline">
                      Forgot password?
                    </a>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-xl" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Signing In...
                      </>
                    ) : (
                      <>
                        <Lock className="h-5 w-5 mr-2" />
                        Sign In
                      </>
                    )}
                  </Button>
                </form>
              )}

              <Separator className="bg-white/20" />

              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-white/70 text-base mb-4">Don't have an account?</p>
                </div>
                
                <Link to="/register" className="block">
                  <Button className="w-full h-14 text-lg font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-xl text-white">
                    <UserPlus className="h-5 w-5 mr-3" />
                    Create Your Free Account
                    <Sparkles className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
                
                <div className="text-center">
                  <p className="text-xs text-white/50 bg-white/5 rounded-lg p-2">
                    ✨ Join thousands discovering talent with AI • Free forever
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8 text-white/60">
            <p className="text-sm">🔒 Your data is secure and encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
