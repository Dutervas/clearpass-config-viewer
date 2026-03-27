interface DataTableProps {
  columns: string[];
  rows: Record<string, string>[];
  emptyMessage?: string;
}

export function DataTable({ columns, rows, emptyMessage = "None" }: DataTableProps) {
  if (rows.length === 0) {
    return <p className="text-muted-foreground italic py-4">{emptyMessage}</p>;
  }
  return (
    <div className="overflow-x-auto rounded border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-table-header">
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-2.5 text-left font-semibold text-secondary-foreground border-b border-border"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 1 ? "bg-table-row-alt" : "bg-card"}
            >
              {columns.map((col) => (
                <td
                  key={col}
                  className="px-4 py-2 border-b border-border text-foreground"
                >
                  {row[col] || "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
