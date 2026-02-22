import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const galleryImages = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  alt: `Ingenium past event ${i + 1}`,
  height: [300, 400, 350, 250, 380, 320, 280, 360, 310, 340, 290, 370][i],
}));

const Gallery = () => {
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
            Gallery
          </motion.h1>
          <p className="text-muted-foreground text-center mb-12">Moments from previous editions of Ingenium</p>

          {/* Masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="break-inside-avoid rounded-xl overflow-hidden border-glow box-glow-hover transition-all duration-300 group"
              >
                <div
                  className="w-full bg-gradient-to-br from-muted to-card flex items-center justify-center"
                  style={{ height: img.height }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full gradient-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <span className="font-display text-primary-foreground text-lg font-bold">{img.id}</span>
                    </div>
                    <p className="text-muted-foreground text-xs">Event Photo {img.id}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
