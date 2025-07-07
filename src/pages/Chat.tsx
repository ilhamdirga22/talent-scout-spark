import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  ArrowLeft,
  Sparkles,
  Bot,
  Zap,
  MessageSquare,
} from "lucide-react";
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
      content:
        "Hello! I'm your AI-powered talent scout assistant. I can help you find the perfect candidates for any role. What position are you looking to fill today?",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: "2",
      type: "user",
      content:
        "I'm looking for a senior React developer with experience in TypeScript and modern frameworks.",
      timestamp: new Date(Date.now() - 30000),
    },
    {
      id: "3",
      type: "agent",
      content:
        "Excellent! I've analyzed thousands of profiles and found some outstanding candidates that match your requirements. Here's a top match:",
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
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
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
      const scrollElement = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
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

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content:
          "I'm analyzing our talent database to find more candidates that match your specific requirements. Let me present some additional options.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMessage]);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-6 py-4 relative z-10 shadow-sm">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <Link
            to="/search"
            className="flex items-center text-gray-600 hover:text-indigo-600 transition-all duration-200 hover:scale-105 group"
          >
            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-indigo-50 transition-colors duration-200">
              <ArrowLeft className="h-4 w-4" />
            </div>
            <span className="ml-3 font-medium">Back to Search</span>
          </Link>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-1">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                  Celent AI Assistant
                </h1>
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-emerald-600 font-medium">
                    Online & Ready
                  </span>
                </div>
              </div>
              <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse" />
            </div>
          </div>

          <div className="w-32 flex justify-end">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-3 py-1 rounded-full">
              <span className="text-xs font-semibold text-indigo-700">
                Pro Plan
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full relative z-10">
        <ScrollArea ref={scrollAreaRef} className="flex-1 px-6 py-8">
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
                    content: "Analyzing talent database...",
                    timestamp: new Date(),
                  }}
                  isLoading={true}
                />
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="bg-white/80 backdrop-blur-lg border-t border-gray-200/50 px-6 py-6 shadow-lg">
          <div className="flex items-end space-x-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center space-x-2 text-gray-400">
                <MessageSquare className="h-4 w-4" />
                <div className="w-px h-4 bg-gray-300"></div>
              </div>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe the role, skills, or candidate type you're looking for..."
                className="min-h-[56px] text-base rounded-2xl border-2 border-gray-200/70 bg-white/90 backdrop-blur-sm focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 placeholder:text-gray-400 shadow-sm pl-12 pr-16"
                disabled={isLoading}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                <Zap className="h-4 w-4 text-indigo-500" />
                <div className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                  AI
                </div>
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              size="icon"
              className="h-[56px] w-[56px] rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-4 max-w-4xl mx-auto">
            <p className="text-xs text-gray-500 font-medium">
              Press{" "}
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs border">
                Enter
              </kbd>{" "}
              to send •
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs border ml-1">
                Shift + Enter
              </kbd>{" "}
              for new line
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span>AI is ready to help</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
