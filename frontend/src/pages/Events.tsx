import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Bot, Code, Cpu, Palette, Zap, Gamepad2, Wrench, Brain, Camera, Music } from "lucide-react";

const categories = ["All", "Coding", "Robotics", "Hackathon", "Design", "Electronics", "Gaming", "Workshop"];

const allEvents = [
  { icon: Code, title: "CodeStorm", category: "Coding", desc: "24-hour competitive programming challenge with algorithmic puzzles.", prize: "₹1,00,000" },
  { icon: Bot, title: "RoboWars", category: "Robotics", desc: "Build & battle your bots in an electrifying arena showdown.", prize: "₹1,50,000" },
  { icon: Cpu, title: "HackIngenium", category: "Hackathon", desc: "36-hour hackathon to build solutions for real-world problems.", prize: "₹2,00,000" },
  { icon: Palette, title: "DesignX", category: "Design", desc: "UI/UX design sprint judged by industry professionals.", prize: "₹75,000" },
  { icon: Zap, title: "Circuit Rush", category: "Electronics", desc: "Design & prototype innovative electronic circuits.", prize: "₹80,000" },
  { icon: Gamepad2, title: "GameJam", category: "Gaming", desc: "Build a complete game in 48 hours from scratch.", prize: "₹90,000" },
  { icon: Brain, title: "AI Quest", category: "Coding", desc: "Machine learning challenge with real datasets.", prize: "₹1,20,000" },
  { icon: Wrench, title: "MechMania", category: "Workshop", desc: "Mechanical engineering workshop and competition.", prize: "₹60,000" },
  { icon: Camera, title: "LensCraft", category: "Design", desc: "Photography and videography competition.", prize: "₹50,000" },
  { icon: Music, title: "BeatDrop", category: "Gaming", desc: "Rhythm gaming tournament with live DJ.", prize: "₹40,000" },
  { icon: Code, title: "WebWizard", category: "Coding", desc: "Full-stack web development speed challenge.", prize: "₹85,000" },
  { icon: Bot, title: "DroneRace", category: "Robotics", desc: "FPV drone racing through obstacle courses.", prize: "₹1,00,000" },
];

const Events = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? allEvents : allEvents.filter((e) => e.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold text-center gradient-text mb-4"
          >
            All Events
          </motion.h1>
          <p className="text-muted-foreground text-center mb-12">Browse and filter all competitions & workshops</p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((c) => (
              <Button
                key={c}
                variant={filter === c ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(c)}
                className={filter === c ? "gradient-primary text-primary-foreground" : "border-secondary/30 text-muted-foreground hover:text-secondary"}
              >
                {c}
              </Button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-xl bg-card border-glow p-6 hover:bg-muted/50 box-glow-hover transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <e.icon size={24} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{e.title}</h3>
                    <span className="text-xs text-secondary uppercase tracking-wider">{e.category}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{e.desc}</p>
                <span className="text-sm font-semibold gradient-text">Prize: {e.prize}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Events;
