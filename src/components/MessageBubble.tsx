
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "agent";
  content: string;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
  isLoading?: boolean;
}

const MessageBubble = ({ message, isLoading }: MessageBubbleProps) => {
  const isUser = message.type === "user";
  const isAgent = message.type === "agent";

  return (
    <div className={cn("flex items-start space-x-3", isUser && "flex-row-reverse space-x-reverse")}>
      {/* Avatar */}
      {isAgent && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src="" />
          <AvatarFallback className="bg-blue-600 text-white text-xs">AI</AvatarFallback>
        </Avatar>
      )}
      
      {isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src="" />
          <AvatarFallback className="bg-gray-600 text-white text-xs">You</AvatarFallback>
        </Avatar>
      )}

      {/* Message Content */}
      <div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl px-4 py-2 text-sm",
            isUser
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-200 text-gray-900"
          )}
        >
          {isLoading ? (
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          )}
        </div>
        
        <span className="text-xs text-gray-500 mt-1 px-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
