import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T, index: number) => React.ReactNode;
  align?: "left" | "right" | "center";
  mono?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  rowKey: (row: T) => string;
  "data-ocid"?: string;
}

export function DataTable<T>({
  columns,
  data,
  loading = false,
  emptyMessage = "No data available",
  className,
  rowKey,
  "data-ocid": dataOcid,
}: DataTableProps<T>) {
  return (
    <div
      data-ocid={dataOcid}
      className={cn(
        "rounded-lg border border-border/60 overflow-hidden",
        className,
      )}
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30 border-border/60">
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={cn(
                  "text-xs font-medium uppercase tracking-wider text-muted-foreground py-3",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center",
                )}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows have no meaningful key
              <TableRow key={`skeleton-${i}`} className="border-border/40">
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center text-muted-foreground py-12 text-sm"
                data-ocid={`${dataOcid}.empty_state`}
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow
                key={rowKey(row)}
                className="border-border/40 hover:bg-muted/20 transition-colors"
                data-ocid={`${dataOcid}.item.${index + 1}`}
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    className={cn(
                      "py-3 text-sm",
                      col.align === "right" && "text-right",
                      col.align === "center" && "text-center",
                      col.mono && "font-mono",
                    )}
                  >
                    {col.render(row, index)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
