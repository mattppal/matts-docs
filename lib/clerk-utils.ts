/**
 * Utility functions for optimizing Clerk profile images
 * Based on https://clerk.com/docs/guides/image-optimization
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number; // 1-100, default 85
  fit?: 'scale-down' | 'crop';
}

/**
 * Optimizes a Clerk profile image URL with the specified parameters
 * @param imageUrl The original Clerk image URL
 * @param options Optimization options
 * @returns Optimized image URL
 */
export function optimizeClerkImage(
  imageUrl: string,
  options: ImageOptimizationOptions = {}
): string {
  if (!imageUrl) return imageUrl;

  const params = new URLSearchParams();
  
  if (options.width) {
    params.set('width', options.width.toString());
  }
  
  if (options.height) {
    params.set('height', options.height.toString());
  }
  
  if (options.quality) {
    params.set('quality', Math.min(100, Math.max(1, options.quality)).toString());
  }
  
  if (options.fit) {
    params.set('fit', options.fit);
  }

  const paramString = params.toString();
  if (!paramString) return imageUrl;
  
  return `${imageUrl}?${paramString}`;
}

/**
 * Common presets for different image sizes
 */
export const ClerkImagePresets = {
  /** Small avatar (32x32) optimized for navigation */
  navAvatar: { width: 32, height: 32, fit: 'crop' as const, quality: 90 },
  
  /** Medium avatar (64x64) optimized for cards */
  cardAvatar: { width: 64, height: 64, fit: 'crop' as const, quality: 90 },
  
  /** Large avatar (128x128) optimized for profile pages */
  profileAvatar: { width: 128, height: 128, fit: 'crop' as const, quality: 95 },
} as const;