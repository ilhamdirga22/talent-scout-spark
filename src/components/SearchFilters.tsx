
import { Search, Filter } from "lucide-react";
import { useState } from "react";

const SearchFilters = ({ onSearch, onFiltersChange }: { 
  onSearch: (query: string) => void;
  onFiltersChange: (filters: any) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("all");

  const platforms = [
    { id: "linkedin", name: "LinkedIn", icon: "💼", color: "bg-blue-600" },
    { id: "youtube", name: "YouTube", icon: "📺", color: "bg-red-600" },
    { id: "tiktok", name: "TikTok", icon: "🎵", color: "bg-black" },
  ];

  const candidateTypes = [
    { id: "all", name: "All Candidates" },
    { id: "work", name: "Work Professionals" },
    { id: "music", name: "Musicians & Creators" },
  ];

  const handlePlatformToggle = (platformId: string) => {
    const updated = selectedPlatforms.includes(platformId)
      ? selectedPlatforms.filter(p => p !== platformId)
      : [...selectedPlatforms, platformId];
    setSelectedPlatforms(updated);
    onFiltersChange({ platforms: updated, type: selectedType });
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    onFiltersChange({ platforms: selectedPlatforms, type });
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for skills, names, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Platform Filters */}
        <div className="flex items-center space-x-3">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Platforms:</span>
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => handlePlatformToggle(platform.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                selectedPlatforms.includes(platform.id)
                  ? `${platform.color} text-white`
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {platform.icon} {platform.name}
            </button>
          ))}
        </div>

        {/* Candidate Type Filter */}
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-700">Type:</span>
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {candidateTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
