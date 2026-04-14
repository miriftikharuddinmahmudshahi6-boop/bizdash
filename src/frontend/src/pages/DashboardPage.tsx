import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  BarChart3,
  DollarSign,
  Inbox,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { KPICard } from "../components/KPICard";
import {
  useDashboardKPIs,
  useRecentActivity,
  useRevenueAggregates,
} from "../hooks/useBackend";
import type { ActivityEvent } from "../types";
import { ActivityEventKind } from "../types";

// ─── Formatters ───────────────────────────────────────────────────────────────

function formatCurrency(cents: bigint): string {
  const dollars = Number(cents) / 100;
  if (dollars >= 1_000_000) return `$${(dollars / 1_000_000).toFixed(2)}M`;
  if (dollars >= 1_000) return `$${(dollars / 1_000).toFixed(1)}K`;
  return `$${dollars.toFixed(2)}`;
}

function formatCount(n: bigint): string {
  const v = Number(n);
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
  return v.toLocaleString();
}

function pctChange(current: bigint, previous: bigint): number {
  if (previous === 0n) return current > 0n ? 100 : 0;
  return ((Number(current) - Number(previous)) / Number(previous)) * 100;
}

function relativeTime(timestamp: bigint): string {
  const ms = Number(timestamp / 1_000_000n);
  const diff = Date.now() - ms;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

// ─── Activity icon/label helpers ──────────────────────────────────────────────

const KIND_META: Record<
  ActivityEventKind,
  { icon: React.ReactNode; color: string }
> = {
  [ActivityEventKind.user_created]: {
    icon: <Users className="size-3.5" />,
    color: "bg-primary/20 text-primary",
  },
  [ActivityEventKind.user_deactivated]: {
    icon: <Users className="size-3.5" />,
    color: "bg-destructive/20 text-destructive-foreground",
  },
  [ActivityEventKind.transaction_added]: {
    icon: <DollarSign className="size-3.5" />,
    color: "bg-accent/20 text-accent",
  },
};

// ─── Activity Feed Item ────────────────────────────────────────────────────────

function ActivityFeedItem({
  event,
  index,
}: {
  event: ActivityEvent;
  index: number;
}) {
  const meta = KIND_META[event.kind] ?? {
    icon: <Activity className="size-3.5" />,
    color: "bg-muted text-muted-foreground",
  };

  return (
    <div
      data-ocid={`activity.item.${index + 1}`}
      className="flex items-start gap-3 py-2.5 border-b border-border/40 last:border-0"
    >
      <span className={`mt-0.5 flex-shrink-0 rounded-full p-1.5 ${meta.color}`}>
        {meta.icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground truncate">{event.description}</p>
        <p className="text-xs text-muted-foreground mt-0.5 font-mono">
          {relativeTime(event.timestamp)}
        </p>
      </div>
    </div>
  );
}

function ActivityFeedSkeleton() {
  return (
    <div className="space-y-1" data-ocid="activity.loading_state">
      {Array.from({ length: 6 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
        <div key={`sk-act-${i}`} className="flex items-start gap-3 py-2.5">
          <Skeleton className="size-7 rounded-full flex-shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Chart Tooltip ─────────────────────────────────────────────────────────────

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function RevenueChartTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-md px-3 py-2 shadow-elevated text-sm">
      <p className="text-muted-foreground mb-1">{label}</p>
      <p className="font-mono font-semibold text-foreground">
        {formatCurrency(BigInt(Math.round(payload[0].value)))}
      </p>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const kpiQuery = useDashboardKPIs();
  const activityQuery = useRecentActivity();
  const revenueQuery = useRevenueAggregates();

  const kpi = kpiQuery.data;
  const revenue = revenueQuery.data;
  const isKpiLoading = kpiQuery.isLoading;
  const isRevenueLoading = revenueQuery.isLoading;

  const revenueTrend = kpi
    ? pctChange(kpi.revenueToday, kpi.revenueYesterday)
    : undefined;

  const weeklyTrend = kpi
    ? pctChange(kpi.revenueThisWeek, kpi.revenueYesterday * 7n)
    : undefined;

  const chartData = revenue
    ? [
        { day: "Yesterday", revenue: Number(revenue.revenueYesterday) },
        { day: "Today", revenue: Number(revenue.revenueToday) },
      ]
    : [];

  const activities: ActivityEvent[] = Array.isArray(activityQuery.data)
    ? (activityQuery.data as ActivityEvent[])
    : [];

  return (
    <div
      data-ocid="dashboard.page"
      className="flex flex-col gap-6 p-6 max-w-[1400px] mx-auto"
    >
      {/* ── Page Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-semibold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Business health at a glance —{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-card border border-border/60 rounded-md px-3 py-1.5">
          <span
            className="size-1.5 rounded-full animate-pulse"
            style={{ background: "oklch(0.72 0.17 155)" }}
          />
          Live · refreshes every 30s
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <section data-ocid="kpi.section">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            data-ocid="kpi.total_users.card"
            title="Total Users"
            value={kpi ? formatCount(kpi.totalUsers) : "—"}
            icon={Users}
            loading={isKpiLoading}
          />
          <KPICard
            data-ocid="kpi.active_users.card"
            title="Active Users"
            value={kpi ? formatCount(kpi.activeUsers) : "—"}
            icon={TrendingUp}
            loading={isKpiLoading}
          />
          <KPICard
            data-ocid="kpi.today_revenue.card"
            title="Today's Revenue"
            value={kpi ? formatCurrency(kpi.revenueToday) : "—"}
            icon={DollarSign}
            accent
            trend={revenueTrend}
            trendSuffix="% vs yesterday"
            loading={isKpiLoading}
          />
          <KPICard
            data-ocid="kpi.weekly_revenue.card"
            title="Weekly Revenue"
            value={kpi ? formatCurrency(kpi.revenueThisWeek) : "—"}
            icon={BarChart3}
            accent
            trend={weeklyTrend}
            trendSuffix="% vs prior week"
            loading={isKpiLoading}
          />
        </div>
      </section>

      {/* ── Charts + Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Bar Chart */}
        <section
          data-ocid="revenue.chart.section"
          className="lg:col-span-2 bg-card border border-border/60 rounded-xl p-5 shadow-card"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Day-over-Day Revenue
              </h2>
              <p className="text-xs text-muted-foreground">
                Yesterday vs Today comparison
              </p>
            </div>
            <BarChart3 className="size-4 text-muted-foreground/50" />
          </div>

          {isRevenueLoading ? (
            <div data-ocid="revenue.chart.loading_state">
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>
          ) : chartData.length === 0 ? (
            <div
              data-ocid="revenue.chart.empty_state"
              className="flex flex-col items-center justify-center h-48 text-muted-foreground"
            >
              <BarChart3 className="size-8 mb-2 opacity-30" />
              <p className="text-sm">No revenue data yet</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={chartData}
                margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.26 0 0)"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12, fill: "oklch(0.6 0 0)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v: number) =>
                    `$${(v / 100).toLocaleString()}`
                  }
                  tick={{ fontSize: 11, fill: "oklch(0.6 0 0)" }}
                  axisLine={false}
                  tickLine={false}
                  width={64}
                />
                <Tooltip content={<RevenueChartTooltip />} cursor={false} />
                <Bar
                  dataKey="revenue"
                  fill="oklch(0.72 0.22 45)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={72}
                />
              </BarChart>
            </ResponsiveContainer>
          )}

          {/* Summary row */}
          {!isRevenueLoading && revenue && (
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border/40">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  Yesterday
                </p>
                <p className="font-mono text-lg font-semibold text-foreground mt-0.5">
                  {formatCurrency(revenue.revenueYesterday)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  Today
                </p>
                <p className="font-mono text-lg font-semibold text-accent mt-0.5">
                  {formatCurrency(revenue.revenueToday)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  This Week
                </p>
                <p className="font-mono text-lg font-semibold text-foreground mt-0.5">
                  {formatCurrency(revenue.revenueThisWeek)}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Activity Feed */}
        <section
          data-ocid="activity.section"
          className="bg-card border border-border/60 rounded-xl p-5 shadow-card flex flex-col"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Recent Activity
              </h2>
              <p className="text-xs text-muted-foreground">Last 20 events</p>
            </div>
            <Activity className="size-4 text-muted-foreground/50" />
          </div>

          <div className="flex-1 overflow-y-auto max-h-[340px]">
            {activityQuery.isLoading ? (
              <ActivityFeedSkeleton />
            ) : activities.length === 0 ? (
              <div
                data-ocid="activity.empty_state"
                className="flex flex-col items-center justify-center h-48 text-muted-foreground text-center"
              >
                <Inbox className="size-8 mb-2 opacity-30" />
                <p className="text-sm font-medium">No activity yet</p>
                <p className="text-xs mt-0.5">
                  Events will appear here as things happen
                </p>
              </div>
            ) : (
              activities
                .slice(0, 20)
                .map((event, i) => (
                  <ActivityFeedItem
                    key={event.id.toString()}
                    event={event}
                    index={i}
                  />
                ))
            )}
          </div>
        </section>
      </div>

      {/* ── All-time Revenue Summary ── */}
      {!isKpiLoading && kpi && (
        <section
          data-ocid="total_revenue.section"
          className="bg-card border border-border/60 rounded-xl p-5 shadow-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                All-Time Revenue
              </p>
              <p className="font-mono text-4xl font-semibold text-accent mt-1">
                {formatCurrency(kpi.totalRevenue)}
              </p>
            </div>
            <div className="text-right space-y-1">
              <div className="flex items-center gap-2 justify-end">
                <Users className="size-3.5 text-muted-foreground" />
                <span className="text-sm font-mono text-foreground">
                  {formatCount(kpi.totalUsers)}
                </span>
                <span className="text-xs text-muted-foreground">
                  total users
                </span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <Activity className="size-3.5 text-muted-foreground" />
                <span className="text-sm font-mono text-foreground">
                  {formatCount(kpi.activeUsers)}
                </span>
                <span className="text-xs text-muted-foreground">active</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
