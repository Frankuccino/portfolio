import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF where the browser accepts it, WebP otherwise. Both beat the
    // PNG and JPEG sources in `public/` by a wide margin.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // The hub was `/reading` until the third track (research writing) made the
      // name too small, and it became `/foundation` when the credential plan took
      // the shorter `/plan`. Both old addresses still resolve, so inbound links
      // keep working and the search equity passes.
      {
        source: "/reading",
        destination: "/foundation",
        permanent: true,
      },
      {
        source: "/next/:slug/:course/:module",
        destination: "/plan/:slug/:course/:module",
        permanent: true,
      },
      {
        source: "/next/:slug/:course",
        destination: "/plan/:slug/:course",
        permanent: true,
      },
      {
        source: "/next/:slug",
        destination: "/plan/:slug",
        permanent: true,
      },
      {
        source: "/next",
        destination: "/plan",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
