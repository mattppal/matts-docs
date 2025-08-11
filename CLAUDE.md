# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `pnpm dev` (runs with Next.js Turbo mode)
- **Build**: `pnpm build` 
- **Start production**: `pnpm start`
- **MDX processing**: `pnpm postinstall` (runs fumadocs-mdx)

## Architecture Overview

This is a Next.js documentation site built with Fumadocs, featuring authentication, payment integration, and content gating capabilities.

### Core Components

- **Authentication**: Built with better-auth, supports email/password and Google OAuth
- **Database**: PostgreSQL with Drizzle ORM, includes user management, organizations, and activity logging
- **Content Management**: Fumadocs MDX for documentation, with auth-gated content support
- **Payment**: Stripe integration for subscriptions (schema present but commented out)

### Key Files

- `lib/source.ts`: Content source adapter with auth-aware page tree filtering
- `source.config.ts`: Extended frontmatter schema including `auth: boolean` for content gating
- `lib/auth.ts`: Authentication configuration with organization plugin
- `lib/db/schema.ts`: Database schema with user, organization, and activity tracking tables
- `app/layout.config.tsx`: Shared navigation and layout options

### Content Gating

The application supports content gating through:
- `auth: true` frontmatter property in MDX files restricts access to authenticated users
- `createAuthAwarePageTree()` filters navigation based on authentication status
- Cached session management for performance

### File Structure

- `app/(home)/`: Landing pages
- `app/docs/`: Documentation layout and pages with dynamic routing
- `app/api/`: API routes for auth, search, and Stripe webhooks
- `content/docs/`: MDX documentation files
- `lib/`: Core utilities, auth, database, and payment logic
- `components/ui/`: Reusable UI components with Radix UI and Tailwind

### Database Setup

Uses Drizzle migrations in `lib/db/migrations/`. Run database operations through the configured Drizzle connection in `lib/db/drizzle.ts`.