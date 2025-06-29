
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, MessageCircle, ExternalLink, Mail, Phone, Bot, Sparkles } from "lucide-react";
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
    linkedin: "bg-gradient-to-r from-blue-600 to-blue-700",
    youtube: "bg-gradient-to-r from-red-600 to-red-700",
    tiktok: "bg-gradient-to-r from-gray-800 to-black",
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
      <div className="flex items-start space-x-4 group">
        {/* AI Avatar */}
        <div className="relative">
          <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-indigo-100 shadow-md">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-bold">
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </div>

        {/* Candidate Card */}
        <div className="bg-white rounded-3xl border border-gray-200/50 p-6 max-w-sm sm:max-w-md shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 mr-4 relative overflow-hidden backdrop-blur-sm">
          {/* Gradient background overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-70"></div>
          
          {/* Sparkle decoration */}
          <div className="absolute top-4 right-4 text-indigo-400 opacity-60">
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-200 flex-shrink-0 shadow-lg ring-2 ring-white">
                    {!imageError ? (
                      <img
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                        {candidate.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-gray-900 text-base truncate">{candidate.name}</h3>
                  <p className="text-sm text-gray-600 truncate font-medium">{candidate.title}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{candidate.location}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                  isSaved ? "text-yellow-500 bg-yellow-50" : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50"
                }`}
              >
                <Star className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Platform Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className={`px-3 py-2 rounded-full text-sm text-white font-bold shadow-lg ${platformColors[candidate.platform as keyof typeof platformColors]}`}>
                <span>{platformIcons[candidate.platform as keyof typeof platformIcons]} {candidate.platform}</span>
              </div>
              
              {/* Experience & Rating */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="font-medium">{candidate.experience}</span>
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < candidate.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-gray-700">({candidate.rating}/5)</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {candidate.skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-sm rounded-full font-bold border border-indigo-200/50 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
                {candidate.skills.length > 3 && (
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full font-bold border border-gray-200 shadow-sm">
                    +{candidate.skills.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={() => setIsContactModalOpen(true)}
                size="sm"
                className="flex-1 h-10 text-sm font-bold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 rounded-2xl"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Now
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="h-10 px-4 border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 hover:scale-105 rounded-2xl font-bold"
                asChild
              >
                <a
                  href={candidate.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
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
