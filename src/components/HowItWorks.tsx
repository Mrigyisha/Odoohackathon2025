import { Upload, Search, RefreshCw, Star } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "List Your Items",
    description: "Upload photos and details of clothes you no longer wear. Set swap preferences or points value.",
    color: "from-primary to-primary-glow"
  },
  {
    icon: Search,
    title: "Browse & Discover",
    description: "Explore our curated collection of preloved items. Filter by size, style, and condition.",
    color: "from-primary-glow to-accent"
  },
  {
    icon: RefreshCw,
    title: "Swap or Redeem",
    description: "Request direct swaps with other users or use points to redeem items you love.",
    color: "from-accent to-primary"
  },
  {
    icon: Star,
    title: "Enjoy & Repeat",
    description: "Rock your new-to-you pieces and keep the sustainable fashion cycle going!",
    color: "from-primary to-primary-glow"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            How ReVibe Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join the sustainable fashion revolution in four simple steps. 
            It's easy, eco-friendly, and incredibly rewarding.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="relative group animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-primary-glow opacity-30"></div>
                )}

                {/* Card */}
                <div className="bg-card rounded-xl p-6 text-center space-y-4 shadow-soft hover:shadow-hover transition-all duration-300 group-hover:scale-105">
                  {/* Step Number */}
                  <div className="absolute -top-3 left-6 bg-primary text-primary-foreground text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${step.color} p-4 shadow-glow group-hover:animate-float`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 space-y-4">
          <h3 className="text-2xl font-semibold text-foreground">
            Ready to start your sustainable fashion journey?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:shadow-glow transform hover:scale-105 transition-all duration-300">
              Join ReVibe Today
            </button>
            <button className="bg-card text-foreground border border-border px-8 py-3 rounded-lg font-medium hover:bg-accent transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;