'use client';

import { useClerk } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export function ProtectedContentGate({ slug }: { slug: string }) {
  const clerk = useClerk();

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
    <div className="flex flex-col space-y-2">
      <Button onClick={handleSignIn} className="w-full">
        Sign In
      </Button>
      <Button onClick={handleSignUp} variant="outline" className="w-full">
        Create Account
      </Button>
    </div>
  );
}