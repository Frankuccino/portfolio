"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const HighlightContext = createContext<{ id: string; set: (id: string) => void }>({
  id: "",
  set: () => {},
});

export const useHighlight = () => useContext(HighlightContext);

/**
 * Spotlight highlighting for the foundation pages.
 *
 * The highlight arrives as `?highlight=<id>` from the coverage gauge, or is set
 * in page by a category control. It is read from `window.location.search` in an
 * effect rather than through `useSearchParams`, because a server `searchParams`
 * prop would flip these routes from static to dynamic; reading it client-side
 * keeps them prerendered.
 *
 * Items opt in with `data-hl-item`. Whatever does not match is dimmed rather
 * than removed, so the shape of the track stays visible while the match reads
 * at full strength.
 */
export default function Highlight({ children }: { children: ReactNode }) {
  const [id, setId] = useState("");

  useEffect(() => {
    // Syncing React state with an external system: the URL bar. The coverage
    // gauge links here with `?highlight=<id>`, and reading it during render
    // would either mismatch hydration or flip the route to dynamic.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setId(new URLSearchParams(window.location.search).get("highlight") ?? "");
  }, []);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>("[data-hl-item]").forEach((el) => {
      const dim = id !== "" && el.dataset.hlItem !== id;
      el.dataset.dim = dim ? "true" : "false";
      // Set inline rather than relying on an attribute selector: the rule was
      // demonstrably not reaching the paper rows, and an inline value cannot be
      // outranked by whatever was winning there.
      el.style.opacity = dim ? "0.3" : "";
    });
  }, [id]);

  // Bring the first match into view. This also serves the in page control, where
  // the user has just named the category they want to look at.
  useEffect(() => {
    if (!id) return;
    document
      .querySelector(`[data-hl-item="${id}"]`)
      ?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [id]);

  const set = (next: string) => {
    setId(next);
    const url = new URL(window.location.href);
    if (next) url.searchParams.set("highlight", next);
    else url.searchParams.delete("highlight");
    window.history.replaceState(null, "", url);
  };

  return (
    <HighlightContext.Provider value={{ id, set }}>
      {children}
    </HighlightContext.Provider>
  );
}
