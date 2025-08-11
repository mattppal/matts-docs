'use client';

import { useEffect } from 'react';
import { useClerk } from '@clerk/nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ProtectedContentGate({ slug }: { slug: string }) {
  const clerk = useClerk();

  useEffect(() => {
    // Automatically open sign-in modal when component mounts
    const timer = setTimeout(() => {
      clerk.openSignIn({
        redirectUrl: `/docs/${slug}`,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [clerk, slug]);

  const handleSignIn = () => {
    clerk.openSignIn({
      redirectUrl: `/docs/${slug}`,
    });
  };

  const handleSignUp = () => {
    clerk.openSignUp({
      redirectUrl: `/docs/${slug}`,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader className="text-center">
        <CardTitle>🔒 Protected Content</CardTitle>
        <CardDescription>
          This page requires authentication to view.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-fd-muted-foreground text-center">
          Sign in to your account to access this documentation.
        </p>
        <div className="flex flex-col space-y-2">
          <Button onClick={handleSignIn} className="w-full">
            Sign In
          </Button>
          <Button onClick={handleSignUp} variant="outline" className="w-full">
            Create Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}