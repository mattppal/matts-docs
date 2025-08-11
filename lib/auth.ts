import { auth, currentUser } from '@clerk/nextjs/server';

// Re-export Clerk's auth utilities for easier migration
export { auth, currentUser };

// Helper function to check if user is authenticated
export async function getAuthenticatedUser() {
  const user = await currentUser();
  return user;
}

// Helper function to get session
export async function getSession() {
  const authResult = await auth();
  return authResult.userId ? authResult : null;
}