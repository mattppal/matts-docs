"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) {
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
            <Link href="/sign-in">
              <Button className="w-full">Sign In</Button>
            </Link>
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
                  <AvatarImage src={session.user.image || ""} alt={session.user.name} />
                  <AvatarFallback className="text-2xl">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Welcome, {session.user.name}!
                  </h1>
                  <p className="text-gray-600">{session.user.email}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => signOut()}
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
                    <span className="font-semibold">Name:</span> {session.user.name}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span> {session.user.email}
                  </div>
                  <div>
                    <span className="font-semibold">Email Verified:</span>{" "}
                    {session.user.emailVerified ? "✅ Yes" : "❌ No"}
                  </div>
                  <div>
                    <span className="font-semibold">User ID:</span> {session.user.id}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Session Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="font-semibold">Session ID:</span> {session.session.id}
                  </div>
                  <div>
                    <span className="font-semibold">Active Organization:</span>{" "}
                    {session.session.activeOrganizationId || "Personal"}
                  </div>
                  <div>
                    <span className="font-semibold">IP Address:</span>{" "}
                    {session.session.ipAddress || "N/A"}
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
                    <Button variant="outline" disabled>
                      Settings (Coming Soon)
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