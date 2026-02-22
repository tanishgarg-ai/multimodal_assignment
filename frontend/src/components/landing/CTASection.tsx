import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center justify-between gap-12 rounded-2xl bg-card border-glow p-8 md:p-12 box-glow"
        >
          <div className="text-center lg:text-left">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Book Your Slots Now
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg">
              Don't miss out on the biggest tech fest in Punjab. Limited spots available for workshops and competitions.
            </p>
            <Button size="lg" className="gradient-primary text-primary-foreground font-bold text-base px-8 py-6 mt-6 box-glow">
              Register Now
            </Button>
          </div>

          <div className="flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full gradient-primary flex items-center justify-center"
            >
              <Rocket size={64} className="text-primary-foreground" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
