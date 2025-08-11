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
            <DocsBody>
              <ProtectedContentGate slug={params.slug?.join('/') || ''} />
            </DocsBody>
          </DocsPage>
        );
      }
    } catch (error) {
      console.error('Error checking session:', error);
      // If there's an error checking the session, show the login screen
      return (
        <DocsPage toc={[]} full={page.data.full}>
          <DocsBody>
            <ProtectedContentGate slug={params.slug?.join('/') || ''} />
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
