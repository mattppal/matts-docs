import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { AuthNav } from '@/components/auth-nav';

/**
 * Shared layout configurations
 *
 * you can customize layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
import { BookIcon } from 'lucide-react';
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image src="/logo.png" alt="Logo" width={32} height={32} />
        Matt's Docs
      </>
    ),
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [{
    type: 'custom',
    children: <AuthNav />,
    secondary: false,
  }],
};
