import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquarePlus, Trash2, Calendar, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/stores/chatStore";
import { Link } from "react-router-dom";

const ChatSidebar = () => {
  const { sidebarOpen, toggleSidebar, clearMessages } = useChatStore();

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={toggleSidebar}
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-[280px] bg-card border-r border-border z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-display text-sm font-semibold tracking-wider">INGENIUM AI</h2>
              <button onClick={toggleSidebar} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 p-4 space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-border text-muted-foreground hover:text-foreground"
                onClick={clearMessages}
              >
                <MessageSquarePlus size={16} />
                New Chat
              </Button>

              <Link to="/dashboard">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
                  onClick={toggleSidebar}
                >
                  <Calendar size={16} />
                  Dashboard
                </Button>
              </Link>

              <Link to="/upload">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
                  onClick={toggleSidebar}
                >
                  <Upload size={16} />
                  Upload Documents
                </Button>
              </Link>
            </div>

            <div className="p-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                onClick={clearMessages}
              >
                <Trash2 size={14} />
                Clear History
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatSidebar;
