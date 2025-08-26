'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useAuth, SignUpButton } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { isSignedIn, isLoaded } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 bg-fd-background">
      <div className="mx-auto max-w-4xl text-center">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="mb-6 text-7xl font-bold tracking-tight text-fd-foreground sm:text-6xl lg:text-7xl">
            Stripe mini-masterclass
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-8 text-fd-muted-foreground">
            Ship subscription billing that actually works. 11 focused lessons designed for 
            developers who understand systems, love clean patterns, and build with AI tools.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link
            href="/course"
            className="group inline-flex items-center gap-2 rounded-lg bg-fd-primary/10 border border-fd-primary/20 px-6 py-3 text-lg font-semibold text-fd-primary transition-all hover:bg-fd-primary/15 hover:scale-105"
          >
            Jump in <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Subtle Features */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="mb-4 text-3xl">🧠</div>
            <h3 className="mb-2 text-lg font-semibold text-fd-foreground">Systems Thinking</h3>
            <p className="text-sm text-fd-muted-foreground">
              Understand the why behind webhook patterns and state management
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4 text-3xl">🤖</div>
            <h3 className="mb-2 text-lg font-semibold text-fd-foreground">AI-Friendly</h3>
            <p className="text-sm text-fd-muted-foreground">
              Clean, documented patterns perfect for AI-assisted development
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4 text-3xl">⚡</div>
            <h3 className="mb-2 text-lg font-semibold text-fd-foreground">Ship Fast</h3>
            <p className="text-sm text-fd-muted-foreground">
              Copy-paste patterns that work. No fluff, just working code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}