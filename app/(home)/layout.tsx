import type { ReactNode } from 'react';
import { HomeLayout } from '@/components/layout/home';
import { baseOptions } from '@/app/layout.config';

export default function Layout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return <HomeLayout {...baseOptions} className="pt-0">{children}</HomeLayout>;
}