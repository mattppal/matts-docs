'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useAuth, SignUpButton } from '@clerk/nextjs';

export default function HomePage() {
  const { isSignedIn, isLoaded } = useAuth();
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 bg-fd-background">
      <div className="mx-auto max-w-3xl text-center">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-fd-foreground sm:text-6xl lg:text-7xl">
            Matt's Docs
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-8 text-fd-muted-foreground">
            A comprehensive collection of documentation, guides, and resources.
            Everything you need to get started and stay productive.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          {!isLoaded ? (
            // Loading skeleton
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              <div className="h-12 w-40 animate-pulse rounded-lg bg-fd-muted" />
              <div className="h-12 w-32 animate-pulse rounded-lg bg-fd-muted" />
            </div>
          ) : isSignedIn ? (
            // Signed in - show docs navigation
            <>
              <Link
                href="/course"
                className="group inline-flex items-center gap-2 rounded-lg bg-fd-primary/10 border border-fd-primary/20 px-6 py-3 text-lg font-semibold text-fd-primary transition-all hover:bg-fd-primary/15 hover:scale-105"
              >
                View Documentation
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/course"
                className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-background px-6 py-3 text-lg font-medium text-fd-foreground transition-all hover:bg-fd-accent hover:text-fd-accent-foreground"
              >
                Get Started
              </Link>
            </>
          ) : (
            // Not signed in - simplified CTAs
            <>
              <SignUpButton mode="modal">
                <button className="group inline-flex items-center gap-2 rounded-lg bg-fd-primary/10 border border-fd-primary/20 px-6 py-3 text-lg font-semibold text-fd-primary transition-all hover:bg-fd-primary/15 hover:scale-105">
                  Sign Up Free
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </SignUpButton>
              <Link
                href="/course"
                className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-background px-6 py-3 text-lg font-medium text-fd-foreground transition-all hover:bg-fd-accent hover:text-fd-accent-foreground"
              >
                Preview Docs
              </Link>
            </>
          )}
        </div>

        {/* Subtle Features */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="mb-4 text-3xl">📚</div>
            <h3 className="mb-2 text-lg font-semibold text-fd-foreground">Comprehensive</h3>
            <p className="text-sm text-fd-muted-foreground">
              Detailed guides and documentation for all your needs
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4 text-3xl">⚡</div>
            <h3 className="mb-2 text-lg font-semibold text-fd-foreground">Fast Access</h3>
            <p className="text-sm text-fd-muted-foreground">
              Quick search and navigation to find what you need
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4 text-3xl">🎯</div>
            <h3 className="mb-2 text-lg font-semibold text-fd-foreground">Focused</h3>
            <p className="text-sm text-fd-muted-foreground">
              Clean, minimal design that gets out of your way
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}