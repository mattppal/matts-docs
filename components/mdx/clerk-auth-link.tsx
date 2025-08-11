'use client';

import React from 'react';
import Link from 'next/link';
import { useClerk } from '@clerk/nextjs';

export function ClerkAuthLink(props: React.ComponentProps<'a'> & { href?: string }) {
  const { href = '', onClick, children, ...rest } = props as any;
  const clerk = useClerk();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof onClick === 'function') {
      onClick(event);
    }
    if (event.defaultPrevented) return;

    if (typeof href === 'string') {
      if (href === '/sign-in') {
        event.preventDefault();
        clerk.openSignIn();
        return;
      }
      if (href === '/sign-up' || href === '/register') {
        event.preventDefault();
        clerk.openSignUp();
        return;
      }
    }
  };

  return (
    <Link href={href || '#'} onClick={handleClick} {...(rest as any)}>
      {children}
    </Link>
  );
}
