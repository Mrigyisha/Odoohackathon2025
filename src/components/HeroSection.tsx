import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw, Heart } from "lucide-react";
import heroImage from "@/assets/hero-clothing.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section id="home" className="pt-16 min-h-screen bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Smart swaps.
                <span className="block text-primary">Timeless style.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Join ReVibe's sustainable fashion community. Exchange, swap, and discover
                amazing preloved clothing while reducing textile waste.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Items Exchanged</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">5K+</div>
                <div className="text-sm text-muted-foreground">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">2.5T</div>
                <div className="text-sm text-muted-foreground">CO2 Saved</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="group" asChild>
                <Link to="/signup">
                Start Swapping
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="soft" size="xl" asChild>
                <Link to="/browse">
                  <Heart className="mr-2 h-5 w-5" />
                  Browse Items
                </Link>
              </Button>
            </div>

            {/* Features */}
            <div className="flex flex-col sm:flex-row gap-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <RefreshCw className="h-4 w-4 mr-2 text-primary" />
                Direct Swaps
              </div>
              <div className="flex items-center">
                <RefreshCw className="h-4 w-4 mr-2 text-primary" />
                Point System
              </div>
              <div className="flex items-center">
                <RefreshCw className="h-4 w-4 mr-2 text-primary" />
                Eco-Friendly
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-scale-in">
            <div className="relative rounded-2xl overflow-hidden shadow-hover">
              <img 
                src={heroImage} 
                alt="Sustainable clothing collection" 
                className="w-full h-[500px] md:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-card p-4 rounded-lg shadow-hover animate-float">
              <div className="text-sm font-medium text-foreground">Sustainable</div>
              <div className="text-xs text-muted-foreground">Fashion</div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-card p-4 rounded-lg shadow-hover animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-sm font-medium text-foreground">Community</div>
              <div className="text-xs text-muted-foreground">Driven</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;