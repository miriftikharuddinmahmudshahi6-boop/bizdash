import { r as reactExports, j as jsxRuntimeExports, B as Button, D as DollarSign, T as TrendingUp, S as Skeleton, a as cn } from "./index-C44CPS2R.js";
import { C as CirclePlus, D as DataTable, a as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, L as Label, I as Input, S as Select, e as SelectTrigger, f as SelectValue, g as SelectContent, h as SelectItem, i as DialogFooter, u as ue, j as StatusBadge, B as Badge } from "./StatusBadge-DP7aFNAo.js";
import { K as KPICard, b as TrendingDown, c as Card, d as CardHeader, e as CardTitle, f as CardContent, R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar, g as Cell } from "./KPICard-DvHmH7vk.js";
import { T as TransactionStatus, c as TransactionCategory, b as useRevenueAggregates, d as useTransactions, e as useAddTransaction } from "./useBackend-CL3GtYM4.js";
function formatCurrency(n) {
  const num = Number(n) / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(num);
}
function formatCurrencyNum(n) {
  return formatCurrency(n);
}
function formatTs(ts) {
  const ms = Number(ts) / 1e6;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(ms));
}
const categoryStyles = {
  [TransactionCategory.sales]: {
    label: "Sales",
    style: {
      background: "oklch(0.45 0.18 250 / 0.15)",
      color: "oklch(0.72 0.18 250)",
      border: "transparent"
    }
  },
  [TransactionCategory.subscription]: {
    label: "Subscription",
    style: {
      background: "oklch(0.45 0.22 300 / 0.15)",
      color: "oklch(0.72 0.22 300)",
      border: "transparent"
    }
  },
  [TransactionCategory.service]: {
    label: "Service",
    style: {
      background: "oklch(0.45 0.16 190 / 0.15)",
      color: "oklch(0.72 0.16 190)",
      border: "transparent"
    }
  },
  [TransactionCategory.other]: {
    label: "Other",
    style: {}
  }
};
function CategoryBadge({ category }) {
  const config = categoryStyles[category];
  const isOther = category === TransactionCategory.other;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      "data-ocid": `category_badge.${category}`,
      className: cn(
        "font-mono text-xs tracking-wide border-transparent",
        isOther && "bg-muted text-muted-foreground"
      ),
      style: isOther ? void 0 : config.style,
      children: config.label
    }
  );
}
function ChartTooltip({
  active,
  payload,
  label
}) {
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/60 bg-card px-3 py-2 shadow-elevated text-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-1 font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-foreground", children: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(payload[0].value) })
  ] });
}
function RevenueBarChart({
  today,
  yesterday,
  loading
}) {
  const chartData = [
    {
      label: "Yesterday",
      value: Number(yesterday) / 100,
      fill: "oklch(0.55 0.02 0)"
    },
    {
      label: "Today",
      value: Number(today) / 100,
      fill: "oklch(0.72 0.22 45)"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "border-border/60 shadow-card",
      "data-ocid": "revenue.comparison_chart.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-medium uppercase tracking-widest text-muted-foreground", children: "Today vs Yesterday" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-3 mt-1", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-40" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xl font-semibold text-accent", children: formatCurrencyNum(today) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mb-0.5 font-mono", children: "today" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0 pb-4", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 144, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          BarChart,
          {
            data: chartData,
            barCategoryGap: "40%",
            margin: { top: 4, right: 8, bottom: 0, left: 8 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CartesianGrid,
                {
                  vertical: false,
                  strokeDasharray: "4 4",
                  stroke: "oklch(0.26 0 0)",
                  opacity: 0.5
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "label",
                  axisLine: false,
                  tickLine: false,
                  tick: { fontSize: 11, fill: "oklch(0.6 0 0)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  axisLine: false,
                  tickLine: false,
                  tick: { fontSize: 10, fill: "oklch(0.6 0 0)" },
                  tickFormatter: (v) => new Intl.NumberFormat("en-US", {
                    notation: "compact",
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0
                  }).format(v),
                  width: 56
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  content: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltip, {}),
                  cursor: { fill: "oklch(0.26 0 0 / 0.4)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "value", radius: [4, 4, 0, 0], maxBarSize: 64, children: chartData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.fill }, entry.label)) })
            ]
          }
        ) }) })
      ]
    }
  );
}
const txColumns = [
  {
    key: "id",
    header: "ID",
    mono: true,
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs font-mono", children: [
      "#",
      row.id.toString()
    ] })
  },
  {
    key: "description",
    header: "Description",
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[240px] truncate block text-sm text-foreground", children: row.description })
  },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    mono: true,
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-mono font-semibold tabular-nums", children: formatCurrency(row.amount) })
  },
  {
    key: "category",
    header: "Category",
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: row.category })
  },
  {
    key: "status",
    header: "Status",
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: row.status })
  },
  {
    key: "date",
    header: "Date",
    align: "right",
    render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-mono tabular-nums", children: formatTs(row.date) })
  }
];
const PAGE_SIZE = 25n;
const CATEGORY_OPTIONS = Object.values(TransactionCategory);
const STATUS_OPTIONS = Object.values(TransactionStatus);
function RevenuePage() {
  const [page, setPage] = reactExports.useState(0n);
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    amount: "",
    category: TransactionCategory.sales,
    status: TransactionStatus.completed,
    description: ""
  });
  const { data: agg, isLoading: aggLoading } = useRevenueAggregates();
  const { data: txPage, isLoading: txLoading } = useTransactions(
    page * PAGE_SIZE,
    PAGE_SIZE
  );
  const addTx = useAddTransaction();
  const totalPages = txPage ? Math.ceil(Number(txPage.total) / Number(PAGE_SIZE)) : 1;
  const weeklyGrowth = agg && Number(agg.revenueYesterday) > 0 ? (Number(agg.revenueThisWeek) / 7 - Number(agg.revenueYesterday)) / Number(agg.revenueYesterday) * 100 : 0;
  async function handleAddTx(e) {
    e.preventDefault();
    const amountCents = Math.round(Number.parseFloat(form.amount) * 100);
    if (Number.isNaN(amountCents) || amountCents <= 0) {
      ue.error("Enter a valid amount");
      return;
    }
    try {
      await addTx.mutateAsync({
        amount: BigInt(amountCents),
        category: form.category,
        status: form.status,
        description: form.description
      });
      ue.success("Transaction added");
      setAddOpen(false);
      setForm({
        amount: "",
        category: TransactionCategory.sales,
        status: TransactionStatus.completed,
        description: ""
      });
    } catch {
      ue.error("Failed to add transaction");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "revenue.page", className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold text-foreground tracking-tight", children: "Revenue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Track and manage all transactions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "revenue.add_transaction.open_modal_button",
          onClick: () => setAddOpen(true),
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "size-4" }),
            "Add Transaction"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          "data-ocid": "kpi.total_revenue.card",
          title: "Total Revenue",
          value: agg ? formatCurrency(agg.totalRevenue) : "—",
          icon: DollarSign,
          accent: true,
          loading: aggLoading
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          "data-ocid": "kpi.this_week.card",
          title: "This Week",
          value: agg ? formatCurrency(agg.revenueThisWeek) : "—",
          trend: weeklyGrowth,
          icon: TrendingUp,
          loading: aggLoading
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          "data-ocid": "kpi.today.card",
          title: "Today",
          value: agg ? formatCurrency(agg.revenueToday) : "—",
          icon: TrendingUp,
          loading: aggLoading
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          "data-ocid": "kpi.yesterday.card",
          title: "Yesterday",
          value: agg ? formatCurrency(agg.revenueYesterday) : "—",
          icon: TrendingDown,
          loading: aggLoading
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        RevenueBarChart,
        {
          today: (agg == null ? void 0 : agg.revenueToday) ?? 0n,
          yesterday: (agg == null ? void 0 : agg.revenueYesterday) ?? 0n,
          loading: aggLoading
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "border-border/60 shadow-card",
          "data-ocid": "revenue.breakdown.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-medium uppercase tracking-widest text-muted-foreground", children: "Period Comparison" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: aggLoading ? Array.from({ length: 3 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-32" })
              ] }, i)
            )) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ComparisonRow,
                {
                  label: "Today",
                  value: (agg == null ? void 0 : agg.revenueToday) ?? 0n,
                  compare: (agg == null ? void 0 : agg.revenueYesterday) ?? 0n,
                  compareTo: "vs yesterday"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ComparisonRow,
                {
                  label: "This Week",
                  value: (agg == null ? void 0 : agg.revenueThisWeek) ?? 0n,
                  compareTo: ""
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ComparisonRow,
                {
                  label: "Total",
                  value: (agg == null ? void 0 : agg.totalRevenue) ?? 0n,
                  compareTo: "",
                  highlight: true
                }
              )
            ] }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium text-foreground", children: "All Transactions" }),
        txPage && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono tabular-nums", children: [
          txPage.total.toString(),
          " total"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DataTable,
        {
          "data-ocid": "revenue.transactions_table",
          columns: txColumns,
          data: (txPage == null ? void 0 : txPage.items) ?? [],
          loading: txLoading,
          emptyMessage: "No transactions found. Add your first transaction to get started.",
          rowKey: (row) => row.id.toString()
        }
      ),
      totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono tabular-nums", children: [
          "Page ",
          Number(page) + 1,
          " of ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              "data-ocid": "revenue.pagination_prev",
              onClick: () => setPage((p) => p > 0n ? p - 1n : 0n),
              disabled: page === 0n,
              children: "Prev"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              "data-ocid": "revenue.pagination_next",
              onClick: () => setPage((p) => Number(p) < totalPages - 1 ? p + 1n : p),
              disabled: Number(page) >= totalPages - 1,
              children: "Next"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: addOpen, onOpenChange: setAddOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        "data-ocid": "revenue.add_transaction.dialog",
        className: "sm:max-w-md",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Add Transaction" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAddTx, className: "space-y-4 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tx-amount", children: "Amount (USD)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "tx-amount",
                  "data-ocid": "revenue.add_transaction.amount.input",
                  type: "number",
                  step: "0.01",
                  min: "0.01",
                  placeholder: "0.00",
                  value: form.amount,
                  onChange: (e) => setForm((f) => ({ ...f, amount: e.target.value })),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tx-desc", children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "tx-desc",
                  "data-ocid": "revenue.add_transaction.description.input",
                  placeholder: "Invoice #1234, Subscription renewal...",
                  value: form.description,
                  onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.category,
                    onValueChange: (v) => setForm((f) => ({
                      ...f,
                      category: v
                    })),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "revenue.add_transaction.category.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORY_OPTIONS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, className: "capitalize", children: c }, c)) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.status,
                    onValueChange: (v) => setForm((f) => ({ ...f, status: v })),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "revenue.add_transaction.status.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, className: "capitalize", children: s }, s)) })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  "data-ocid": "revenue.add_transaction.cancel_button",
                  onClick: () => setAddOpen(false),
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  "data-ocid": "revenue.add_transaction.submit_button",
                  disabled: addTx.isPending,
                  children: addTx.isPending ? "Adding..." : "Add Transaction"
                }
              )
            ] })
          ] })
        ]
      }
    ) })
  ] });
}
function ComparisonRow({
  label,
  value,
  compare,
  compareTo,
  highlight = false
}) {
  const delta = compare !== void 0 && Number(compare) > 0 ? (Number(value) - Number(compare)) / Number(compare) * 100 : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: cn(
            "font-mono text-sm font-semibold tabular-nums",
            highlight ? "text-accent" : "text-foreground"
          ),
          children: formatCurrency(value)
        }
      ),
      delta !== null && compareTo && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "text-xs font-mono tabular-nums",
          style: {
            color: delta >= 0 ? "oklch(0.72 0.17 155)" : "oklch(0.65 0.22 25)"
          },
          children: [
            delta >= 0 ? "+" : "",
            delta.toFixed(1),
            "% ",
            compareTo
          ]
        }
      )
    ] })
  ] });
}
export {
  RevenuePage as default
};
