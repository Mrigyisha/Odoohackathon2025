import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
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
import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where
} from "firebase/firestore";

import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const gmail = import.meta.env.VITE_ADMIN_EMAIL;



const Admin = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        
        const allowedAdmins = [gmail];

        if (!allowedAdmins.includes(user.email)) {
          alert("Access denied. Admins only.");
          navigate("/"); // redirect to homepage
        }
      } else {
        navigate("/login"); // not logged in
      }
    });

    return () => unsubscribe();
  }, []);




  const [activeTab, setActiveTab] = useState("pending");
  const [items, setItems] = useState<any[]>([]);

  const fetchItems = async () => {
    const q = query(collection(db, "items"));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItems(docs);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleApprove = async (itemId: string) => {
    const itemRef = doc(db, "items", itemId);
    await updateDoc(itemRef, { isApproved: true, status: "available" });
    fetchItems();
  };

  const handleReject = async (itemId: string) => {
    const itemRef = doc(db, "items", itemId);
    await updateDoc(itemRef, { status: "rejected" });
    fetchItems();
  };

  const handleRemove = async (itemId: string) => {
    await deleteDoc(doc(db, "items", itemId));
    fetchItems();
  };

  const pendingItems = items.filter(item => item.status !== "rejected" && !item.isApproved);
  const approvedItems = items.filter(item => item.status === "available" && item.isApproved);
  const rejectedItems = items.filter(item => item.status === "rejected");

  const stats = {
    totalUsers: 0, // Placeholder if you want to fetch from users collection
    totalItems: items.length,
    pendingReviews: pendingItems.length,
    todaySignups: 0, // Optional
  };

  const renderItemCard = (item: any) => (
    <Card key={item.id} className="shadow-soft">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <img
            src={item.image || "/placeholder.png"}
            alt={item.title}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  by {item.uploader} • {item.uploadDate || "unknown"}
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
                item.status === 'available' ? 'default' :
                  item.status === 'rejected' ? 'destructive' : 'secondary'
              }>
                {item.status || 'pending'}
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
              {!item.isApproved && item.status !== 'rejected' && (
                <>
                  <Button variant="default" size="sm" onClick={() => handleApprove(item.id)}>
                    <Check className="h-3 w-3 mr-1" />
                    Approve
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleReject(item.id)}>
                    <X className="h-3 w-3 mr-1" />
                    Reject
                  </Button>
                </>
              )}
              {item.status === 'available' && (
                <Button variant="destructive" size="sm" onClick={() => handleRemove(item.id)}>
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage and moderate the ReVibe platform</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
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
          </div>

          <Card className="shadow-soft mb-8">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search items, users, or content..." className="pl-10" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Button variant={activeTab === "pending" ? "default" : "ghost"} onClick={() => setActiveTab("pending")}>Pending Approval</Button>
                <Button variant={activeTab === "approved" ? "default" : "ghost"} onClick={() => setActiveTab("approved")}>Approved Items</Button>
                <Button variant={activeTab === "rejected" ? "default" : "ghost"} onClick={() => setActiveTab("rejected")}>Rejected Items</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeTab === "pending" && (
                <div className="space-y-4">
                  <CardDescription>Items waiting for moderation approval</CardDescription>
                  {pendingItems.length > 0 ? pendingItems.map(renderItemCard) : (
                    <div className="text-center py-8 text-muted-foreground">No pending items to review</div>
                  )}
                </div>
              )}
              {activeTab === "approved" && (
                <div className="space-y-4">
                  <CardDescription>Approved items currently live</CardDescription>
                  {approvedItems.length > 0 ? approvedItems.map(renderItemCard) : (
                    <div className="text-center py-8 text-muted-foreground">No approved items</div>
                  )}
                </div>
              )}
              {activeTab === "rejected" && (
                <div className="space-y-4">
                  <CardDescription>Rejected items</CardDescription>
                  {rejectedItems.length > 0 ? rejectedItems.map(renderItemCard) : (
                    <div className="text-center py-8 text-muted-foreground">No rejected items</div>
                  )}
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
