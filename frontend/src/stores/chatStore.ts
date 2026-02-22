import { create } from "zustand";
import type { Message, UploadedDocument } from "@/types/chat";

interface ChatState {
  sessionId: string;
  messages: Message[];
  isTyping: boolean;
  uploads: UploadedDocument[];
  sidebarOpen: boolean;

  addMessage: (msg: Message) => void;
  setTyping: (v: boolean) => void;
  addUpload: (doc: UploadedDocument) => void;
  updateUpload: (id: string, patch: Partial<UploadedDocument>) => void;
  removeUpload: (id: string) => void;
  toggleSidebar: () => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  sessionId: crypto.randomUUID(),
  messages: [
    {
      id: "welcome",
      role: "assistant",
      content:
        "👋 Hi! I'm the **Ingenium AI Assistant**. I can help you with:\n\n- 📅 Event schedules & details\n- 📍 Venue & directions\n- 🏆 Competition rules & prizes\n- 📝 Registration info\n\nAsk me anything about the fest!",
      timestamp: new Date(),
    },
  ],
  isTyping: false,
  uploads: [],
  sidebarOpen: false,

  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  setTyping: (isTyping) => set({ isTyping }),
  addUpload: (doc) => set((s) => ({ uploads: [...s.uploads, doc] })),
  updateUpload: (id, patch) =>
    set((s) => ({
      uploads: s.uploads.map((u) => (u.id === id ? { ...u, ...patch } : u)),
    })),
  removeUpload: (id) => set((s) => ({ uploads: s.uploads.filter((u) => u.id !== id) })),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  clearMessages: () =>
    set({
      sessionId: crypto.randomUUID(),
      messages: [
        {
          id: "welcome",
          role: "assistant",
          content: "👋 Chat cleared! Ask me anything about Ingenium 2026.",
          timestamp: new Date(),
        },
      ],
    }),
}));
