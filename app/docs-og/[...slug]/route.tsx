// import * as fs from 'node:fs/promises';
// import { generateOGImage } from '@/app/docs-og/[...slug]/og';
import { generateOGImage } from 'fumadocs-ui/og';
import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { getFonts } from "@/lib/load-google-font";

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<'/docs-og/[...slug]'>,
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return generateOGImage({
    primaryTextColor: 'rgb(240,240,240)',
    title: page.data.title,
    description: page.data.description,
    fonts: await getFonts(),
  });
}