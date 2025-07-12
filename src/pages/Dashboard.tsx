import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Star, 
  Package, 
  RefreshCw, 
  Clock, 
  Plus, 
  Settings,
  Heart,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock user data
  const user = {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "",
    points: 125,
    totalSwaps: 23,
    itemsListed: 12,
    joinDate: "March 2024"
  };

  const myItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      image: "/api/placeholder/200/200",
      status: "available",
      points: 45,
      views: 12,
      likes: 5
    },
    {
      id: 2,
      title: "Cozy Wool Sweater",
      image: "/api/placeholder/200/200",
      status: "pending",
      points: 35,
      views: 8,
      likes: 3
    },
    {
      id: 3,
      title: "Summer Floral Dress",
      image: "/api/placeholder/200/200",
      status: "swapped",
      points: 40,
      views: 15,
      likes: 8
    }
  ];

  const recentSwaps = [
    {
      id: 1,
      item: "Designer Scarf",
      partner: "Emma Wilson",
      type: "swap",
      date: "2 days ago",
      status: "completed"
    },
    {
      id: 2,
      item: "Leather Boots",
      partner: "Maya Chen",
      type: "points",
      date: "1 week ago",
      status: "in-progress"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {user.name.split(' ')[0]}!</p>
              </div>
              <Button variant="hero" asChild>
                <Link to="/add-item">
                  <Plus className="mr-2 h-4 w-4" />
                  List New Item
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="shadow-soft">
                <CardHeader className="text-center pb-4">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl">{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{user.points}</div>
                      <div className="text-xs text-muted-foreground">Points</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{user.totalSwaps}</div>
                      <div className="text-xs text-muted-foreground">Swaps</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      variant={activeTab === "overview" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("overview")}
                    >
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Overview
                    </Button>
                    <Button 
                      variant={activeTab === "items" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("items")}
                    >
                      <Package className="mr-2 h-4 w-4" />
                      My Items ({myItems.length})
                    </Button>
                    <Button 
                      variant={activeTab === "swaps" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("swaps")}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Swap History
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link to="/profile/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Stats Cards */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="shadow-soft hover:shadow-hover transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Available Points</p>
                            <p className="text-2xl font-bold text-primary">{user.points}</p>
                          </div>
                          <Star className="h-8 w-8 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="shadow-soft hover:shadow-hover transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Items Listed</p>
                            <p className="text-2xl font-bold text-primary">{user.itemsListed}</p>
                          </div>
                          <Package className="h-8 w-8 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="shadow-soft hover:shadow-hover transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Total Swaps</p>
                            <p className="text-2xl font-bold text-primary">{user.totalSwaps}</p>
                          </div>
                          <RefreshCw className="h-8 w-8 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Activity */}
                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your latest swaps and interactions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentSwaps.map(swap => (
                          <div key={swap.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <div>
                                <p className="font-medium">{swap.item}</p>
                                <p className="text-sm text-muted-foreground">
                                  {swap.type === 'swap' ? 'Swapped with' : 'Redeemed from'} {swap.partner}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant={swap.status === 'completed' ? 'default' : 'secondary'}>
                                {swap.status}
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">{swap.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "items" && (
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>My Listed Items</CardTitle>
                    <CardDescription>Manage your clothing listings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {myItems.map(item => (
                        <div key={item.id} className="border border-border rounded-lg overflow-hidden hover:shadow-hover transition-all">
                          <div className="aspect-square bg-muted relative">
                            <Badge 
                              variant={item.status === 'available' ? 'default' : item.status === 'pending' ? 'secondary' : 'outline'}
                              className="absolute top-2 right-2"
                            >
                              {item.status}
                            </Badge>
                          </div>
                          <div className="p-4 space-y-2">
                            <h3 className="font-medium">{item.title}</h3>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-primary font-medium">{item.points} points</span>
                              <div className="flex items-center space-x-2 text-muted-foreground">
                                <span>{item.views} views</span>
                                <div className="flex items-center">
                                  <Heart className="h-3 w-3 mr-1" />
                                  {item.likes}
                                </div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="w-full">
                              Edit Item
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "swaps" && (
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>Swap History</CardTitle>
                    <CardDescription>All your completed and ongoing swaps</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentSwaps.map(swap => (
                        <div key={swap.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{swap.item}</p>
                              <p className="text-sm text-muted-foreground">
                                {swap.type === 'swap' ? 'Swapped with' : 'Redeemed from'} {swap.partner}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={swap.status === 'completed' ? 'default' : 'secondary'}>
                              {swap.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">{swap.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;