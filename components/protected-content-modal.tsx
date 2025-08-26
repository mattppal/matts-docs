'use client';

import { ProtectedContentGate } from './protected-content-gate';
import { ProtectedContentPlaceholder } from './protected-content-placeholder';

interface ProtectedContentModalProps {
  slug: string;
  showBlur?: boolean;
}

export function ProtectedContentModal({ slug }: ProtectedContentModalProps) {
    return (
      <div className="relative">
        <div className="blur-lg pointer-events-none select-none">
          <ProtectedContentPlaceholder />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-fd-card border border-fd-border rounded-xl shadow-xl max-w-md w-full mx-auto">
            {/* Header */}
            <div className="p-8 text-center">
              <div className="mx-auto bg-fd-muted rounded-full flex items-center justify-center">
                <span className="text-6xl">🤠</span>
              </div>
              
              <h2 className="text-2xl font-bold text-fd-foreground">
                Howdy partner!
              </h2>
              
              <p className="text-fd-muted-foreground leading-relaxed">
                Please sign in or create an account to continue reading (it's free!)
              </p>
            </div>

            {/* Action */}
            <div className="px-8 pb-8">
              <ProtectedContentGate slug={slug} />
            </div>

          </div>
        </div>
      </div>
    );
  }