// Re-export backend types for frontend use
export type {
  Transaction,
  TransactionPage,
  TransactionId,
  UserPublic,
  UserId,
  CreateUserRequest,
  UpdateUserRequest,
  DashboardKPIs,
  RevenueAggregates,
  ActivityEvent,
  Timestamp,
} from "./backend";

export {
  TransactionCategory,
  TransactionStatus,
  UserRole,
  UserStatus,
  ActivityEventKind,
} from "./backend";

// Utility type for nav items
export interface NavItem {
  label: string;
  path: string;
  icon: string;
}
