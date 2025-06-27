
import { Search, Filter, X } from "lucide-react";
import { useState } from "react";

const SearchFilters = ({ onSearch, onFiltersChange }: { 
  onSearch: (query: string) => void;
  onFiltersChange: (filters: any) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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

  const clearFilters = () => {
    setSelectedPlatforms([]);
    setSelectedType("all");
    onFiltersChange({ platforms: [], type: "all" });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-6 mb-4 sm:mb-6">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for skills, names, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="flex items-center justify-between lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>
        
        {(selectedPlatforms.length > 0 || selectedType !== "all") && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800"
          >
            <X className="h-4 w-4" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Platform Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Platforms:</span>
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => handlePlatformToggle(platform.id)}
              className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all ${
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
        <div className="flex items-center gap-2">
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
      </div>

      {/* Mobile Filters */}
      {showMobileFilters && (
        <div className="lg:hidden space-y-4 border-t pt-4">
          {/* Platform Filters */}
          <div>
            <span className="text-sm font-medium text-gray-700 block mb-2">Platforms:</span>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => handlePlatformToggle(platform.id)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedPlatforms.includes(platform.id)
                      ? `${platform.color} text-white`
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {platform.icon} {platform.name}
                </button>
              ))}
            </div>
          </div>

          {/* Candidate Type Filter */}
          <div>
            <span className="text-sm font-medium text-gray-700 block mb-2">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {candidateTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full lg:w-auto mt-4 lg:mt-0 lg:ml-4 px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium text-sm sm:text-base"
      >
        Search
      </button>
    </div>
  );
};

export default SearchFilters;
