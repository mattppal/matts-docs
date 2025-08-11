import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { auth } from '@/lib/auth';
import { unstable_noStore as noStore } from 'next/cache';

// Important: Do not cache auth state across requests
// This function runs per-request and should not be memoized

// Create base source
export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});

// Function to create auth-aware page tree with disabled protected pages
export async function createAuthAwarePageTree() {
  // Ensure this computation is not cached by Next.js
  noStore();
  const { userId } = await auth();
  const isAuthenticated = !!userId;
  
  // Modify page tree to mark protected pages for styling
  const modifyPageTree = (tree: any): any => {
    if (!tree.children) return tree;
    
    const modifiedChildren = tree.children.map((item: any) => {
      if (item.type === 'page') {
        const page = source.getPage(item.url.split('/').slice(2));
        const isProtected = page?.data.auth;
        
        if (isProtected && !isAuthenticated) {
          return {
            ...item,
            name: `🔒 ${item.name}`,
            // Keep the original URL - the modal will handle auth
          };
        }
        return item;
      }
      
      if (item.type === 'folder' && item.children) {
        return {
          ...item,
          children: modifyPageTree(item).children,
        };
      }
      
      return item;
    });
    
    return {
      ...tree,
      children: modifiedChildren,
    };
  };
  
  return modifyPageTree(source.pageTree);
}