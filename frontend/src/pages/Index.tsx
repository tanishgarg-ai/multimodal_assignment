import Navbar from "@/components/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import PerformersSection from "@/components/landing/PerformersSection";
import EventsSection from "@/components/landing/EventsSection";
import SponsorsSection from "@/components/landing/SponsorsSection";
import ScheduleSection from "@/components/landing/ScheduleSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PerformersSection />
      <EventsSection />
      <SponsorsSection />
      <ScheduleSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
