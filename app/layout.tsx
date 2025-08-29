import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { ClerkProvider } from '@clerk/nextjs';


const inter = Inter({
  subsets: ['latin'],
});

export const metadata = {
  title: 'stripe saas mini-masterclass',
  description: 'Systems-focused deep dive into subscription billing that actually works. For developers who understand good architecture and build with AI tools.',
  keywords: 'Stripe, Checkout, Subscriptions, Webhooks, Payment Processing, Systems Architecture, AI Development',
  authors: [{ name: 'Matt' }],
  creator: 'Matt',
  openGraph: {
    title: 'stripe saas mini-masterclass',
    description: 'Systems-focused deep dive into subscription billing that actually works',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'stripe saas mini-masterclass',
    description: 'Systems-focused deep dive into subscription billing that actually works',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.className} suppressHydrationWarning>
        <body className="flex flex-col min-h-screen">
          <RootProvider theme={{ enabled: true, forcedTheme: 'dark' }}>
            {children}
            <Toaster />
          </RootProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
