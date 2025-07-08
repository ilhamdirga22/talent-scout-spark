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
import { Link, useLocation } from "react-router-dom";
import MessageBubble from "@/components/MessageBubble";
import CandidateCardBubble from "@/components/CandidateCardBubble";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import api from "@/lib/axios";
import {
  addMessage,
  addMessages,
  setLoading,
  setError,
  clearChat,
} from "@/store/chatSlice";
import CandidateCardsBubble from "@/components/CandidateCardsBubble";
import type { Message, Candidate } from "@/store/chatSlice";

const Chat = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { messages, isLoading, error } = useSelector(
    (state: RootState) => state.chat
  );
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const user =
    useSelector((state: RootState) => state.auth.user) ||
    JSON.parse(localStorage.getItem("user") || "null");
  const token =
    useSelector((state: RootState) => state.auth.token) ||
    localStorage.getItem("token");

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const threadId = params.get("threadId");
    if (threadId) {
      dispatch(clearChat());
      dispatch(setLoading(true));
      api
        .get(`/api/candidates/msg-history`, {
          params: { threadId },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (Array.isArray(res.data.messages)) {
            // Map API messages to chat state
            const formatUserQuery = (content: string) => {
              // Try to extract job title, platform, location from the prompt
              const jobTitleMatch = content.match(/Job Title: ([^\n]+)/i);
              const platformMatch = content.match(/Platform: ([^\n]+)/i);
              const locationMatch = content.match(/Location: ([^\n]+)/i);
              if (jobTitleMatch && platformMatch && locationMatch) {
                return `Find ${jobTitleMatch[1]} candidates on ${platformMatch[1]} in ${locationMatch[1]}`;
              }
              return content;
            };
            const mappedMessages = res.data.messages.map((msg: any) => {
              if (msg.role === "user") {
                return {
                  id: msg.id,
                  type: "user",
                  content: formatUserQuery(msg.content),
                  timestamp: msg.createdAt,
                };
              } else if (msg.role === "assistant") {
                // Try to parse content as JSON array of candidates
                let candidates = undefined;
                try {
                  const parsed = JSON.parse(msg.content);
                  if (
                    Array.isArray(parsed) &&
                    parsed[0]?.name &&
                    parsed[0]?.profileUrl
                  ) {
                    candidates = parsed;
                  }
                } catch {}
                if (candidates) {
                  return {
                    id: msg.id,
                    type: "candidate",
                    content: `I found ${candidates.length} candidates that match your search. Here they are:`,
                    timestamp: msg.createdAt,
                    candidates,
                  };
                } else {
                  return {
                    id: msg.id,
                    type: "agent",
                    content: msg.content,
                    timestamp: msg.createdAt,
                  };
                }
              }
              // fallback
              return {
                id: msg.id,
                type: "agent",
                content: msg.content,
                timestamp: msg.createdAt,
              };
            });
            dispatch(addMessages(mappedMessages));
          }
        })
        .catch(() => {
          dispatch(setError("Failed to load message history."));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
    // eslint-disable-next-line
  }, [location.search, token]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date().toISOString(),
    };

    dispatch(addMessage(userMessage));
    setInputValue("");
    dispatch(setLoading(true));

    try {
      // Call the candidates API
      const response = await api.post(
        "/api/candidates",
        {
          query: inputValue.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success && response.data.result.candidates) {
        // Add agent message
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "agent",
          content: `I found ${response.data.result.candidates.length} candidates that match your search. Here they are:`,
          timestamp: new Date().toISOString(),
        };

        // Add candidate message
        const candidateMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: "candidate",
          content: "",
          timestamp: new Date().toISOString(),
          candidates: response.data.result.candidates,
        };

        dispatch(addMessages([agentMessage, candidateMessage]));
      } else {
        // Handle no results
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "agent",
          content:
            "I couldn't find any candidates matching your criteria. Try adjusting your search terms or being more specific. Please re-enter your query and include job title, platform, and location.",
          timestamp: new Date().toISOString(),
        };
        dispatch(addMessage(agentMessage));
      }
    } catch (error) {
      console.error("Error calling candidates API:", error);
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content:
          "Sorry, I encountered an error while searching for candidates. Please try again.",
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage(agentMessage));
    } finally {
      dispatch(setLoading(false));
    }
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
            to="/dashboard"
            className="flex items-center text-gray-600 hover:text-indigo-600 transition-all duration-200 hover:scale-105 group"
          >
            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-indigo-50 transition-colors duration-200">
              <ArrowLeft className="h-4 w-4" />
            </div>
            <span className="ml-3 font-medium">Back to Dashboard</span>
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
                {message.type === "candidate" && message.candidates ? (
                  <>
                    <MessageBubble message={message} />
                    <CandidateCardsBubble candidates={message.candidates} />
                  </>
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
                    timestamp: new Date().toISOString(),
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
