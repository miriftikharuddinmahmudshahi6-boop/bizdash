import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TransactionStatus, UserStatus } from "../types";

type StatusValue = TransactionStatus | UserStatus;

type StatusStyle = {
  label: string;
  style?: React.CSSProperties;
  muted?: boolean;
};

const statusConfig: Record<StatusValue, StatusStyle> = {
  [TransactionStatus.completed]: {
    label: "Completed",
    style: {
      background: "oklch(0.45 0.17 155 / 0.15)",
      color: "oklch(0.72 0.17 155)",
      borderColor: "transparent",
    },
  },
  [TransactionStatus.pending]: {
    label: "Pending",
    style: {
      background: "oklch(0.60 0.18 80 / 0.15)",
      color: "oklch(0.78 0.18 80)",
      borderColor: "transparent",
    },
  },
  [TransactionStatus.refunded]: {
    label: "Refunded",
    style: {
      background: "oklch(0.45 0.22 25 / 0.15)",
      color: "oklch(0.65 0.22 25)",
      borderColor: "transparent",
    },
  },
  [UserStatus.active]: {
    label: "Active",
    style: {
      background: "oklch(0.45 0.17 155 / 0.15)",
      color: "oklch(0.72 0.17 155)",
      borderColor: "transparent",
    },
  },
  [UserStatus.inactive]: {
    label: "Inactive",
    muted: true,
  },
};

interface StatusBadgeProps {
  status: StatusValue;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge
      data-ocid={`status_badge.${status}`}
      className={cn(
        "font-mono text-xs tracking-wide border-transparent",
        config.muted && "bg-muted text-muted-foreground",
        className,
      )}
      style={config.muted ? undefined : config.style}
    >
      {config.label}
    </Badge>
  );
}
