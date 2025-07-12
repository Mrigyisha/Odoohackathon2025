import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Users, 
  Package, 
  TrendingUp, 
  AlertTriangle,
  Check,
  X,
  Eye,
  Flag,
  UserX
} from "lucide-react";
import Navbar from "@/components/Navbar";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("pending");

  // Mock data for pending items
  const pendingItems = [
    {
      id: 1,
      title: "Vintage Band T-Shirt",
      uploader: "John Doe",
      uploadDate: "2 hours ago",
      category: "Tops",
      status: "pending",
      flagged: false,
      image: "/api/placeholder/100/100"
    },
    {
      id: 2,
      title: "Designer Handbag",
      uploader: "Jane Smith", 
      uploadDate: "4 hours ago",
      category: "Accessories",
      status: "pending",
      flagged: true,
      image: "/api/placeholder/100/100"
    }
  ];

  const approvedItems = [
    {
      id: 3,
      title: "Denim Jacket",
      uploader: "Sarah Wilson",
      uploadDate: "1 day ago",
      category: "Outerwear",
      status: "approved",
      flagged: false,
      image: "/api/placeholder/100/100"
    }
  ];

  const rejectedItems = [
    {
      id: 4,
      title: "Damaged Shoes",
      uploader: "Mike Johnson",
      uploadDate: "2 days ago",
      category: "Shoes",
      status: "rejected",
      flagged: true,
      reason: "Poor condition, not suitable for swap",
      image: "/api/placeholder/100/100"
    }
  ];

  const stats = {
    totalUsers: 1247,
    totalItems: 3892,
    pendingReviews: 23,
    todaySignups: 12
  };

  const handleApprove = (itemId: number) => {
    console.log("Approving item:", itemId);
    // Handle approval logic
  };

  const handleReject = (itemId: number) => {
    console.log("Rejecting item:", itemId);
    // Handle rejection logic
  };

  const renderItemCard = (item: any) => (
    <Card key={item.id} className="shadow-soft">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  by {item.uploader} • {item.uploadDate}
                </p>
              </div>
              {item.flagged && (
                <Badge variant="destructive" className="text-xs">
                  <Flag className="h-3 w-3 mr-1" />
                  Flagged
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant="outline">{item.category}</Badge>
              <Badge variant={
                item.status === 'approved' ? 'default' : 
                item.status === 'rejected' ? 'destructive' : 'secondary'
              }>
                {item.status}
              </Badge>
            </div>

            {item.reason && (
              <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                <strong>Reason:</strong> {item.reason}
              </p>
            )}

            <div className="flex items-center space-x-2 pt-2">
              <Button variant="outline" size="sm">
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
              
              {item.status === 'pending' && (
                <>
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => handleApprove(item.id)}
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Approve
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleReject(item.id)}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Reject
                  </Button>
                </>
              )}

              {item.status === 'approved' && (
                <Button variant="destructive" size="sm">
                  <UserX className="h-3 w-3 mr-1" />
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage and moderate the ReWear platform</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold text-primary">{stats.totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Items</p>
                    <p className="text-2xl font-bold text-primary">{stats.totalItems}</p>
                  </div>
                  <Package className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Reviews</p>
                    <p className="text-2xl font-bold text-orange-500">{stats.pendingReviews}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">New Signups</p>
                    <p className="text-2xl font-bold text-green-500">{stats.todaySignups}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="shadow-soft mb-8">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search items, users, or content..."
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">Advanced Search</Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Button
                  variant={activeTab === "pending" ? "default" : "ghost"}
                  onClick={() => setActiveTab("pending")}
                  className="relative"
                >
                  Pending Approval
                  {pendingItems.length > 0 && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {pendingItems.length}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant={activeTab === "approved" ? "default" : "ghost"}
                  onClick={() => setActiveTab("approved")}
                >
                  Approved Items
                </Button>
                <Button
                  variant={activeTab === "rejected" ? "default" : "ghost"}
                  onClick={() => setActiveTab("rejected")}
                >
                  Rejected Items
                </Button>
                <Button
                  variant={activeTab === "flagged" ? "default" : "ghost"}
                  onClick={() => setActiveTab("flagged")}
                >
                  Flagged Content
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeTab === "pending" && (
                <div className="space-y-4">
                  <CardDescription>
                    Items waiting for moderation approval
                  </CardDescription>
                  {pendingItems.length > 0 ? (
                    pendingItems.map(renderItemCard)
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No pending items to review
                    </div>
                  )}
                </div>
              )}

              {activeTab === "approved" && (
                <div className="space-y-4">
                  <CardDescription>
                    Recently approved items
                  </CardDescription>
                  {approvedItems.length > 0 ? (
                    approvedItems.map(renderItemCard)
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No approved items found
                    </div>
                  )}
                </div>
              )}

              {activeTab === "rejected" && (
                <div className="space-y-4">
                  <CardDescription>
                    Items that were rejected during moderation
                  </CardDescription>
                  {rejectedItems.length > 0 ? (
                    rejectedItems.map(renderItemCard)
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No rejected items found
                    </div>
                  )}
                </div>
              )}

              {activeTab === "flagged" && (
                <div className="space-y-4">
                  <CardDescription>
                    Content flagged by community members
                  </CardDescription>
                  <div className="text-center py-8 text-muted-foreground">
                    No flagged content at this time
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;