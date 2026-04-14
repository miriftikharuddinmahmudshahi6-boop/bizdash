import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { DollarSign, PlusCircle, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { type Column, DataTable } from "../components/DataTable";
import { KPICard } from "../components/KPICard";
import { StatusBadge } from "../components/StatusBadge";
import {
  TransactionCategory,
  TransactionStatus,
  useAddTransaction,
  useRevenueAggregates,
  useTransactions,
} from "../hooks/useBackend";
import type { Transaction } from "../types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(n: bigint): string {
  const num = Number(n) / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
}

function formatCurrencyNum(n: bigint): string {
  return formatCurrency(n);
}

function formatTs(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(ms));
}

// ─── Category Badge ────────────────────────────────────────────────────────────

const categoryStyles: Record<
  TransactionCategory,
  { label: string; style: React.CSSProperties }
> = {
  [TransactionCategory.sales]: {
    label: "Sales",
    style: {
      background: "oklch(0.45 0.18 250 / 0.15)",
      color: "oklch(0.72 0.18 250)",
      border: "transparent",
    },
  },
  [TransactionCategory.subscription]: {
    label: "Subscription",
    style: {
      background: "oklch(0.45 0.22 300 / 0.15)",
      color: "oklch(0.72 0.22 300)",
      border: "transparent",
    },
  },
  [TransactionCategory.service]: {
    label: "Service",
    style: {
      background: "oklch(0.45 0.16 190 / 0.15)",
      color: "oklch(0.72 0.16 190)",
      border: "transparent",
    },
  },
  [TransactionCategory.other]: {
    label: "Other",
    style: {},
  },
};

function CategoryBadge({ category }: { category: TransactionCategory }) {
  const config = categoryStyles[category];
  const isOther = category === TransactionCategory.other;
  return (
    <Badge
      data-ocid={`category_badge.${category}`}
      className={cn(
        "font-mono text-xs tracking-wide border-transparent",
        isOther && "bg-muted text-muted-foreground",
      )}
      style={isOther ? undefined : config.style}
    >
      {config.label}
    </Badge>
  );
}

// ─── Chart tooltip ─────────────────────────────────────────────────────────────

interface TooltipPayload {
  value: number;
  name: string;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-card px-3 py-2 shadow-elevated text-xs">
      <p className="text-muted-foreground mb-1 font-medium">{label}</p>
      <p className="font-mono text-foreground">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(payload[0].value)}
      </p>
    </div>
  );
}

// ─── Revenue Comparison Chart ──────────────────────────────────────────────────

