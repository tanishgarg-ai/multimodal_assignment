import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, Code, Cpu, Palette, Zap, Gamepad2 } from "lucide-react";

const events = [
  { icon: Code, title: "CodeStorm", category: "Coding", desc: "24-hour competitive programming challenge", prize: "₹1,00,000" },
  { icon: Bot, title: "RoboWars", category: "Robotics", desc: "Build & battle your bots in the arena", prize: "₹1,50,000" },
  { icon: Cpu, title: "HackIngenium", category: "Hackathon", desc: "36-hour hackathon to solve real-world problems", prize: "₹2,00,000" },
  { icon: Palette, title: "DesignX", category: "Design", desc: "UI/UX design sprint with industry mentors", prize: "₹75,000" },
  { icon: Zap, title: "Circuit Rush", category: "Electronics", desc: "Design & prototype electronic circuits", prize: "₹80,000" },
  { icon: Gamepad2, title: "GameJam", category: "Gaming", desc: "Build a game in 48 hours from scratch", prize: "₹90,000" },
];

const EventsSection = () => {
  return (
    <section id="events" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-glow mb-4">Featured Events</h2>
          <p className="text-muted-foreground text-lg">Compete. Create. Conquer.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-xl bg-card border-glow p-6 hover:bg-muted/50 box-glow-hover transition-all duration-300 cursor-pointer"
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
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold gradient-text">Prize: {e.prize}</span>
                <span className="text-xs text-muted-foreground group-hover:text-secondary transition-colors">Learn more →</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/events">
            <Button variant="outline" size="lg" className="border-secondary/40 text-secondary hover:bg-secondary/10 font-semibold px-8">
              Explore All Events
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
