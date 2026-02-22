import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Bot } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-blue/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-pink/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-sm md:text-base tracking-[0.3em] uppercase mb-4"
        >
          Chitkara University presents
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="mb-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-secondary text-xs md:text-sm font-medium tracking-widest">
            MARCH 13 – 15, 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 80 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-black tracking-wider mb-6 gradient-text"
        >
          INGENIUM
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          Where Innovation Meets Engineering
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" className="gradient-primary text-primary-foreground font-bold text-base px-8 py-6 box-glow">
            Register Now
          </Button>
          <Link to="/chat">
            <Button size="lg" variant="outline" className="border-secondary/40 text-secondary hover:bg-secondary/10 font-bold text-base px-8 py-6 gap-2">
              <Bot size={18} /> Ask Fest AI
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="text-muted-foreground" size={28} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
