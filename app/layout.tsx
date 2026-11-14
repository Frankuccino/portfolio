import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { GrainGradient } from "@paper-design/shaders-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ogImage } from "./lib/ogImage";
import { siteUrl } from "./lib/siteUrl";
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
 * Google Search Console verification token. Set
 * NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION once the property is verified; the tag
 * is omitted entirely while it is unset so a half-configured build never
 * ships a stale token.
 */
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

/**
 * Structured data tying this site to one person across the web. The `sameAs`
 * links are the point: they let a search engine connect the site, the GitHub
 * profile, and the LinkedIn profile as the same entity.
 */
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: "Frank Angelo A. Malubag",
  url: siteUrl,
  image: `${siteUrl}/og-image.png`,
  jobTitle: "Software & AI Engineer",
  description:
    "Backend-focused software engineer and DataCamp-certified AI Engineer Associate building full-stack systems, distributed backends, and applied LLM applications.",
  email: "mailto:frankamalubag@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dumaguete City",
    addressCountry: "PH",
  },
  sameAs: [
    "https://github.com/Frankuccino",
    "https://www.linkedin.com/in/frank-angelo-malubag/",
  ],
  knowsAbout: [
    "Backend engineering",
    "Distributed systems",
    "Applied AI engineering",
    "LLM systems",
    "Node.js",
    "TypeScript",
    "React",
  ],
};

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
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frank Angelo Malubag — Software & AI Engineer",
    description:
      "Backend architecture, distributed systems, and applied LLM engineering.",
    images: [ogImage.url],
  },
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
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
        {/* Person entity: connects this site to the same person on GitHub and LinkedIn */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
        />
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
