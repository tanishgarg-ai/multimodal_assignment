import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import type { Message } from "@/types/chat";
import { Bot, User } from "lucide-react";

interface Props {
  message: Message;
}

const MessageBubble = ({ message }: Props) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
          isUser ? "bg-primary/20" : "gradient-primary"
        }`}
      >
        {isUser ? (
          <User size={16} className="text-primary" />
        ) : (
          <Bot size={16} className="text-primary-foreground" />
        )}
      </div>

      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-muted border border-border rounded-tl-sm"
        }`}
      >
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none [&_p]:mb-2 [&_ul]:mb-2 [&_li]:mb-0.5">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
        <p className={`text-[10px] mt-1.5 ${isUser ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
