import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { GrainGradient } from "@paper-design/shaders-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Absolute URLs in the metadata need a base. Set NEXT_PUBLIC_SITE_URL in
 * production; local falls back to the dev server so previews still resolve.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Frank Angelo Malubag — Software & AI Engineer",
  description:
    "Backend-focused software engineer and DataCamp-certified AI Engineer Associate building full-stack systems, distributed backends, and applied LLM applications.",
  keywords: [
    "Frank Angelo Malubag",
    "Software Engineer",
    "AI Engineer",
    "Full-Stack",
    "Node.js",
    "TypeScript",
    "RAG",
    "LLM",
  ],
  openGraph: {
    title: "Frank Angelo Malubag — Software & AI Engineer",
    description:
      "Backend architecture, distributed systems, and applied LLM engineering.",
    type: "website",
    url: siteUrl,
    siteName: "Frank Angelo Malubag",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Frank Angelo A. Malubag — Software & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frank Angelo Malubag — Software & AI Engineer",
    description:
      "Backend architecture, distributed systems, and applied LLM engineering.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-4SB47FY02C"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4SB47FY02C');
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <GrainGradient
          className="fixed inset-0 w-full h-full object-cover pointer-events-none -z-10"
          colors={["#3e6274"]}
          colorBack="#0e0d16"
          softness={1}
          intensity={1}
          noise={1}
          shape="corners"
          speed={0}
          scale={0.88}
          rotation={88}
        />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
