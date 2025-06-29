
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import MessageBubble from "@/components/MessageBubble";
import CandidateCardBubble from "@/components/CandidateCardBubble";

interface Message {
  id: string;
  type: "user" | "agent" | "candidate";
  content: string;
  timestamp: Date;
  candidate?: {
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
  };
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "agent",
      content: "Hi! I'm here to help you find the perfect candidates. What kind of talent are you looking for today?",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: "2",
      type: "user",
      content: "I'm looking for a senior React developer with experience in TypeScript and modern frameworks.",
      timestamp: new Date(Date.now() - 30000),
    },
    {
      id: "3",
      type: "agent",
      content: "Great! I found some excellent candidates that match your requirements. Here's one that stands out:",
      timestamp: new Date(Date.now() - 15000),
    },
    {
      id: "4",
      type: "candidate",
      content: "",
      timestamp: new Date(Date.now() - 10000),
      candidate: {
        id: "1",
        name: "Sarah Chen",
        title: "Senior React Developer",
        location: "San Francisco, CA",
        platform: "linkedin",
        profileUrl: "https://linkedin.com/in/sarah-chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        skills: ["React", "TypeScript", "Node.js", "GraphQL"],
        rating: 5,
        experience: "5+ years experience",
        type: "work",
        contact: {
          email: "sarah.chen@example.com",
          phone: "+1 (555) 123-4567",
        },
      },
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content: "I'm searching for more candidates based on your requirements. Let me find some additional options for you.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, agentMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Link 
              to="/search" 
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Search
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-900">TalentScout AI</h1>
            <p className="text-sm text-gray-500">Chat Assistant</p>
          </div>
          <div className="w-20"></div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <ScrollArea className="flex-1 px-4 py-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                {message.type === "candidate" && message.candidate ? (
                  <CandidateCardBubble candidate={message.candidate} />
                ) : (
                  <MessageBubble message={message} />
                )}
              </div>
            ))}
            
            {isLoading && (
              <MessageBubble
                message={{
                  id: "loading",
                  type: "agent",
                  content: "Typing...",
                  timestamp: new Date(),
                }}
                isLoading={true}
              />
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white px-4 py-4">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about candidates, skills, or requirements..."
                className="min-h-[44px] resize-none"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              size="icon"
              className="h-11 w-11 shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
