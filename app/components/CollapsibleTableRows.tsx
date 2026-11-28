"use client";

import { Fragment, useState, type ReactNode } from "react";

/**
 * Renders overflow table rows inside the same table body. Keeping the header in
 * one table avoids the duplicate-header accordion that made long tables read as
 * two different tables.
 */
export default function CollapsibleTableRows({
  rows,
  colSpan,
}: {
  rows: ReactNode[];
  colSpan: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? rows : null}
      <tr className="border-t border-slate-800/60">
        <td colSpan={colSpan} className="px-3 py-2">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="text-[11px] text-[#7fb0c2] transition-colors hover:text-white"
          >
            {open ? `Hide ${rows.length} ${rows.length === 1 ? "row" : "rows"} ↑` : `Show ${rows.length} more ${rows.length === 1 ? "row" : "rows"} ↓`}
          </button>
        </td>
      </tr>
    </>
  );
}
