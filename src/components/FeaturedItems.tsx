import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ Add this line
import featuredItem1 from "@/assets/featured-item-1.jpg";
import featuredItem2 from "@/assets/featured-item-2.jpg";
import featuredItem3 from "@/assets/featured-item-3.jpg";

const featuredItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    image: featuredItem1,
    uploader: "Sarah M.",
    condition: "Excellent",
    points: 45,
    category: "Outerwear",
    size: "M",
    likes: 23
  },
  {
    id: 2,
    title: "Elegant Cream Dress",
    image: featuredItem2,
    uploader: "Emma L.",
    condition: "Like New",
    points: 35,
    category: "Dresses",
    size: "S",
    likes: 31
  },
  {
    id: 3,
    title: "Cozy Knit Sweater",
    image: featuredItem3,
    uploader: "Maya K.",
    condition: "Good",
    points: 25,
    category: "Knitwear",
    size: "L",
    likes: 18
  }
];

const FeaturedItems = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Featured Items
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing preloved pieces from our community. Each item tells a story 
            and is ready for its next chapter.
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredItems.map((item, index) => (
            <div 
              key={item.id} 
              className="group bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                    {item.condition}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Heart className="h-3 w-3" />
                      <span>{item.likes}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">by {item.uploader}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{item.category}</Badge>
                  <Badge variant="outline">Size {item.size}</Badge>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-1 text-primary font-medium">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{item.points} points</span>
                  </div>
                  <Button variant="default" size="sm" className="group">
                    <RefreshCw className="mr-2 h-3 w-3 group-hover:rotate-180 transition-transform duration-300" />
                    Swap
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center">
          <Link
            to="/browse"
            className="inline-block px-6 py-3 border border-border rounded-lg text-foreground hover:bg-accent transition-colors duration-300 text-lg font-medium"
          >
            View All Items
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;
