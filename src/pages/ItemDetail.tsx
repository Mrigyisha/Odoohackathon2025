import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Navbar from "@/components/Navbar";

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState<any | null>(null);
  const [uploader, setUploader] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemRef = doc(db, "items", id!);
        const itemSnap = await getDoc(itemRef);

        if (!itemSnap.exists()) {
          setError("Item not found.");
          return;
        }

        const itemData = itemSnap.data();
        setItem(itemData);

        if (itemData.uploaderId) {
          const userRef = doc(db, "users", itemData.uploaderId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUploader(userSnap.data());
          }
        }
      } catch (err) {
        console.error(err);
        setError("Error loading data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error || !item) return <div className="p-8 text-red-500">{error || "Item not found."}</div>;

  const images: string[] = item.imagePreviews || [];
  const tags: string[] = item.tags || [];

  const fullName = `${uploader?.firstName || ""} ${uploader?.lastName || ""}`.trim();
  const joinDate = uploader?.createdAt?.toDate?.().toLocaleDateString() || "Unknown";

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
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
                  src={images[currentImageIndex] || "/placeholder.jpg"}
                  alt={`Item Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                {images.length > 1 && (
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
                  <Button variant="secondary" size="icon" className="bg-background/80 backdrop-blur-sm" onClick={() => setIsLiked(!isLiked)}>
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button variant="secondary" size="icon" className="bg-background/80 backdrop-blur-sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex space-x-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${index === currentImageIndex ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`}
                    >
                      <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Item Info */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">{item.title}</h1>
                    <p className="text-muted-foreground mt-1">
                      {item.createdAt?.toDate?.().toLocaleDateString() || "Unknown"} • {item.views || 0} views
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary flex items-center">
                      <Star className="h-5 w-5 fill-current mr-1" />
                      {item.points}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center mt-1">
                      <Heart className="h-3 w-3 mr-1" />
                      {item.likes || 0} likes
                    </div>
                  </div>
                </div>

                <Badge variant={item.status === "available" ? "default" : "secondary"} className="text-sm">
                  {item.status === "available" ? "Available for Swap" : "Not Available"}
                </Badge>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">Category:</span> <span className="ml-2 font-medium">{item.category}</span></div>
                  <div><span className="text-muted-foreground">Size:</span> <span className="ml-2 font-medium">{item.size}</span></div>
                  <div><span className="text-muted-foreground">Condition:</span> <span className="ml-2 font-medium">{item.condition}</span></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <Button variant="hero" className="flex-1" size="lg">
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Request Swap
                </Button>
                <Button variant="outline" size="lg">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Message
                </Button>
              </div>

              {/* Description */}
              <Card className="shadow-soft">
                <CardHeader><CardTitle>Description</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{item.description || "No description provided."}</p>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="shadow-soft">
                <CardHeader><CardTitle>Tags</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No tags provided.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Uploader Info */}
          <Card className="mt-12 shadow-soft">
            <CardHeader><CardTitle>About the Owner</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={uploader?.avatar || ""} />
                  <AvatarFallback>
                    {fullName ? fullName.split(" ").map(n => n[0]).join("") : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{fullName || "Unknown User"}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {uploader?.location || "N/A"}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Joined {joinDate}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div><span className="text-muted-foreground">Email:</span> <span className="ml-2 font-medium">{uploader?.email || "N/A"}</span></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
