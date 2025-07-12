import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Filter,
  Heart,
  Star,
  RefreshCw,
  Grid3X3,
  List,
  SlidersHorizontal
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

import { useQuery } from "@tanstack/react-query";
import { db } from "@/firebase/config"
import { collection, getDocs, query, where } from "firebase/firestore"

type Item = {
  id: string;
  title: string;
  image?: string;
  uploader: string;
  condition: string;
  points: number;
  category: string;
  size: string;
  likes: number;
  location: string;
  uploadDate: string;
};


const Browse = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const fetchItemsFromFirestore = async (): Promise<Item[]> => {
    const q = query(
      collection(db, "items"),
      where("isApproved", "==", true),
      where("status", "==", "available")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title ?? "Untitled",
        uploader: data.uploader ?? "Anonymous",
        condition: data.condition ?? "Unknown",
        points: data.points ?? 0,
        category: data.category ?? "Misc",
        size: data.size ?? "One Size",
        likes: data.likes ?? 0,
        image: data.image, 
        location: data.location ?? "",
        uploadDate: data.uploadDate ?? ""
      };
    });
  };


  const { data: items = [], isLoading, isError } = useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: fetchItemsFromFirestore,
  });


  const categories = ["All", "Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories"];
  const sizes = ["All", "XS", "S", "M", "L", "XL", "XXL", "One Size"];
  const conditions = ["All", "Like New", "Excellent", "Good", "Fair"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Browse Items</h1>
            <p className="text-muted-foreground">
              Discover amazing preloved pieces from our community
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card rounded-lg border border-border p-6 mb-8 shadow-soft">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map(size => (
                      <SelectItem key={size} value={size.toLowerCase()}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map(condition => (
                      <SelectItem key={condition} value={condition.toLowerCase()}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>

            {/* Sort and View Options */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  {items.length} items found
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="price-low">Points: Low to High</SelectItem>
                    <SelectItem value="price-high">Points: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Items Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item, index) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        {item.condition}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-background/80 backdrop-blur-sm hover:bg-background/90 h-8 w-8"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-foreground line-clamp-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">by {item.uploader}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">{item.category}</Badge>
                      <Badge variant="outline" className="text-xs">Size {item.size}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-primary font-medium">
                        <Star className="h-4 w-4 fill-current" />
                        <span>{item.points} pts</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Heart className="h-3 w-3" />
                        <span>{item.likes}</span>
                      </div>
                    </div>

                    <Button variant="default" size="sm" className="w-full group" asChild>
                      <Link to={`/item/${item.id}`}>
                        <RefreshCw className="mr-2 h-3 w-3 group-hover:rotate-180 transition-transform duration-300" />
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <Card
                  key={item.id}
                  className="hover:shadow-hover transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">by {item.uploader} • {item.location}</p>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{item.condition}</Badge>
                          <Badge variant="outline">{item.category}</Badge>
                          <Badge variant="outline">Size {item.size}</Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-primary fill-current" />
                              <span className="text-primary font-medium">{item.points} points</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="h-3 w-3" />
                              <span>{item.likes} likes</span>
                            </div>
                            <span>Posted {item.uploadDate}</span>
                          </div>
                          <Button variant="default" asChild>
                            <Link to={`/item/${item.id}`}>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Items
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;