import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ShaderBackground from "./components/ShaderBackground";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
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
 * Display face, currently used by the display-scale headings via the
 * `font-display` utility in globals.css. Kept separate from the body font on
 * purpose: a heading that shares the body face reads as a headline, not as the
 * site's voice.
 */
const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["800"],
});

/**
 * Google Search Console verification token. Set
 * NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION once the property is verified; the tag
 * is omitted entirely while it is unset so a half-configured build never
 * ships a stale token.
 */
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

/**
 * Impact site verification. The vendor's tag carries the token in `value=`,
 * which the metadata API cannot emit (`other` only writes `content=`), so it is
 * rendered as a real meta tag in the head instead. Verification tokens are
 * published in the page source by design, like Google's.
 */
const impactVerification = process.env.NEXT_PUBLIC_IMPACT_SITE_VERIFICATION;

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
  image: `${siteUrl}/og-image.jpg`,
  jobTitle: "Software & AI Engineer",
  description: "Backend engineer and DataCamp-certified AI Engineer Associate.",
  email: "mailto:frank@fuiss.com",
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
  title: "Frank Angelo Malubag · Software & AI Engineer",
  description:
    "Backend-focused software engineer and DataCamp-certified AI Engineer Associate building distributed backends and applied LLM applications.",
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
    title: "Frank Angelo Malubag · Software & AI Engineer",
    description:
      "Backend architecture, distributed systems, and applied AI engineering.",
    type: "website",
    url: siteUrl,
    siteName: "Frank Angelo Malubag",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frank Angelo Malubag · Software & AI Engineer",
    description:
      "Backend architecture, distributed systems, and applied AI engineering.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
    >
      <head>
        {/* Person entity: connects this site to the same person on GitHub and LinkedIn */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
        />
        {/* Impact site verification: crawler-read, so anywhere in the head. Kept
            out of the metadata API because the vendor's tag uses `value=`. */}
        {impactVerification ? (
          <meta name="impact-site-verification" value={impactVerification} />
        ) : null}
      </head>
      <body className="min-h-full flex flex-col">
      {/* First focusable thing on the page, so a keyboard user can jump
          past the fixed nav. Hidden until focused. */}
      <a href="#main" className="skip-link">
        Skip to content
      </a>
        <ShaderBackground
          className="fixed inset-0 w-full h-full object-cover pointer-events-none -z-10"
          colors={["#3e6274"]}
          colorBack="#0e0d16"
          softness={1}
          intensity={0.45}
          noise={0.35}
          shape="corners"
          speed={0}
          scale={0.88}
          rotation={88}
        />
        <Navbar />
        <ScrollProgress />
        <div id="main" className="flex-1">
          {children}
        </div>
        <Footer />
        {/* Vercel Web Analytics: cookie-less and IP-anonymised, so no consent
            banner, and a no-op outside production. The dashboard must have Web
            Analytics enabled for the project before any data lands. */}
        <Analytics />
        {/* Real-user Core Web Vitals, from the same privacy posture. Free tier
            reports a subset of the vitals; Plus unlocks all of them. */}
        <SpeedInsights />
      </body>
    </html>
  );
}
