import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  RefreshCw,
  MapPin,
  Calendar,
  Shield,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import featuredItem1 from "@/assets/featured-item-1.jpg";
import featuredItem2 from "@/assets/featured-item-2.jpg";
import featuredItem3 from "@/assets/featured-item-3.jpg";
import ChatWindow from "@/components/ChatWindow";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "@/firebase/config"; 

const ItemDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [user] = useAuthState(auth);

  // Mock item data - in real app, this would be fetched based on ID
  const item = {
    id: 1,
    title: "Vintage Denim Jacket",
    images: [featuredItem1, featuredItem2, featuredItem3],
    uploader: {
      name: "Sarah Martinez",
      avatar: "",
      joinDate: "March 2024",
      totalSwaps: 23,
      rating: 4.8,
      location: "New York, NY",
    },
    condition: "Excellent",
    points: 45,
    category: "Outerwear",
    size: "M",
    brand: "Levi's",
    color: "Blue",
    likes: 23,
    views: 156,
    uploadDate: "2 days ago",
    description:
      "This vintage Levi's denim jacket is a true classic! It's been well-maintained and has that perfect worn-in feel. Features include classic button closure, chest pockets, and timeless styling. Great for layering or wearing on its own. The jacket has some beautiful natural fading that adds to its character.",
    tags: ["vintage", "denim", "classic", "spring", "layering"],
    measurements: {
      chest: "20 inches",
      length: "24 inches",
      shoulders: "18 inches",
    },
    material: "100% Cotton",
    careInstructions: "Machine wash cold, hang dry",
    availability: "available", // available, pending, swapped
    swapPreferences: ["Similar outerwear", "Dresses size S/M", "Accessories"],
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Button variant="ghost" className="pl-0" asChild>
              <Link to="/browse">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Browse
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                <img
                  src={item.images[currentImageIndex]}
                  alt={`${item.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {item.images.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                      onClick={previousImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}

                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-background/80 backdrop-blur-sm"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isLiked ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-background/80 backdrop-blur-sm"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Image Thumbnails */}
              {item.images.length > 1 && (
                <div className="flex space-x-2">
                  {item.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? "border-primary"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Item Details */}
            <div className="space-y-6">
              {/* Title and Basic Info */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">
                      {item.title}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Posted {item.uploadDate} • {item.views} views
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary flex items-center">
                      <Star className="h-5 w-5 fill-current mr-1" />
                      {item.points} points
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center mt-1">
                      <Heart className="h-3 w-3 mr-1" />
                      {item.likes} likes
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <Badge
                  variant={
                    item.availability === "available" ? "default" : "secondary"
                  }
                  className="text-sm"
                >
                  {item.availability === "available"
                    ? "Available for Swap"
                    : "Not Available"}
                </Badge>

                {/* Quick Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Category:</span>
                    <span className="ml-2 font-medium">{item.category}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Size:</span>
                    <span className="ml-2 font-medium">{item.size}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Condition:</span>
                    <span className="ml-2 font-medium">{item.condition}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Brand:</span>
                    <span className="ml-2 font-medium">{item.brand}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {item.availability === "available" && (
                <div className="flex space-x-4">
                  <Button variant="hero" className="flex-1" size="lg">
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Request Swap
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      if (user) {
                        setShowChat(true);
                      } else {
                        alert("Please log in to start chatting.");
                      }
                    }}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Message
                  </Button>
                </div>
              )}

              {/* Description */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>

              {/* Details */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Item Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Material:</span>
                      <span className="ml-2 font-medium">{item.material}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Color:</span>
                      <span className="ml-2 font-medium">{item.color}</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-2">Measurements</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Chest:</span>
                        <span className="ml-1 font-medium">
                          {item.measurements.chest}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Length:</span>
                        <span className="ml-1 font-medium">
                          {item.measurements.length}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Shoulders:
                        </span>
                        <span className="ml-1 font-medium">
                          {item.measurements.shoulders}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <span className="text-muted-foreground">
                      Care Instructions:
                    </span>
                    <span className="ml-2 font-medium">
                      {item.careInstructions}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <div>
                <h3 className="font-medium text-foreground mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Swap Preferences */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Swap Preferences</CardTitle>
                  <CardDescription>
                    Items the owner is interested in trading for
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {item.swapPreferences.map((preference, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {preference}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Owner Info */}
          <Card className="mt-12 shadow-soft">
            <CardHeader>
              <CardTitle>About the Owner</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={item.uploader.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-lg">
                    {item.uploader.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {item.uploader.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {item.uploader.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Joined {item.uploader.joinDate}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (user) {
                          setShowChat(true);
                        } else {
                          alert("Please log in to contact the owner.");
                        }
                      }}
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Contact
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">
                        Total Swaps:
                      </span>
                      <span className="ml-2 font-medium">
                        {item.uploader.totalSwaps}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-muted-foreground">Rating:</span>
                      <div className="flex items-center ml-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                        <span className="font-medium">
                          {item.uploader.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {user && showChat && (
        <ChatWindow
          recipient={item.uploader.name}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
};

export default ItemDetail;
