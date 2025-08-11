import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ClerkAuthLink } from '@/components/mdx/clerk-auth-link';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    // Intercept /sign-in and /sign-up links in MDX and open Clerk modals
    a: ClerkAuthLink as any,
    ...components,
  };
}
