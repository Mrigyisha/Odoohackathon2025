import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "@/firebase/config";

import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Package,
  RefreshCw,
  Clock,
  TrendingUp,
  Settings,
  Heart,
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [myItems, setMyItems] = useState([]);
  const [recentSwaps, setRecentSwaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          console.log("user data", data);

          setUserData({
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            avatar: data.avatar || "",
            points: data.points || 0,
            totalSwaps: data.totalswaps || 0,
            itemsListed: data.itemslisted || 0,
            joinDate: data.createdAt?.toDate().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            }) || "Unknown",
          });

          // ✅ Only run these inside the block once 'data' is defined
          const itemsQuery = query(
            collection(db, "items"),
            where("userID", "==", currentUser.uid) // or adjust to match your schema
          );
          const itemsSnapshot = await getDocs(itemsQuery);
          const items = itemsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMyItems(items);

          const swapsQuery = query(
            collection(db, "swaps"),
            where("userID", "==", currentUser.uid)
          );
          const swapsSnapshot = await getDocs(swapsQuery);
          const swaps = swapsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRecentSwaps(swaps);
        } else {
          console.warn("No user document found for UID:", currentUser.uid);
        }
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };


    fetchData();
  }, [currentUser]);

  if (loading || !currentUser || !userData) {
    return <div className="p-10">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {userData.name.split(" ")[0]}!</p>
            </div>
            <Button variant="hero" asChild>
              <Link to="/add-item">
                <Plus className="mr-2 h-4 w-4" /> List New Item
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="shadow-soft">
                <CardHeader className="text-center pb-4">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={userData.avatar} />
                    <AvatarFallback>
                      {userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl">{userData.name}</CardTitle>
                  <CardDescription>{userData.email}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant={activeTab === "overview" ? "default" : "ghost"} onClick={() => setActiveTab("overview")} className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" /> Overview
                  </Button>
                  <Button variant={activeTab === "items" ? "default" : "ghost"} onClick={() => setActiveTab("items")} className="w-full justify-start">
                    <Package className="h-4 w-4 mr-2" /> Items ({myItems.length})
                  </Button>
                  <Button variant={activeTab === "swaps" ? "default" : "ghost"} onClick={() => setActiveTab("swaps")} className="w-full justify-start">
                    <RefreshCw className="h-4 w-4 mr-2" /> Swaps
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main content */}
            <div className="lg:col-span-3 space-y-6">
              {activeTab === "overview" && (
                <>
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card><CardContent className="p-6"><p className="text-sm">Points</p><p className="text-2xl font-bold">{userData.points}</p></CardContent></Card>
                    <Card><CardContent className="p-6"><p className="text-sm">Items Listed</p><p className="text-2xl font-bold">{userData.itemsListed}</p></CardContent></Card>
                    <Card><CardContent className="p-6"><p className="text-sm">Swaps</p><p className="text-2xl font-bold">{userData.totalSwaps}</p></CardContent></Card>
                  </div>
                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your latest swaps</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentSwaps.map((swap) => (
                        <div key={swap.id} className="border p-4 rounded-lg flex justify-between items-center">
                          <div>
                            <p className="font-medium">{swap.item}</p>
                            <p className="text-sm text-muted-foreground">
                              {swap.type === "swap" ? "Swapped with" : "Redeemed from"} {swap.partner}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant={swap.status === "completed" ? "default" : "secondary"}>{swap.status}</Badge>
                            <p className="text-xs text-muted-foreground mt-1">{swap.date}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </>
              )}

              {activeTab === "items" && (
                <Card className="shadow-soft">
                  <CardHeader><CardTitle>My Items</CardTitle></CardHeader>
                  <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myItems.map((item) => (
                      <div key={item.id} className="border p-4 rounded-lg">
                        <Badge className="mb-2" variant={item.status === "available" ? "default" : item.status === "pending" ? "secondary" : "outline"}>{item.status}</Badge>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm">{item.points} points | {item.views} views | {item.likes} likes</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {activeTab === "swaps" && (
                <Card className="shadow-soft">
                  <CardHeader><CardTitle>My Swaps</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    {recentSwaps.map((swap) => (
                      <div key={swap.id} className="border p-4 rounded-lg flex justify-between items-center">
                        <div>
                          <p className="font-medium">{swap.item}</p>
                          <p className="text-sm text-muted-foreground">
                            {swap.type === "swap" ? "Swapped with" : "Redeemed from"} {swap.partner}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={swap.status === "completed" ? "default" : "secondary"}>{swap.status}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">{swap.date}</p>
                        </div>
                      </div>
                    ))}
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
