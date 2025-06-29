
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, MessageCircle, ExternalLink, Mail, Phone } from "lucide-react";
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

interface CandidateCardBubbleProps {
  candidate: Candidate;
}

const CandidateCardBubble = ({ candidate }: CandidateCardBubbleProps) => {
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
    setImageError(true);
  };

  return (
    <>
      <div className="flex items-start space-x-3">
        {/* AI Avatar */}
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src="" />
          <AvatarFallback className="bg-blue-600 text-white text-xs">AI</AvatarFallback>
        </Avatar>

        {/* Candidate Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 max-w-sm sm:max-w-md shadow-sm">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                {!imageError ? (
                  <img
                    src={candidate.avatar}
                    alt={candidate.name}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {candidate.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 text-sm truncate">{candidate.name}</h3>
                <p className="text-xs text-gray-600 truncate">{candidate.title}</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{candidate.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
              <div className={`px-2 py-1 rounded-full text-xs text-white font-medium ${platformColors[candidate.platform as keyof typeof platformColors]}`}>
                <span>{platformIcons[candidate.platform as keyof typeof platformIcons]} {candidate.platform}</span>
              </div>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-1.5 rounded-full transition-colors ${
                  isSaved ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"
                }`}
              >
                <Star className={`h-3 w-3 ${isSaved ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
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
          <div className="flex items-center justify-between mb-3 text-xs text-gray-600">
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

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              onClick={() => setIsContactModalOpen(true)}
              size="sm"
              className="flex-1 h-8 text-xs"
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              Contact
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs"
              asChild
            >
              <a
                href={candidate.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
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

export default CandidateCardBubble;
