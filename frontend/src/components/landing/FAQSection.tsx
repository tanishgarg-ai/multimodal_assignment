import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What is Ingenium?", a: "Ingenium is the annual technical festival of Chitkara University, Jhansla, Punjab. It's a 3-day celebration featuring hackathons, coding competitions, robotics, workshops, and cultural events." },
  { q: "When and where is Ingenium 2026?", a: "Ingenium 2026 will be held from March 13–15, 2026 at Chitkara University campus, Jhansla, Punjab." },
  { q: "How do I register?", a: "Click the 'Register Now' button on this website. Registration is open for both individual events and team events. Early bird discounts are available!" },
  { q: "Is there an entry fee?", a: "Basic entry to the fest is free. Individual event registrations may have nominal fees. Check each event's page for details." },
  { q: "Can students from other colleges participate?", a: "Absolutely! Ingenium welcomes students from all colleges and universities across India." },
  { q: "Will accommodation be provided?", a: "Yes, limited accommodation is available for outstation participants on a first-come, first-served basis. Contact us for details." },
  { q: "What are the prize pools?", a: "Total prize pool exceeds ₹15 Lakhs across all events. Individual event prizes range from ₹50,000 to ₹2,00,000." },
];

const FAQSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl font-bold text-center text-glow mb-12"
        >
          FAQs
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl bg-card border-glow px-6 border-b-0"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-secondary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
