import type { ReactNode } from 'react';
import { HomeLayout } from '@/components/layout/home';
import { baseOptions } from '@/app/layout.config';
import og from '@/public/og.png';

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'stripe saas mini-masterclass',
  description: 'Systems-focused deep dive into subscription billing that actually works. For developers who understand good architecture and build with AI tools.',
}

export default function Layout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return <HomeLayout {...baseOptions} className="pt-0">{children}</HomeLayout>;
}