'use client';

import { UserButton, SignInButton } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export function AuthNav() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div className="w-8 h-8 animate-pulse bg-fd-muted rounded-full" />;
  }

  if (isSignedIn) {
    return <UserButton />;
  }

  return (
    <SignInButton mode="modal">
      <Button variant="outline" size="sm">
        Sign In
      </Button>
    </SignInButton>
  );
}