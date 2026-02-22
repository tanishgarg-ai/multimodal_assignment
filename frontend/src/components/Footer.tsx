import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-xl font-bold text-glow mb-4">INGENIUM</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The flagship technical festival of Chitkara University. Three days of innovation, competition, and celebration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-4 text-secondary">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "About", href: "/#about" },
                { label: "Events", href: "/events" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-muted-foreground text-sm hover:text-secondary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-4 text-secondary">Contact</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>Chitkara University</li>
              <li>Jhansla, Punjab, India</li>
              <li>ingenium@chitkara.edu.in</li>
              <li>+91 98765 43210</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-4 text-secondary">Follow Us</h4>
            <div className="flex gap-4">
              {["Instagram", "Twitter", "LinkedIn", "Facebook"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-muted-foreground text-sm hover:text-secondary transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            © 2026 Ingenium — Chitkara University. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground text-xs hover:text-secondary transition-colors">Terms & Conditions</a>
            <a href="#" className="text-muted-foreground text-xs hover:text-secondary transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
