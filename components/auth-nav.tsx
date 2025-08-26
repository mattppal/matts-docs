'use client';

import { UserButton, SignInButton } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';
import { LogIn } from 'lucide-react';
import { useEffect, useState } from 'react';

export function AuthNav() {
  const { isSignedIn, isLoaded } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by showing loading state until mounted
  if (!mounted || !isLoaded) {
    return (
      <div className="flex items-center gap-2 px-2 py-1.5 text-sm text-fd-muted-foreground">
        <div className="size-4 animate-pulse bg-fd-muted rounded" />
        <div className="w-12 h-3 animate-pulse bg-fd-muted rounded" />
      </div>
    );
  }

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-2 px-2 py-1.5">
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "size-6"
            }
          }}
        />
      </div>
    );
  }

  return (
    <SignInButton mode="modal">
      <button className="flex items-center gap-2 px-2 py-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors w-full text-left">
        <LogIn className="size-4" />
        <span>Sign In</span>
      </button>
    </SignInButton>
  );
}