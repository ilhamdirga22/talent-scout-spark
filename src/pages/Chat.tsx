
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, ArrowLeft, Sparkles, Bot } from "lucide-react";
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
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, isLoading]);

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-4 py-3 relative z-10 shadow-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Link 
            to="/search" 
            className="flex items-center text-gray-600 hover:text-indigo-600 transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-medium">Back to Search</span>
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                TalentScout AI
              </h1>
              <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse" />
            </div>
            <p className="text-sm text-gray-500 font-medium">Your AI Talent Assistant</p>
          </div>
          
          <div className="w-32"></div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full relative z-10">
        <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 py-8">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div 
                key={message.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {message.type === "candidate" && message.candidate ? (
                  <CandidateCardBubble candidate={message.candidate} />
                ) : (
                  <MessageBubble message={message} />
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="animate-fade-in">
                <MessageBubble
                  message={{
                    id: "loading",
                    type: "agent",
                    content: "Typing...",
                    timestamp: new Date(),
                  }}
                  isLoading={true}
                />
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="bg-white/80 backdrop-blur-lg border-t border-gray-200/50 px-4 py-6 shadow-lg">
          <div className="flex items-end space-x-4">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about candidates, skills, or requirements..."
                className="min-h-[52px] text-base rounded-2xl border-2 border-gray-200/50 bg-white/70 backdrop-blur-sm focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 placeholder:text-gray-400 shadow-sm"
                disabled={isLoading}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              size="icon"
              className="h-[52px] w-[52px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center font-medium">
            Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd> to send • <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Shift + Enter</kbd> for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
