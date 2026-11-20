import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF where the browser accepts it, WebP otherwise. Both beat the
    // PNG and JPEG sources in `public/` by a wide margin.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
