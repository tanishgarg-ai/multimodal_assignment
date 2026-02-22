import { useRef, useEffect } from "react";
import { useChatStore } from "@/stores/chatStore";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import InputBar from "./InputBar";
import ChatSidebar from "./ChatSidebar";
import { Menu, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { Message } from "@/types/chat";

const ChatWindow = () => {
  const { messages, isTyping, sessionId, addMessage, setTyping, toggleSidebar } = useChatStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text: string, files?: File[]) => {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    addMessage(userMsg);
    setTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const responses: Record<string, string> = {
        schedule: "📅 **Ingenium 2026 Schedule:**\n\n**Day 1 (March 13):**\n- 9:00 AM — Opening Ceremony\n- 11:00 AM — CodeStorm begins\n- 2:00 PM — RoboWars qualifiers\n\n**Day 2 (March 14):**\n- 10:00 AM — HackIngenium kickoff\n- 3:00 PM — DesignX Sprint\n\n**Day 3 (March 15):**\n- 10:00 AM — Finals\n- 5:00 PM — Prize Distribution\n- 7:00 PM — Closing Ceremony",
        event: "🏆 We have **12+ events** across categories:\n\n- **Coding:** CodeStorm, AI Quest, WebWizard\n- **Robotics:** RoboWars, DroneRace\n- **Hackathon:** HackIngenium (36hrs)\n- **Design:** DesignX, LensCraft\n- **Gaming:** GameJam, BeatDrop\n\nTotal prize pool: **₹10,00,000+**",
        register: "📝 **Registration is open!**\n\nVisit the registration page or click 'Register Now' on the homepage.\n\n- Individual events: ₹200-500\n- Team events: ₹500-1000\n- Early bird discount: **20% off** until Feb 28!\n\nNeed help picking events? Just ask!",
        venue: "📍 **Venue:** Chitkara University\n**Address:** Jhansla, Punjab, India\n\n🚗 **How to reach:**\n- Nearest airport: Chandigarh (45 min)\n- Nearest station: Rajpura (15 min)\n- Shuttle service available from both locations\n\n🏨 Accommodation available on campus for outstation participants.",
      };

      const lower = text.toLowerCase();
      let reply = "I can help with **event details, schedules, registration, venue info**, and more! What would you like to know about Ingenium 2026? 🚀";

      if (lower.includes("schedule") || lower.includes("time") || lower.includes("when")) reply = responses.schedule;
      else if (lower.includes("event") || lower.includes("compet") || lower.includes("hack")) reply = responses.event;
      else if (lower.includes("register") || lower.includes("sign up") || lower.includes("fee")) reply = responses.register;
      else if (lower.includes("venue") || lower.includes("location") || lower.includes("reach") || lower.includes("address")) reply = responses.venue;

      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: reply,
        timestamp: new Date(),
      };
      addMessage(aiMsg);
      setTyping(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/80 backdrop-blur-xl">
          <button onClick={toggleSidebar} className="text-muted-foreground hover:text-foreground">
            <Menu size={20} />
          </button>
          <div className="flex-1">
            <h1 className="font-display text-sm font-semibold tracking-wider">INGENIUM AI</h1>
            <p className="text-xs text-muted-foreground">Your fest assistant</p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-secondary transition-colors"
          >
            <ArrowLeft size={14} />
            Back to site
          </Link>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <InputBar onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
};

export default ChatWindow;
