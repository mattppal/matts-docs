// Since we're now using Clerk, we can remove the better-auth types
// and use Clerk's built-in types instead

export type User = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  username?: string | null;
  emailAddress?: string | null;
  imageUrl?: string;
  createdAt?: Date;
};

export type Session = {
  userId: string;
  sessionId: string;
};