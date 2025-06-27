
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

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                <p className="text-sm text-gray-600">{candidate.title}</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  {candidate.location}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`px-2 py-1 rounded-full text-xs text-white font-medium ${platformColors[candidate.platform as keyof typeof platformColors]}`}>
                {platformIcons[candidate.platform as keyof typeof platformIcons]} {candidate.platform}
              </div>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2 rounded-full transition-colors ${
                  isSaved ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"
                }`}
              >
                <Star className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
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
                  +{candidate.skills.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Experience & Rating */}
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <span>{candidate.experience}</span>
            <div className="flex items-center space-x-1">
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
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium text-sm flex items-center justify-center space-x-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Contact</span>
            </button>
            
            <a
              href={candidate.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm flex items-center justify-center"
            >
              <ExternalLink className="h-4 w-4" />
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
