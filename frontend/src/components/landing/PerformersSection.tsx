import { motion } from "framer-motion";
import { Mic, Lightbulb, Laugh } from "lucide-react";

const performers = [
  { name: "Dr. Rajeev Kumar", role: "Speaker", icon: Lightbulb, desc: "AI & Machine Learning Pioneer" },
  { name: "Ananya Sharma", role: "Speaker", icon: Lightbulb, desc: "Startup Ecosystem Expert" },
  { name: "The Local Train", role: "Artist", icon: Mic, desc: "Indie Rock Band" },
  { name: "Zakir Khan", role: "Comedian", icon: Laugh, desc: "Stand-up Comedian" },
  { name: "Priya Mehta", role: "Speaker", icon: Lightbulb, desc: "Blockchain Innovator" },
  { name: "Vishal Dadlani", role: "Artist", icon: Mic, desc: "Bollywood Playback Singer" },
];

const PerformersSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl font-bold text-center text-glow"
        >
          Past Highlights
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center mt-4"
        >
          Speakers, artists, and performers from previous editions
        </motion.p>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-6 px-4 snap-x snap-mandatory scrollbar-hide">
        {performers.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="min-w-[280px] snap-center rounded-xl bg-card border-glow p-6 flex flex-col items-center text-center box-glow-hover transition-all duration-300"
          >
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-4">
              <p.icon size={32} className="text-primary-foreground" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-1">{p.name}</h3>
            <span className="text-xs text-secondary font-medium uppercase tracking-wider mb-2">{p.role}</span>
            <p className="text-muted-foreground text-sm">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PerformersSection;
