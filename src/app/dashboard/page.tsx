"use client";

import { useAuth } from "../context/auth_context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, userDetails, checkAuth, logout } = useAuth();

  const getInitials = () => {
    if (!userDetails?.firstName) return "U";
    return userDetails.firstName[0].toUpperCase();
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {/* User Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={userDetails?.avatarUrl} alt={"/default.svg"} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">My Account</h1>
            <p className="text-muted-foreground">Welcome, {userDetails?.firstName || "User"}</p>
          </div>
        </div>
        <Button variant="outline" onClick={logout}>Sign Out</Button>
      </div>

      {/* Main Dashboard Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Account Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Personal Information</h3>
                <Separator className="my-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p>{userDetails?.firstName || "Not provided"}</p>
                    <p>{userDetails?.lastName || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email Address</p>
                    <p>{userDetails?.emailAddress || "Not provided"}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Recent Orders</h3>
                <Separator className="my-2" />
                <p className="text-muted-foreground py-2">No recent orders</p>
                {/* You can add your order items here */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-4">
                Your order history will appear here
              </p>
              {/* Add your order list here */}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Shipping Addresses</CardTitle>
              <Button variant="outline" size="sm">Add Address</Button>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-4">
                You haven't added any addresses yet
              </p>
              {/* Add your addresses here */}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      defaultValue={userDetails?.firstName || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      defaultValue={userDetails?.lastName || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded-md"
                      defaultValue={userDetails?.emailAddress || ""}
                      disabled
                    />
                  </div>
                </div>
                <Button className="mt-4">Save Changes</Button>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mt-2 mb-4">
                  Permanently delete your account and all associated data.
                </p>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
