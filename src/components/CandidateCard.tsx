
import { MapPin, Star, MessageCircle, Mail, Phone, ExternalLink } from "lucide-react";
import { useState } from "react";
import ContactModal from "./ContactModal";

interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  platform: string;
  profileUrl: string;
  avatar: string;
  skills: string[];
  rating: number;
  experience: string;
  type: "work" | "music";
  contact: {
    email?: string;
    phone?: string;
    whatsapp?: string;
  };
}

const CandidateCard = ({ candidate }: { candidate: Candidate }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [imageError, setImageError] = useState(false);

  const platformColors = {
    linkedin: "bg-blue-600",
    youtube: "bg-red-600",
    tiktok: "bg-black",
  };

  const platformIcons = {
    linkedin: "💼",
    youtube: "📺",
    tiktok: "🎵",
  };

  const handleImageError = () => {
    console.log("Image failed to load for candidate:", candidate.name);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log("Image loaded successfully for candidate:", candidate.name);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 overflow-hidden">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                {!imageError ? (
                  <img
                    src={candidate.avatar}
                    alt={candidate.name}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {candidate.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{candidate.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600 truncate">{candidate.title}</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{candidate.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ml-2">
              <div className={`px-1.5 sm:px-2 py-1 rounded-full text-xs text-white font-medium ${platformColors[candidate.platform as keyof typeof platformColors]}`}>
                <span className="hidden sm:inline">{platformIcons[candidate.platform as keyof typeof platformIcons]} {candidate.platform}</span>
                <span className="sm:hidden">{platformIcons[candidate.platform as keyof typeof platformIcons]}</span>
              </div>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                  isSaved ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"
                }`}
              >
                <Star className={`h-3 w-3 sm:h-4 sm:w-4 ${isSaved ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-3 sm:mb-4">
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {candidate.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                >
                  {skill}
                </span>
              ))}
              {candidate.skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                  +{candidate.skills.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Experience & Rating */}
          <div className="flex items-center justify-between mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">
            <span className="truncate">{candidate.experience}</span>
            <div className="flex items-center space-x-1 flex-shrink-0">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < candidate.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-1">({candidate.rating}/5)</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium text-xs sm:text-sm flex items-center justify-center space-x-1 sm:space-x-2 min-h-[36px] sm:min-h-[40px]"
            >
              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Contact</span>
            </button>
            
            <a
              href={candidate.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-xs sm:text-sm flex items-center justify-center min-h-[36px] sm:min-h-[40px]"
            >
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
            </a>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        candidate={candidate}
      />
    </>
  );
};

export default CandidateCard;
