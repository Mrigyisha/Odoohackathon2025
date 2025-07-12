import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedItems from "@/components/FeaturedItems";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturedItems />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
