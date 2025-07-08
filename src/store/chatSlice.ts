import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Candidate {
  name: string;
  profileUrl: string;
  platform: string;
  summary: string;
}

interface Message {
  id: string;
  type: "user" | "agent" | "candidate";
  content: string;
  timestamp: Date;
  candidates?: Candidate[];
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [
    {
      id: "1",
      type: "agent",
      content:
        "Hello! I'm your AI-powered talent scout assistant. I can help you find the perfect candidates for any role. What position are you looking to fill today?",
      timestamp: new Date(Date.now() - 60000),
    },
  ],
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    addMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages.push(...action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearChat: (state) => {
      state.messages = [
        {
          id: "1",
          type: "agent",
          content:
            "Hello! I'm your AI-powered talent scout assistant. I can help you find the perfect candidates for any role. What position are you looking to fill today?",
          timestamp: new Date(),
        },
      ];
      state.error = null;
    },
  },
});

export const { addMessage, addMessages, setLoading, setError, clearChat } =
  chatSlice.actions;
export default chatSlice.reducer;