function RevenueBarChart({
  today,
  yesterday,
  loading,
}: {
  today: bigint;
  yesterday: bigint;
  loading: boolean;
}) {
  const chartData = [
    {
      label: "Yesterday",
      value: Number(yesterday) / 100,
      fill: "oklch(0.55 0.02 0)",
    },
    {
      label: "Today",
      value: Number(today) / 100,
      fill: "oklch(0.72 0.22 45)",
    },
  ];

  return (
    <Card
      className="border-border/60 shadow-card"
      data-ocid="revenue.comparison_chart.card"
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Today vs Yesterday
        </CardTitle>
        <div className="flex items-end gap-3 mt-1">
          {loading ? (
            <Skeleton className="h-7 w-40" />
          ) : (
            <>
              <span className="font-mono text-xl font-semibold text-accent">
                {formatCurrencyNum(today)}
              </span>
              <span className="text-xs text-muted-foreground mb-0.5 font-mono">
                today
              </span>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        {loading ? (
          <Skeleton className="h-36 w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={144}>
            <BarChart
              data={chartData}
              barCategoryGap="40%"
              margin={{ top: 4, right: 8, bottom: 0, left: 8 }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="4 4"
                stroke="oklch(0.26 0 0)"
                opacity={0.5}
              />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "oklch(0.6 0 0)" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "oklch(0.6 0 0)" }}
                tickFormatter={(v: number) =>
                  new Intl.NumberFormat("en-US", {
                    notation: "compact",
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(v)
                }
                width={56}
              />
              <Tooltip
                content={<ChartTooltip />}
                cursor={{ fill: "oklch(0.26 0 0 / 0.4)" }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={64}>
                {chartData.map((entry) => (
                  <Cell key={entry.label} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Table columns ─────────────────────────────────────────────────────────────

const txColumns: Column<Transaction>[] = [
  {
    key: "id",
    header: "ID",
    mono: true,
    render: (row) => (
      <span className="text-muted-foreground text-xs font-mono">
        #{row.id.toString()}
      </span>
    ),
  },
  {
    key: "description",
    header: "Description",
    render: (row) => (
      <span className="max-w-[240px] truncate block text-sm text-foreground">
        {row.description}
      </span>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    mono: true,
    render: (row) => (
      <span className="text-accent font-mono font-semibold tabular-nums">
        {formatCurrency(row.amount)}
      </span>
    ),
  },
  {
    key: "category",
    header: "Category",
    render: (row) => (
      <CategoryBadge category={row.category as TransactionCategory} />
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: "date",
    header: "Date",
    align: "right",
    render: (row) => (
      <span className="text-muted-foreground text-xs font-mono tabular-nums">
        {formatTs(row.date)}
      </span>
    ),
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 25n;

const CATEGORY_OPTIONS = Object.values(TransactionCategory);
const STATUS_OPTIONS = Object.values(TransactionStatus);

export default function RevenuePage() {
  const [page, setPage] = useState(0n);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({
    amount: "",
    category: TransactionCategory.sales,
    status: TransactionStatus.completed,
    description: "",
  });

  const { data: agg, isLoading: aggLoading } = useRevenueAggregates();
  const { data: txPage, isLoading: txLoading } = useTransactions(
    page * PAGE_SIZE,
    PAGE_SIZE,
  );
  const addTx = useAddTransaction();

  const totalPages = txPage
    ? Math.ceil(Number(txPage.total) / Number(PAGE_SIZE))
    : 1;

  const weeklyGrowth =
    agg && Number(agg.revenueYesterday) > 0
      ? ((Number(agg.revenueThisWeek) / 7 - Number(agg.revenueYesterday)) /
          Number(agg.revenueYesterday)) *
        100
      : 0;

  async function handleAddTx(e: React.FormEvent) {
    e.preventDefault();
    const amountCents = Math.round(Number.parseFloat(form.amount) * 100);
    if (Number.isNaN(amountCents) || amountCents <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    try {
      await addTx.mutateAsync({
        amount: BigInt(amountCents),
        category: form.category,
        status: form.status,
        description: form.description,
      });
      toast.success("Transaction added");
      setAddOpen(false);
      setForm({
        amount: "",
        category: TransactionCategory.sales,
        status: TransactionStatus.completed,
        description: "",
      });
    } catch {
      toast.error("Failed to add transaction");
    }
  }

  return (
    <div data-ocid="revenue.page" className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground tracking-tight">
            Revenue
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Track and manage all transactions
          </p>
        </div>
        <Button
          data-ocid="revenue.add_transaction.open_modal_button"
          onClick={() => setAddOpen(true)}
          className="gap-2"
        >
          <PlusCircle className="size-4" />
          Add Transaction
        </Button>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          data-ocid="kpi.total_revenue.card"
          title="Total Revenue"
          value={agg ? formatCurrency(agg.totalRevenue) : "—"}
          icon={DollarSign}
          accent
          loading={aggLoading}
        />
        <KPICard
          data-ocid="kpi.this_week.card"
          title="This Week"
          value={agg ? formatCurrency(agg.revenueThisWeek) : "—"}
          trend={weeklyGrowth}
          icon={TrendingUp}
          loading={aggLoading}
        />
        <KPICard
          data-ocid="kpi.today.card"
          title="Today"
          value={agg ? formatCurrency(agg.revenueToday) : "—"}
          icon={TrendingUp}
          loading={aggLoading}
        />
        <KPICard
          data-ocid="kpi.yesterday.card"
          title="Yesterday"
          value={agg ? formatCurrency(agg.revenueYesterday) : "—"}
          icon={TrendingDown}
          loading={aggLoading}
        />
      </div>

      {/* Chart + quick stats row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RevenueBarChart
            today={agg?.revenueToday ?? 0n}
            yesterday={agg?.revenueYesterday ?? 0n}
            loading={aggLoading}
          />
        </div>
        <Card
          className="border-border/60 shadow-card"
          data-ocid="revenue.breakdown.card"
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Period Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aggLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                <div key={i} className="space-y-1">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-6 w-32" />
                </div>
              ))
            ) : (
              <>
                <ComparisonRow
                  label="Today"
                  value={agg?.revenueToday ?? 0n}
                  compare={agg?.revenueYesterday ?? 0n}
                  compareTo="vs yesterday"
                />
                <div className="border-t border-border/40" />
                <ComparisonRow
                  label="This Week"
                  value={agg?.revenueThisWeek ?? 0n}
                  compareTo=""
                />
                <div className="border-t border-border/40" />
                <ComparisonRow
                  label="Total"
                  value={agg?.totalRevenue ?? 0n}
                  compareTo=""
                  highlight
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Transaction table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-foreground">
            All Transactions
          </h2>
          {txPage && (
            <span className="text-xs text-muted-foreground font-mono tabular-nums">
              {txPage.total.toString()} total
            </span>
          )}
        </div>
        <DataTable
          data-ocid="revenue.transactions_table"
          columns={txColumns}
          data={txPage?.items ?? []}
          loading={txLoading}
          emptyMessage="No transactions found. Add your first transaction to get started."
          rowKey={(row) => row.id.toString()}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-muted-foreground font-mono tabular-nums">
              Page {Number(page) + 1} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                data-ocid="revenue.pagination_prev"
                onClick={() => setPage((p) => (p > 0n ? p - 1n : 0n))}
                disabled={page === 0n}
              >
                Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                data-ocid="revenue.pagination_next"
                onClick={() =>
                  setPage((p) => (Number(p) < totalPages - 1 ? p + 1n : p))
                }
                disabled={Number(page) >= totalPages - 1}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Add Transaction modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent
          data-ocid="revenue.add_transaction.dialog"
          className="sm:max-w-md"
        >
          <DialogHeader>
            <DialogTitle className="font-display">Add Transaction</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddTx} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="tx-amount">Amount (USD)</Label>
              <Input
                id="tx-amount"
                data-ocid="revenue.add_transaction.amount.input"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) =>
                  setForm((f) => ({ ...f, amount: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tx-desc">Description</Label>
              <Input
                id="tx-desc"
                data-ocid="revenue.add_transaction.description.input"
                placeholder="Invoice #1234, Subscription renewal..."
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) =>
                    setForm((f) => ({
                      ...f,
                      category: v as TransactionCategory,
                    }))
                  }
                >
                  <SelectTrigger data-ocid="revenue.add_transaction.category.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((c) => (
                      <SelectItem key={c} value={c} className="capitalize">
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, status: v as TransactionStatus }))
                  }
                >
                  <SelectTrigger data-ocid="revenue.add_transaction.status.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s} className="capitalize">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                data-ocid="revenue.add_transaction.cancel_button"
                onClick={() => setAddOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                data-ocid="revenue.add_transaction.submit_button"
                disabled={addTx.isPending}
              >
                {addTx.isPending ? "Adding..." : "Add Transaction"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Comparison Row helper ─────────────────────────────────────────────────────

function ComparisonRow({
  label,
  value,
  compare,
  compareTo,
  highlight = false,
}: {
  label: string;
  value: bigint;
  compare?: bigint;
  compareTo: string;
  highlight?: boolean;
}) {
  const delta =
    compare !== undefined && Number(compare) > 0
      ? ((Number(value) - Number(compare)) / Number(compare)) * 100
      : null;

  return (
    <div className="space-y-0.5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="flex items-baseline justify-between gap-2">
        <span
          className={cn(
            "font-mono text-sm font-semibold tabular-nums",
            highlight ? "text-accent" : "text-foreground",
          )}
        >
          {formatCurrency(value)}
        </span>
        {delta !== null && compareTo && (
          <span
            className="text-xs font-mono tabular-nums"
            style={{
              color:
                delta >= 0 ? "oklch(0.72 0.17 155)" : "oklch(0.65 0.22 25)",
            }}
          >
            {delta >= 0 ? "+" : ""}
            {delta.toFixed(1)}% {compareTo}
          </span>
        )}
      </div>
    </div>
  );
}
