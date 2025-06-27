
import { useState } from "react";
import Header from "../components/Header";
import SearchFilters from "../components/SearchFilters";
import CandidateCard from "../components/CandidateCard";
import { Users, TrendingUp, MessageCircle, Star } from "lucide-react";

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
      profileUrl: "https://www.linkedin.com/in/m-ilham-dirgantara-5547bb257/,
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const stats = [
    {
      icon: Users,
      label: "Total Candidates",
      value: mockCandidates.length.toString(),
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      label: "Success Rate",
      value: "87%",
      color: "text-green-600"
    },
    {
      icon: MessageCircle,
      label: "Messages Sent",
      value: "234",
      color: "text-purple-600"
    },
    {
      icon: Star,
      label: "Avg Rating",
      value: "4.6",
      color: "text-yellow-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing Talent
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect candidates for your opportunities across LinkedIn, YouTube, and TikTok. 
            Connect with professionals for work or musicians for collaboration.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <SearchFilters 
          onSearch={handleSearch}
          onFiltersChange={handleFiltersChange}
        />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Candidates ({filteredCandidates.length})
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Relevance</option>
              <option>Rating</option>
              <option>Experience</option>
              <option>Recently Added</option>
            </select>
          </div>
        </div>

        {/* Candidates Grid */}
        {filteredCandidates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map(candidate => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
