import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

interface TrendIndicatorProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function TrendIndicator({
  value,
  suffix = "%",
  className,
}: TrendIndicatorProps) {
  const isPositive = value >= 0;
  const isNeutral = value === 0;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-mono text-xs font-medium",
        isNeutral
          ? "text-muted-foreground"
          : isPositive
            ? "text-emerald-400"
            : "text-rose-400",
        className,
      )}
    >
      {!isNeutral &&
        (isPositive ? (
          <TrendingUp className="size-3" />
        ) : (
          <TrendingDown className="size-3" />
        ))}
      {isPositive && !isNeutral ? "+" : ""}
      {value.toFixed(1)}
      {suffix}
    </span>
  );
}
