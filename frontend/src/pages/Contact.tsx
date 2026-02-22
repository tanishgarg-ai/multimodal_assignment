import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Phone } from "lucide-react";

const Contact = () => {
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
            Contact Us
          </motion.h1>
          <p className="text-muted-foreground text-center mb-16">Have questions? We'd love to hear from you.</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-xl bg-card border-glow p-8"
            >
              <h2 className="font-display text-xl font-semibold mb-6">Send a Message</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Name</label>
                  <Input placeholder="Your name" className="bg-muted border-border" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                  <Input type="email" placeholder="your@email.com" className="bg-muted border-border" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Message</label>
                  <Textarea placeholder="Your message..." rows={5} className="bg-muted border-border" />
                </div>
                <Button className="w-full gradient-primary text-primary-foreground font-semibold">
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Info + Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                {[
                  { icon: MapPin, title: "Address", text: "Chitkara University, Jhansla, Punjab, India" },
                  { icon: Mail, title: "Email", text: "ingenium@chitkara.edu.in" },
                  { icon: Phone, title: "Phone", text: "+91 98765 43210" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map embed */}
              <div className="rounded-xl overflow-hidden border-glow h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.0!2d76.66!3d30.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f93a!2sChitkara+University!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Chitkara University Map"
                />
              </div>

              {/* Social */}
              <div>
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider mb-3 text-secondary">Follow Us</h3>
                <div className="flex gap-4">
                  {["Instagram", "Twitter", "LinkedIn", "Facebook"].map((s) => (
                    <a key={s} href="#" className="text-muted-foreground text-sm hover:text-secondary transition-colors">
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
