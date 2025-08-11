import { useUser, useAuth, SignInButton, SignUpButton, UserButton, useClerk } from '@clerk/nextjs';

// Re-export Clerk hooks and components for easier migration
export { useUser, useAuth, SignInButton, SignUpButton, UserButton, useClerk };

// Compatibility layer for better-auth migration
export const authClient = {
  signIn: {
    email: () => {
      throw new Error('Use Clerk SignInButton component instead');
    },
    social: () => {
      throw new Error('Use Clerk SignInButton component instead');
    },
  },
  signUp: {
    email: () => {
      throw new Error('Use Clerk SignUpButton component instead');
    },
  },
};

// Legacy hook compatibility
export function useSession() {
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useAuth();
  
  return {
    data: isSignedIn && user ? { user } : null,
    isLoading: !isLoaded,
  };
}

// Legacy signOut function
export function signOut() {
  const clerk = useClerk();
  return clerk.signOut();
}