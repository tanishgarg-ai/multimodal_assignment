import { motion } from "framer-motion";

const sponsors = [
  "TechCorp", "InnovateLabs", "CloudNine", "DataSphere", "CyberEdge",
  "NeuralNet", "QuantumBit", "DevForge", "AIVentures", "CodeCraft",
];

const SponsorsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl font-bold text-center text-glow"
        >
          Our Partners
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center mt-4"
        >
          Previous workshop & sponsorship partners
        </motion.p>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex animate-marquee">
          {[...sponsors, ...sponsors].map((s, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-8 px-8 py-4 rounded-lg border-glow bg-card/50 flex items-center justify-center min-w-[180px]"
            >
              <span className="font-display text-sm font-semibold text-muted-foreground tracking-wider">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
