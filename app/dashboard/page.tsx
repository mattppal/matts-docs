"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const clerk = useClerk();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You need to be signed in to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => clerk.openSignIn({ redirectUrl: "/dashboard" })}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.imageUrl} alt={user.fullName || ""} />
                  <AvatarFallback className="text-2xl">
                    {user.firstName?.charAt(0).toUpperCase() || user.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Welcome, {user.fullName || user.username}!
                  </h1>
                  <p className="text-gray-600">{user.primaryEmailAddress?.emailAddress}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => clerk.signOut()}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Sign Out
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="font-semibold">Name:</span> {user.fullName || user.username}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span> {user.primaryEmailAddress?.emailAddress}
                  </div>
                  <div>
                    <span className="font-semibold">Email Verified:</span>{" "}
                    {user.primaryEmailAddress?.verification?.status === 'verified' ? "✅ Yes" : "❌ No"}
                  </div>
                  <div>
                    <span className="font-semibold">User ID:</span> {user.id}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="font-semibold">First Name:</span> {user.firstName || "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold">Last Name:</span> {user.lastName || "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold">Username:</span> {user.username || "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold">Created:</span> {user.createdAt?.toLocaleDateString() || "N/A"}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <Link href="/docs">
                      <Button variant="outline">View Documentation</Button>
                    </Link>
                    <Link href="/">
                      <Button variant="outline">Back to Home</Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      onClick={() => clerk.openUserProfile()}
                    >
                      Manage Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}