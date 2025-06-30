
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  MessageSquare, 
  Users, 
  Star, 
  TrendingUp, 
  Clock, 
  Filter,
  Plus,
  Bot,
  Sparkles,
  Crown,
  Trophy,
  Target,
  Zap,
  Mail,
  Phone,
  ExternalLink,
  Bookmark
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const recentSearches = [
    { query: "React developer with 5+ years", results: 24, time: "2 hours ago" },
    { query: "Jazz guitarist for collaboration", results: 18, time: "1 day ago" },
    { query: "UX designer portfolio review", results: 31, time: "3 days ago" }
  ];

  const savedCandidates = [
    {
      id: 1,
      name: "Alex Chen",
      title: "Senior React Developer",
      location: "San Francisco, CA",
      platform: "LinkedIn",
      rating: 4.9,
      skills: ["React", "TypeScript", "Node.js"],
      avatar: "AC"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      title: "Jazz Vocalist & Composer",
      location: "New York, NY",
      platform: "YouTube",
      rating: 4.8,
      skills: ["Jazz", "Vocals", "Composition"],
      avatar: "SJ"
    },
    {
      id: 3,
      name: "Marcus Rodriguez",
      title: "Full Stack Engineer",
      location: "Austin, TX",
      platform: "LinkedIn",
      rating: 4.9,
      skills: ["Python", "React", "AWS"],
      avatar: "MR"
    }
  ];

  const stats = [
    { label: "Total Searches", value: "127", icon: Search, color: "from-blue-500 to-cyan-500" },
    { label: "Candidates Found", value: "2,847", icon: Users, color: "from-purple-500 to-pink-500" },
    { label: "Successful Matches", value: "94", icon: Target, color: "from-green-500 to-emerald-500" },
    { label: "Success Rate", value: "94%", icon: Trophy, color: "from-orange-500 to-red-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.1),transparent)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.1),transparent)]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Bot className="absolute top-20 right-20 h-8 w-8 text-blue-400/20 animate-bounce" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute top-40 left-32 h-6 w-6 text-purple-400/30 animate-bounce" style={{ animationDelay: '2s' }} />
        <Crown className="absolute bottom-32 right-32 h-7 w-7 text-yellow-400/20 animate-bounce" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="h-8 w-8 text-white" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-xl font-bold text-white">TalentScout AI</span>
                </div>
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold">
                  <Crown className="h-3 w-3 mr-1" />
                  Pro User
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4">
                <Link to="/chat">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    New Search
                  </Button>
                </Link>
                
                <Avatar className="h-10 w-10 ring-2 ring-white/20">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
                    JD
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-white/70 text-lg">
              Ready to discover amazing talent today?
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/80">
                    {stat.label}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="flex items-center text-xs text-green-400 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% from last month
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Recent Searches */}
            <div className="lg:col-span-2">
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white font-bold text-xl">Recent Searches</CardTitle>
                      <CardDescription className="text-white/70">
                        Your latest AI-powered talent discoveries
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentSearches.map((search, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                          <Search className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{search.query}</p>
                          <p className="text-white/60 text-sm">{search.results} candidates found • {search.time}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    View All Searches
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 mb-6">
                <CardHeader>
                  <CardTitle className="text-white font-bold">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/chat">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                      <Bot className="h-4 w-4 mr-2" />
                      Start AI Search
                    </Button>
                  </Link>
                  
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Saved Candidates
                  </Button>
                  
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                    <Mail className="h-4 w-4 mr-2" />
                    Message Center
                  </Button>
                </CardContent>
              </Card>

              {/* Achievement Badge */}
              <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl border border-yellow-500/30">
                <CardHeader className="text-center">
                  <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-2 animate-bounce" />
                  <CardTitle className="text-white font-bold">Achievement Unlocked!</CardTitle>
                  <CardDescription className="text-yellow-200">
                    🎉 You've found 100+ candidates this month!
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* Saved Candidates */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white font-bold text-xl">Saved Candidates</CardTitle>
                  <CardDescription className="text-white/70">
                    Your bookmarked talent discoveries
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedCandidates.map((candidate) => (
                  <div key={candidate.id} className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        {candidate.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white">{candidate.name}</h3>
                        <p className="text-sm text-white/70">{candidate.title}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-white/80 text-sm font-medium">{candidate.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {candidate.skills.slice(0, 2).map((skill, index) => (
                        <Badge key={index} className="bg-white/10 text-white/80 hover:bg-white/20">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 2 && (
                        <Badge className="bg-white/10 text-white/80">
                          +{candidate.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-medium">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
