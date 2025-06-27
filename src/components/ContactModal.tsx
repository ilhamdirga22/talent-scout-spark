
import { X, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";

interface Candidate {
  id: string;
  name: string;
  title: string;
  contact: {
    email?: string;
    phone?: string;
    whatsapp?: string;
  };
}

const ContactModal = ({ 
  isOpen, 
  onClose, 
  candidate 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  candidate: Candidate;
}) => {
  const [contactMethod, setContactMethod] = useState<"email" | "whatsapp">("email");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (contactMethod === "whatsapp" && candidate.contact.whatsapp) {
      const whatsappUrl = `https://wa.me/${candidate.contact.whatsapp}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else if (contactMethod === "email" && candidate.contact.email) {
      const emailUrl = `mailto:${candidate.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      window.open(emailUrl, '_blank');
    }
    
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Contact {candidate.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Contact Method Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Contact Method
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => setContactMethod("email")}
                className={`flex-1 p-3 rounded-lg border transition-all ${
                  contactMethod === "email"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
                disabled={!candidate.contact.email}
              >
                <Mail className="h-5 w-5 mx-auto mb-1" />
                <div className="text-sm font-medium">Email</div>
                {candidate.contact.email && (
                  <div className="text-xs text-gray-500">{candidate.contact.email}</div>
                )}
              </button>
              
              <button
                onClick={() => setContactMethod("whatsapp")}
                className={`flex-1 p-3 rounded-lg border transition-all ${
                  contactMethod === "whatsapp"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
                disabled={!candidate.contact.whatsapp}
              >
                <MessageCircle className="h-5 w-5 mx-auto mb-1" />
                <div className="text-sm font-medium">WhatsApp</div>
                {candidate.contact.whatsapp && (
                  <div className="text-xs text-gray-500">{candidate.contact.whatsapp}</div>
                )}
              </button>
            </div>
          </div>

          {/* Subject (Email only) */}
          {contactMethod === "email" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Job Opportunity - Frontend Developer"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Hi ${candidate.name}, I found your profile and I'm interested in discussing a potential opportunity...`}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Quick Templates */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick Templates
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setMessage(`Hi ${candidate.name}, I came across your profile and I'm impressed by your ${candidate.title} experience. We have an exciting opportunity that might interest you. Would you be open to a brief conversation?`)}
                className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full hover:bg-blue-100 transition-colors"
              >
                Job Opportunity
              </button>
              <button
                onClick={() => setMessage(`Hi ${candidate.name}, I'm working on a music collaboration project and your skills would be perfect for what we're creating. Would you be interested in discussing this further?`)}
                className="px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full hover:bg-purple-100 transition-colors"
              >
                Music Collaboration
              </button>
              <button
                onClick={() => setMessage(`Hi ${candidate.name}, I'd love to connect and learn more about your experience in ${candidate.title}. Are you open to networking?`)}
                className="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full hover:bg-green-100 transition-colors"
              >
                Networking
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !message.trim()}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
