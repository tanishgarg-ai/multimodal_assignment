import { motion } from "framer-motion";
import { Bot } from "lucide-react";

const TypingIndicator = () => (
  <div className="flex gap-3">
    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
      <Bot size={16} className="text-primary-foreground" />
    </div>
    <div className="bg-muted border border-border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-muted-foreground"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  </div>
);

export default TypingIndicator;
