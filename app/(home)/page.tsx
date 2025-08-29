'use client';
import Link from 'next/link';
import Image from 'next/image';
import hero from '@/public/hero-impressionist.png';
import { Emoji, EmojiProvider } from 'react-apple-emojis';
import emojiData from 'react-apple-emojis/src/data.json';
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
    <EmojiProvider data={emojiData}>
      <div className="relative isolate flex flex-1 h-[100svh] min-h-[100svh] flex-col items-center justify-center px-6 py-16 md:py-24 bg-fd-background overflow-hidden">
      {/* Background Hero Image */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={hero}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          quality={85}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-fd-background/20 via-fd-background/60 to-fd-background" />
        {/* Subtle vignette to focus center content */}
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(120%_120%_at_50%_30%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.10)_40%,rgba(0,0,0,0.25)_70%,rgba(0,0,0,0.40)_100%)]" />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        {/* Hero Section */}
        <div className="mb-6 md:mb-8">
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
        <div className="mt-10 md:mt-16 hidden md:grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="mb-4 text-3xl"><Emoji name="brain" width={36} className="inline-block align-[-2px]" /></div>
            <h3 className="mb-2 text-lg font-semibold text-fd-foreground">Systems Thinking</h3>
            <p className="text-sm text-fd-muted-foreground">
              Understand the why behind webhook patterns and state management
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4 text-3xl"><Emoji name="robot" width={36} className="inline-block align-[-2px]" /></div>
            <h3 className="mb-2 text-lg font-semibold text-fd-foreground">AI-Friendly</h3>
            <p className="text-sm text-fd-muted-foreground">
              Clean, documented patterns perfect for AI-assisted development
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4 text-3xl"><Emoji name="high-voltage" width={36} className="inline-block align-[-2px]" /></div>
            <h3 className="mb-2 text-lg font-semibold text-fd-foreground">Ship Fast</h3>
            <p className="text-sm text-fd-muted-foreground">
              Copy-paste patterns that work. No fluff, just working code.
            </p>
          </div>
        </div>
      </div>

      {/* Footnote */}
      <div className="absolute inset-x-0 bottom-6 md:bottom-8 flex justify-center">
        <p className="inline-flex items-center gap-1 text-sm md:text-base text-fd-muted-foreground/80 whitespace-nowrap">
          made with
          <Emoji name="red-heart" width={16} className="inline-block align-[-2px]" />
          by
          <a
            href="https://x.com/mattppal"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline text-fd-foreground/90"
          >
            matt
          </a>
        </p>
      </div>
      </div>
    </EmojiProvider>
  );
}