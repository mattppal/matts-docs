import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Disable service worker registration to prevent 404s
  experimental: {
    webpackBuildWorker: true
  }
};

export default withMDX(config);
