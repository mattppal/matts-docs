import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { createAuthAwarePageTree } from '@/lib/source';

export const dynamic = 'force-dynamic';

export default async function Layout({ children }: { children: ReactNode }) {
  const pageTree = await createAuthAwarePageTree();
  
  return (
    <DocsLayout 
      tree={pageTree} 
      {...baseOptions}
      nav={{
        ...baseOptions.nav,
      }}
    >
      {children}
    </DocsLayout>
  );
}
