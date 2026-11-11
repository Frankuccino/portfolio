import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
      "Backend-focused software engineer and DataCamp-certified AI Engineer Associate.",
    type: "website",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
