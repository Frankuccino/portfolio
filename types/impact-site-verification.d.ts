import type { HTMLAttributes } from "react";

/**
 * Impact's site-verification tag carries its token in `value`, not the `content`
 * that Next's metadata API emits for `other`. React's meta prop types do not
 * include it, so it is declared here once instead of being cast at the call site
 * in the layout.
 */
declare module "react" {
  interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string;
  }
}
