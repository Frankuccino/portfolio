"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type BackTarget = { label: string; href: string };

function Anchor({ target }: { target: BackTarget }) {
  return (
    <Link
      href={target.href}
      className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
    >
      ← Back to {target.label}
    </Link>
  );
}

function Resolved({ fallback }: { fallback: BackTarget }) {
  const from = useSearchParams().get("from");
  const target =
    from === "plan" ? { label: "the plan", href: "/plan" } : fallback;
  return <Anchor target={target} />;
}

/**
 * The back link on the takeaways page.
 *
 * Where you came from travels in the URL, because an in-app click is a
 * client-side navigation: `document.referrer` still holds whatever referred the
 * original document load, and the App Router keeps no navigation index to read
 * instead. Reading it here rather than on the server is what keeps the page
 * statically prerendered; the Suspense fallback is the track page, which is the
 * right answer for every other origin.
 */
export default function TakeawayBackLink({ fallback }: { fallback: BackTarget }) {
  return (
    <Suspense fallback={<Anchor target={fallback} />}>
      <Resolved fallback={fallback} />
    </Suspense>
  );
}
