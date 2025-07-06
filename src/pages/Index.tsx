import { useState } from "react";
import Header from "../components/Header";
import SearchFilters from "../components/SearchFilters";
import CandidateCard from "../components/CandidateCard";
import { Users, TrendingUp, MessageCircle, Star, Sparkles, Target, Award } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ platforms: [], type: "all" });

  // Mock candidate data
  const mockCandidates = [
    {
      id: "1",
      name: "M.Ilham Digantara",
      title: "Frontend Developer", 
      location: "Denpasar-Bali",
      platform: "linkedin",
      profileUrl: "https://www.linkedin.com/in/m-ilham-dirgantara-5547bb257/",
      avatar: "https://i.postimg.cc/W39VMc8r/Student-wearing-black-suits-white-shirts-and-black-ties-without-eye-glasses-sitting-for-a-formal-p.jpg",
      skills: ["React", "TypeScript", "UI/UX Design", "Node.js", "GraphQL"],
      rating: 5,
      experience: "5+ years experience",
      type: "work" as const,
      contact: {
        email: "idirga37@email.com",
        whatsapp: "+6287805862897"
      }
    },
    {
      id: "2", 
      name: "Marcus Johnson",
      title: "Music Producer & Beatmaker",
      location: "Los Angeles, CA",
      platform: "youtube",
      profileUrl: "https://youtube.com/@marcusbeats",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      skills: ["Hip-Hop Production", "Logic Pro", "Mixing", "Sound Design", "Collaboration"],
      rating: 4,
      experience: "8+ years experience",
      type: "music" as const,
      contact: {
        email: "marcus.beats@email.com",
        whatsapp: "+1987654321"
      }
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      title: "Content Creator & Influencer",
      location: "Miami, FL", 
      platform: "tiktok",
      profileUrl: "https://tiktok.com/@emmacreates",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      skills: ["Content Creation", "Video Editing", "Brand Partnerships", "Social Media", "Dance"],
      rating: 5,
      experience: "3+ years experience",
      type: "music" as const,
      contact: {
        email: "emma.creates@email.com",
        whatsapp: "+1122334455"
      }
    },
    {
      id: "4",
      name: "David Kim",
      title: "Full Stack Engineer",
      location: "Seattle, WA",
      platform: "linkedin",
      profileUrl: "https://linkedin.com/in/davidkim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      skills: ["Python", "Django", "AWS", "Docker", "Machine Learning"],
      rating: 4,
      experience: "7+ years experience",
      type: "work" as const,
      contact: {
        email: "david.kim@email.com",
        whatsapp: "+1555666777"
      }
    },
    {
      id: "5",
      name: "Luna Martinez",
      title: "Singer-Songwriter",
      location: "Nashville, TN",
      platform: "youtube",
      profileUrl: "https://youtube.com/@lunamusic",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      skills: ["Vocals", "Guitar", "Songwriting", "Recording", "Live Performance"],
      rating: 5,
      experience: "6+ years experience",
      type: "music" as const,
      contact: {
        email: "luna.music@email.com",
        whatsapp: "+1888999000"
      }
    },
    {
      id: "6",
      name: "Alex Thompson",
      title: "Data Scientist",
      location: "Boston, MA",
      platform: "linkedin",
      profileUrl: "https://linkedin.com/in/alexthompson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      skills: ["Python", "R", "TensorFlow", "Statistics", "Data Visualization"],
      rating: 4,
      experience: "4+ years experience",
      type: "work" as const,
      contact: {
        email: "alex.data@email.com",
        whatsapp: "+1777888999"
      }
    }
  ];

  // Debug logging
  console.log("Total mock candidates:", mockCandidates.length);
  console.log("Mock candidates data:", mockCandidates);

  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = !searchQuery || 
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPlatform = filters.platforms.length === 0 || 
      filters.platforms.includes(candidate.platform);

    const matchesType = filters.type === "all" || candidate.type === filters.type;

    return matchesSearch && matchesPlatform && matchesType;
  });

  console.log("Filtered candidates:", filteredCandidates.length);
  console.log("Current search query:", searchQuery);
  console.log("Current filters:", filters);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const stats = [
    {
      icon: Users,
      label: "Active Candidates",
      value: mockCandidates.length.toString(),
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-50",
      change: "+12%"
    },
    {
      icon: TrendingUp,
      label: "Success Rate",
      value: "94%",
      color: "from-emerald-600 to-emerald-700",
      bgColor: "bg-emerald-50",
      change: "+5%"
    },
    {
      icon: Award,
      label: "Placements",
      value: "187",
      color: "from-purple-600 to-purple-700",
      bgColor: "bg-purple-50",
      change: "+23%"
    },
    {
      icon: Star,
      label: "Avg Rating",
      value: "4.8",
      color: "from-amber-600 to-amber-700",
      bgColor: "bg-amber-50",
      change: "+0.2"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            AI-Powered Talent Discovery
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-4">
            Find exceptional talent
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              faster than ever
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover and connect with top professionals across LinkedIn, YouTube, and TikTok. 
            Our AI helps you find the perfect candidates for any role or collaboration.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-all duration-200">
              <div className={`inline-flex p-3 rounded-xl ${stat.bgColor} mb-4`}>
                <stat.icon className={`h-6 w-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
              <div className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full inline-block">
                {stat.change} this month
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <SearchFilters 
            onSearch={handleSearch}
            onFiltersChange={handleFiltersChange}
          />
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Talent Pool
              </h2>
              <p className="text-gray-600">
                {filteredCandidates.length} candidates match your criteria
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 font-medium">Sort by:</span>
              <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                <option>Best Match</option>
                <option>Highest Rated</option>
                <option>Most Experience</option>
                <option>Recently Added</option>
              </select>
            </div>
          </div>

          {/* Candidates Grid */}
          {filteredCandidates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCandidates.map(candidate => {
                console.log("Rendering candidate:", candidate.name);
                return (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gray-50 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Target className="h-8 w-8 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No candidates found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters to find more matches.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setFilters({ platforms: [], type: "all" });
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
