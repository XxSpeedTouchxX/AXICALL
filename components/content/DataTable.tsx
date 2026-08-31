interface DataTableProps {
  headers: string[];
  rows: string[][];
  /** Highlights a column (0-based) — used to make the recommended option stand out. */
  highlightColumn?: number;
  caption?: string;
}

/** Comparison table used across the pillar pages. Scrolls horizontally on mobile. */
export function DataTable({ headers, rows, highlightColumn, caption }: DataTableProps) {
  return (
    <div className="my-8 overflow-x-auto border border-line">
      <table className="w-full min-w-[520px] border-collapse text-left text-[0.95rem]">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={h}
                scope="col"
                className={`border-b-2 border-line px-4 py-3 font-bold tracking-tight text-ink ${
                  i === highlightColumn ? "bg-accent/10" : "bg-paper/60"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={`border-b border-line px-4 py-3 align-top ${
                    i === 0 ? "font-semibold text-ink" : "text-muted"
                  } ${i === highlightColumn ? "bg-accent/[0.06]" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
