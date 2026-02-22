import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Users, Calendar, Trophy, Lightbulb } from "lucide-react";

const stats = [
  { icon: Users, value: 5000, suffix: "+", label: "Participants" },
  { icon: Calendar, value: 50, suffix: "+", label: "Events" },
  { icon: Trophy, value: 15, suffix: "L+", label: "Prize Pool" },
  { icon: Lightbulb, value: 3, suffix: " Days", label: "Of Innovation" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-display text-3xl md:text-4xl font-bold gradient-text">
      {count}{suffix}
    </div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-glow">
            About Ingenium
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Ingenium is the flagship technical festival of Chitkara University, Jhansla, Punjab — 
            a 3-day celebration of technology, innovation, and creativity. From hackathons and robotics 
            to coding battles and design sprints, Ingenium brings together the brightest minds across India.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-xl bg-card border-glow box-glow-hover transition-all duration-300"
            >
              <stat.icon className="mx-auto mb-3 text-secondary" size={32} />
              <Counter target={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
