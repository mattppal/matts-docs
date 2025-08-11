import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/mdx-components';
import { auth } from '@/lib/auth';
import { ProtectedContentGate } from '@/components/protected-content-gate';
import { ProtectedContentPlaceholder } from '@/components/protected-content-placeholder';

export const dynamic = 'force-dynamic';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  // Check if page requires authentication
  if (page.data.auth) {
    try {
      const authResult = await auth();
      const isAuthenticated = !!authResult.userId;

      if (!isAuthenticated) {
        return (
          <DocsPage toc={[]} full={page.data.full}>
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription>{page.data.description}</DocsDescription>
            <DocsBody>
              <div className="relative">
                <div className="blur-lg pointer-events-none select-none">
                  <ProtectedContentPlaceholder />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-fd-card p-6 rounded-lg border shadow-lg max-w-sm text-center">
                    <h3 className="text-lg font-semibold mb-2">Login</h3>
                    <p className="text-sm text-fd-muted-foreground mb-4">Sign in to view this page</p>
                    <ProtectedContentGate slug={params.slug?.join('/') || ''} />
                  </div>
                </div>
              </div>
            </DocsBody>
          </DocsPage>
        );
      }
    } catch (error) {
      console.error('Error checking session:', error);
      
      return (
        <DocsPage toc={[]} full={page.data.full}>
          <DocsTitle>{page.data.title}</DocsTitle>
          <DocsDescription>{page.data.description}</DocsDescription>
          <DocsBody>
            <div className="relative">
              <div className="blur-sm pointer-events-none select-none">
                <ProtectedContentPlaceholder />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent from-0% via-fd-background/20 via-40% to-fd-background to-80% flex items-center justify-center">
                <div className="bg-fd-card p-6 rounded-lg border shadow-lg max-w-sm text-center">
                  <h3 className="text-lg font-semibold mb-2">🔒 Protected Content</h3>
                  <p className="text-sm text-fd-muted-foreground mb-4">Sign in to view this page</p>
                  <ProtectedContentGate slug={params.slug?.join('/') || ''} />
                </div>
              </div>
            </div>
          </DocsBody>
        </DocsPage>
      );
    }
  }

  const MDXContent = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
