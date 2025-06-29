import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

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

interface MessageBubbleProps {
  message: Message;
  isLoading?: boolean;
}

const MessageBubble = ({ message, isLoading }: MessageBubbleProps) => {
  const isUser = message.type === "user";
  const isAgent = message.type === "agent";

  return (
    <div className={cn(
      "flex items-start space-x-4 group",
      isUser && "flex-row-reverse space-x-reverse"
    )}>
      {/* Avatar */}
      {isAgent && (
        <div className="relative">
          <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-indigo-100 shadow-md">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-bold">
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </div>
      )}
      
      {isUser && (
        <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-gray-200 shadow-md">
          <AvatarImage src="" />
          <AvatarFallback className="bg-gradient-to-br from-gray-600 to-gray-800 text-white text-sm font-bold">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}

      {/* Message Content */}
      <div className={cn("flex flex-col max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-3xl px-5 py-3 text-sm leading-relaxed shadow-lg transition-all duration-200 hover:shadow-xl relative overflow-hidden",
            isUser
              ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white ml-4"
              : "bg-white border border-gray-200/50 text-gray-800 mr-4 backdrop-blur-sm"
          )}
        >
          {/* Subtle background pattern for agent messages */}
          {isAgent && (
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100"></div>
            </div>
          )}
          
          {/* Shine effect for user messages */}
          {isUser && (
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse"></div>
            </div>
          )}

          <div className="relative z-10">
            {isLoading ? (
              <div className="flex items-center space-x-2 py-1">
                <div className="flex space-x-1">
                  <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
                <span className="text-indigo-600 text-xs font-medium ml-2">AI is thinking...</span>
              </div>
            ) : (
              <p className="whitespace-pre-wrap break-words font-medium">{message.content}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center mt-2 px-2">
          <span className={cn(
            "text-xs font-medium transition-opacity duration-200",
            isUser ? "text-indigo-600" : "text-gray-500",
            "group-hover:opacity-100 opacity-70"
          )}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {isAgent && !isLoading && (
            <div className="ml-2 flex items-center space-x-1 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              <span className="text-xs text-green-600 font-medium">Online</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
