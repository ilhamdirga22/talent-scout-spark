
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, Zap, Star, ArrowRight, Search, Brain, Target, Sparkles, Bot, Rocket, Crown, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "AI-Powered Chat Search",
      description: "Simply describe who you're looking for in natural language. Our AI understands your needs and finds the perfect candidates.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Brain,
      title: "Smart Matching",
      description: "Advanced algorithms analyze skills, experience, and compatibility to deliver highly relevant candidate recommendations.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Filter across LinkedIn, YouTube, and TikTok to find professionals for work or musicians for collaboration.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get candidate recommendations in seconds, not hours. Start conversations immediately with built-in contact tools.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Director",
      company: "TechCorp",
      rating: 5,
      text: "This AI search has revolutionized our hiring process. We find better candidates 10x faster than traditional methods.",
      avatar: "SJ",
      color: "from-blue-500 to-purple-500"
    },
    {
      name: "Marcus Chen",
      role: "Music Producer",
      company: "Sound Studios",
      rating: 5,
      text: "Finding talented musicians for collaborations used to take weeks. Now I discover amazing artists in minutes through simple conversations.",
      avatar: "MC",
      color: "from-green-500 to-blue-500"
    },
    {
      name: "Emma Rodriguez",
      role: "Startup Founder",
      company: "Innovation Labs",
      rating: 5,
      text: "The AI understands exactly what I'm looking for. It's like having a personal talent scout available 24/7.",
      avatar: "ER",
      color: "from-pink-500 to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.15),transparent)]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Bot className="absolute top-20 left-20 h-12 w-12 text-blue-400/20 animate-bounce" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute top-40 right-32 h-8 w-8 text-purple-400/30 animate-bounce" style={{ animationDelay: '2s' }} />
        <Crown className="absolute bottom-32 left-32 h-10 w-10 text-yellow-400/20 animate-bounce" style={{ animationDelay: '3s' }} />
        <Trophy className="absolute bottom-20 right-20 h-14 w-14 text-orange-400/20 animate-bounce" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="h-10 w-10 text-white drop-shadow-lg" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold text-white drop-shadow-lg">TalentScout AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10 font-semibold">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <Rocket className="h-4 w-4 mr-2" />
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Find Amazing Talent with
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block mt-2">
                AI-Powered Chat ✨
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Stop scrolling through endless profiles. Just tell our AI who you're looking for, and discover perfect candidates across LinkedIn, YouTube, and TikTok in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link to="/register">
                <Button size="lg" className="text-xl px-10 py-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-bold shadow-2xl hover:shadow-3xl hover:scale-110 transform transition-all duration-300 rounded-2xl">
                  <Rocket className="mr-3 h-6 w-6" />
                  Start Searching Now
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-xl px-10 py-8 border-2 border-white/30 text-white hover:bg-white/10 font-bold rounded-2xl hover:scale-105 transition-all duration-300">
                <MessageSquare className="mr-3 h-6 w-6" />
                Watch Demo
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">10,000+</div>
                <div className="text-white/70">Candidates Found</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                <div className="text-white/70">Match Accuracy</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">60s</div>
                <div className="text-white/70">Average Search Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose AI-Powered Search? 🚀
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Traditional talent search is broken. We're fixing it with conversational AI that understands exactly what you need.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 rounded-2xl overflow-hidden group">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} p-4 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-xl">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                How It Works ⚡
              </h2>
              <p className="text-xl text-white/80">
                Three simple steps to find your perfect candidate
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">💬 Describe Your Needs</h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  Simply chat with our AI: "I need a React developer with 3+ years experience" or "Looking for a jazz guitarist for collaboration"
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">🤖 AI Finds Matches</h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  Our AI searches across LinkedIn, YouTube, and TikTok to find candidates that match your exact requirements
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">⚡ Connect Instantly</h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  Review profiles, save favorites, and reach out directly via email or WhatsApp. Start conversations immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Loved by Thousands 💖
            </h2>
            <p className="text-xl text-white/80">
              See what our users are saying about their experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 rounded-2xl overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white font-bold text-lg`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-white">{testimonial.name}</div>
                      <div className="text-sm text-white/70">{testimonial.role} at {testimonial.company}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <CardDescription className="text-white/80 italic text-base leading-relaxed">
                    "{testimonial.text}"
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Talent Search? 🚀
              </h2>
              <p className="text-xl text-white/80 mb-12 leading-relaxed">
                Join thousands of recruiters, founders, and creators who've already discovered the power of AI-driven candidate search.
              </p>
              <Link to="/register">
                <Button size="lg" className="text-2xl px-12 py-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-bold shadow-2xl hover:shadow-3xl hover:scale-110 transform transition-all duration-300 rounded-2xl">
                  <Rocket className="mr-3 h-6 w-6" />
                  Start Your Free Search
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <div className="mt-8 text-white/70 text-lg">
                ✨ No setup required • 🚀 Find candidates in under 60 seconds • 💯 Free to try
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/30 backdrop-blur-xl text-white py-12 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="relative">
                  <Search className="h-8 w-8 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                </div>
                <span className="text-2xl font-bold">TalentScout AI</span>
              </div>
              <div className="flex space-x-8 text-white/70">
                <a href="#" className="hover:text-white transition-colors font-medium">Privacy</a>
                <a href="#" className="hover:text-white transition-colors font-medium">Terms</a>
                <a href="#" className="hover:text-white transition-colors font-medium">Support</a>
              </div>
            </div>
            <div className="border-t border-white/20 pt-8 text-center text-white/60">
              <p>&copy; 2024 TalentScout AI. All rights reserved. Made with ❤️ for the future of talent discovery.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
