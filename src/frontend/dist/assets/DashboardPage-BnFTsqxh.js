import { c as createLucideIcon, j as jsxRuntimeExports, U as Users, T as TrendingUp, D as DollarSign, C as ChartColumn, S as Skeleton } from "./index-C44CPS2R.js";
import { K as KPICard, R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar } from "./KPICard-DvHmH7vk.js";
import { u as useDashboardKPIs, a as useRecentActivity, b as useRevenueAggregates, A as ActivityEventKind } from "./useBackend-CL3GtYM4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
];
const Inbox = createLucideIcon("inbox", __iconNode);
function formatCurrency(cents) {
  const dollars = Number(cents) / 100;
  if (dollars >= 1e6) return `$${(dollars / 1e6).toFixed(2)}M`;
  if (dollars >= 1e3) return `$${(dollars / 1e3).toFixed(1)}K`;
  return `$${dollars.toFixed(2)}`;
}
function formatCount(n) {
  const v = Number(n);
  if (v >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `${(v / 1e3).toFixed(1)}K`;
  return v.toLocaleString();
}
function pctChange(current, previous) {
  if (previous === 0n) return current > 0n ? 100 : 0;
  return (Number(current) - Number(previous)) / Number(previous) * 100;
}
function relativeTime(timestamp) {
  const ms = Number(timestamp / 1000000n);
  const diff = Date.now() - ms;
  if (diff < 6e4) return "just now";
  if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
  if (diff < 864e5) return `${Math.floor(diff / 36e5)}h ago`;
  return `${Math.floor(diff / 864e5)}d ago`;
}
const KIND_META = {
  [ActivityEventKind.user_created]: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-3.5" }),
    color: "bg-primary/20 text-primary"
  },
  [ActivityEventKind.user_deactivated]: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-3.5" }),
    color: "bg-destructive/20 text-destructive-foreground"
  },
  [ActivityEventKind.transaction_added]: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "size-3.5" }),
    color: "bg-accent/20 text-accent"
  }
};
function ActivityFeedItem({
  event,
  index
}) {
  const meta = KIND_META[event.kind] ?? {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "size-3.5" }),
    color: "bg-muted text-muted-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `activity.item.${index + 1}`,
      className: "flex items-start gap-3 py-2.5 border-b border-border/40 last:border-0",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `mt-0.5 flex-shrink-0 rounded-full p-1.5 ${meta.color}`, children: meta.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground truncate", children: event.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 font-mono", children: relativeTime(event.timestamp) })
        ] })
      ]
    }
  );
}
function ActivityFeedSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", "data-ocid": "activity.loading_state", children: Array.from({ length: 6 }).map((_, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 py-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "size-7 rounded-full flex-shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" })
      ] })
    ] }, `sk-act-${i}`)
  )) });
}
function RevenueChartTooltip({ active, payload, label }) {
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-popover border border-border rounded-md px-3 py-2 shadow-elevated text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-1", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-semibold text-foreground", children: formatCurrency(BigInt(Math.round(payload[0].value))) })
  ] });
}
function DashboardPage() {
  const kpiQuery = useDashboardKPIs();
  const activityQuery = useRecentActivity();
  const revenueQuery = useRevenueAggregates();
  const kpi = kpiQuery.data;
  const revenue = revenueQuery.data;
  const isKpiLoading = kpiQuery.isLoading;
  const isRevenueLoading = revenueQuery.isLoading;
  const revenueTrend = kpi ? pctChange(kpi.revenueToday, kpi.revenueYesterday) : void 0;
  const weeklyTrend = kpi ? pctChange(kpi.revenueThisWeek, kpi.revenueYesterday * 7n) : void 0;
  const chartData = revenue ? [
    { day: "Yesterday", revenue: Number(revenue.revenueYesterday) },
    { day: "Today", revenue: Number(revenue.revenueToday) }
  ] : [];
  const activities = Array.isArray(activityQuery.data) ? activityQuery.data : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "dashboard.page",
      className: "flex flex-col gap-6 p-6 max-w-[1400px] mx-auto",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-semibold tracking-tight text-foreground", children: "Dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
              "Business health at a glance —",
              " ",
              (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric"
              })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground bg-card border border-border/60 rounded-md px-3 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "size-1.5 rounded-full animate-pulse",
                style: { background: "oklch(0.72 0.17 155)" }
              }
            ),
            "Live · refreshes every 30s"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "kpi.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              "data-ocid": "kpi.total_users.card",
              title: "Total Users",
              value: kpi ? formatCount(kpi.totalUsers) : "—",
              icon: Users,
              loading: isKpiLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              "data-ocid": "kpi.active_users.card",
              title: "Active Users",
              value: kpi ? formatCount(kpi.activeUsers) : "—",
              icon: TrendingUp,
              loading: isKpiLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              "data-ocid": "kpi.today_revenue.card",
              title: "Today's Revenue",
              value: kpi ? formatCurrency(kpi.revenueToday) : "—",
              icon: DollarSign,
              accent: true,
              trend: revenueTrend,
              trendSuffix: "% vs yesterday",
              loading: isKpiLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              "data-ocid": "kpi.weekly_revenue.card",
              title: "Weekly Revenue",
              value: kpi ? formatCurrency(kpi.revenueThisWeek) : "—",
              icon: ChartColumn,
              accent: true,
              trend: weeklyTrend,
              trendSuffix: "% vs prior week",
              loading: isKpiLoading
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "section",
            {
              "data-ocid": "revenue.chart.section",
              className: "lg:col-span-2 bg-card border border-border/60 rounded-xl p-5 shadow-card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Day-over-Day Revenue" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Yesterday vs Today comparison" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "size-4 text-muted-foreground/50" })
                ] }),
                isRevenueLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "revenue.chart.loading_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-lg" }) }) : chartData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": "revenue.chart.empty_state",
                    className: "flex flex-col items-center justify-center h-48 text-muted-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "size-8 mb-2 opacity-30" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No revenue data yet" })
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  BarChart,
                  {
                    data: chartData,
                    margin: { top: 4, right: 8, left: 0, bottom: 0 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CartesianGrid,
                        {
                          strokeDasharray: "3 3",
                          stroke: "oklch(0.26 0 0)",
                          vertical: false
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        XAxis,
                        {
                          dataKey: "day",
                          tick: { fontSize: 12, fill: "oklch(0.6 0 0)" },
                          axisLine: false,
                          tickLine: false
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        YAxis,
                        {
                          tickFormatter: (v) => `$${(v / 100).toLocaleString()}`,
                          tick: { fontSize: 11, fill: "oklch(0.6 0 0)" },
                          axisLine: false,
                          tickLine: false,
                          width: 64
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(RevenueChartTooltip, {}), cursor: false }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Bar,
                        {
                          dataKey: "revenue",
                          fill: "oklch(0.72 0.22 45)",
                          radius: [6, 6, 0, 0],
                          maxBarSize: 72
                        }
                      )
                    ]
                  }
                ) }),
                !isRevenueLoading && revenue && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border/40", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest", children: "Yesterday" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-lg font-semibold text-foreground mt-0.5", children: formatCurrency(revenue.revenueYesterday) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest", children: "Today" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-lg font-semibold text-accent mt-0.5", children: formatCurrency(revenue.revenueToday) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest", children: "This Week" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-lg font-semibold text-foreground mt-0.5", children: formatCurrency(revenue.revenueThisWeek) })
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "section",
            {
              "data-ocid": "activity.section",
              className: "bg-card border border-border/60 rounded-xl p-5 shadow-card flex flex-col",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Recent Activity" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Last 20 events" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "size-4 text-muted-foreground/50" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto max-h-[340px]", children: activityQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityFeedSkeleton, {}) : activities.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": "activity.empty_state",
                    className: "flex flex-col items-center justify-center h-48 text-muted-foreground text-center",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "size-8 mb-2 opacity-30" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No activity yet" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-0.5", children: "Events will appear here as things happen" })
                    ]
                  }
                ) : activities.slice(0, 20).map((event, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ActivityFeedItem,
                  {
                    event,
                    index: i
                  },
                  event.id.toString()
                )) })
              ]
            }
          )
        ] }),
        !isKpiLoading && kpi && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            "data-ocid": "total_revenue.section",
            className: "bg-card border border-border/60 rounded-xl p-5 shadow-card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "All-Time Revenue" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-4xl font-semibold text-accent mt-1", children: formatCurrency(kpi.totalRevenue) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-end", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-3.5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-mono text-foreground", children: formatCount(kpi.totalUsers) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "total users" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-end", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "size-3.5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-mono text-foreground", children: formatCount(kpi.activeUsers) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "active" })
                ] })
              ] })
            ] })
          }
        )
      ]
    }
  );
}
export {
  DashboardPage as default
};
