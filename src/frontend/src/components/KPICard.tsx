import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { TrendIndicator } from "./TrendIndicator";

interface KPICardProps {
  title: string;
  value: string;
  trend?: number;
  trendSuffix?: string;
  icon?: LucideIcon;
  accent?: boolean;
  loading?: boolean;
  className?: string;
  "data-ocid"?: string;
}

export function KPICard({
  title,
  value,
  trend,
  trendSuffix,
  icon: Icon,
  accent = false,
  loading = false,
  className,
  "data-ocid": dataOcid,
}: KPICardProps) {
  return (
    <Card
      data-ocid={dataOcid}
      className={cn(
        "relative overflow-hidden border-border/60 shadow-card transition-smooth hover:shadow-elevated",
        accent && "border-accent/30",
        className,
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <Icon
            className={cn(
              "size-4 text-muted-foreground/60",
              accent && "text-accent/70",
            )}
          />
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-20" />
          </>
        ) : (
          <>
            <p className={cn("kpi-value", accent && "text-accent")}>{value}</p>
            {trend !== undefined && (
              <div className="mt-1.5">
                <TrendIndicator value={trend} suffix={trendSuffix} />
              </div>
            )}
          </>
        )}
      </CardContent>
      {accent && (
        <div className="absolute top-0 right-0 w-1 h-full bg-accent/50 rounded-l-none" />
      )}
    </Card>
  );
}
