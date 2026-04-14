import type { backendInterface } from "../backend";
import {
  ActivityEventKind,
  TransactionCategory,
  TransactionStatus,
  UserRole,
  UserStatus,
} from "../backend";

export const mockBackend: backendInterface = {
  getDashboardKPIs: async () => ({
    activeUsers: BigInt(142),
    totalUsers: BigInt(158),
    revenueToday: BigInt(8450_00),
    revenueYesterday: BigInt(7210_00),
    revenueThisWeek: BigInt(52300_00),
    totalRevenue: BigInt(1_240_750_00),
  }),

  getRevenueAggregates: async () => ({
    revenueToday: BigInt(8450_00),
    revenueYesterday: BigInt(7210_00),
    revenueThisWeek: BigInt(52300_00),
    totalRevenue: BigInt(1_240_750_00),
  }),

  listUsers: async () => [
    {
      id: BigInt(1),
      name: "Alexandra Chen",
      email: "a.chen@corpserv.io",
      role: UserRole.admin,
      status: UserStatus.active,
      joinDate: BigInt(Date.now() - 90 * 86400000) * BigInt(1_000_000),
    },
    {
      id: BigInt(2),
      name: "Marcus Webb",
      email: "m.webb@corpserv.io",
      role: UserRole.viewer,
      status: UserStatus.active,
      joinDate: BigInt(Date.now() - 45 * 86400000) * BigInt(1_000_000),
    },
    {
      id: BigInt(3),
      name: "Priya Sharma",
      email: "p.sharma@corpserv.io",
      role: UserRole.admin,
      status: UserStatus.active,
      joinDate: BigInt(Date.now() - 120 * 86400000) * BigInt(1_000_000),
    },
    {
      id: BigInt(4),
      name: "Tobias Müller",
      email: "t.muller@corpserv.io",
      role: UserRole.viewer,
      status: UserStatus.inactive,
      joinDate: BigInt(Date.now() - 200 * 86400000) * BigInt(1_000_000),
    },
    {
      id: BigInt(5),
      name: "Sofia Reyes",
      email: "s.reyes@corpserv.io",
      role: UserRole.viewer,
      status: UserStatus.active,
      joinDate: BigInt(Date.now() - 30 * 86400000) * BigInt(1_000_000),
    },
  ],

  getUser: async (id) => ({
    id,
    name: "Alexandra Chen",
    email: "a.chen@corpserv.io",
    role: UserRole.admin,
    status: UserStatus.active,
    joinDate: BigInt(Date.now() - 90 * 86400000) * BigInt(1_000_000),
  }),

  createUser: async (req) => ({
    id: BigInt(99),
    name: req.name,
    email: req.email,
    role: req.role,
    status: UserStatus.active,
    joinDate: BigInt(Date.now()) * BigInt(1_000_000),
  }),

  updateUser: async (id, req) => ({
    id,
    name: req.name ?? "Alexandra Chen",
    email: req.email ?? "a.chen@corpserv.io",
    role: req.role ?? UserRole.admin,
    status: req.status ?? UserStatus.active,
    joinDate: BigInt(Date.now() - 90 * 86400000) * BigInt(1_000_000),
  }),

  deleteUser: async () => true,

  searchUsers: async () => [],

  listTransactions: async (_offset, _limit) => ({
    total: BigInt(5),
    offset: BigInt(0),
    limit: BigInt(20),
    items: [
      {
        id: BigInt(1),
        description: "Enterprise License — Q2 Renewal",
        amount: BigInt(4200_00),
        category: TransactionCategory.subscription,
        status: TransactionStatus.completed,
        date: BigInt(Date.now() - 1 * 86400000) * BigInt(1_000_000),
      },
      {
        id: BigInt(2),
        description: "Professional Services — Integration",
        amount: BigInt(1850_00),
        category: TransactionCategory.service,
        status: TransactionStatus.completed,
        date: BigInt(Date.now() - 2 * 86400000) * BigInt(1_000_000),
      },
      {
        id: BigInt(3),
        description: "Software Sales — Starter Plan",
        amount: BigInt(750_00),
        category: TransactionCategory.sales,
        status: TransactionStatus.pending,
        date: BigInt(Date.now() - 3 * 86400000) * BigInt(1_000_000),
      },
      {
        id: BigInt(4),
        description: "Consulting Retainer — May",
        amount: BigInt(3200_00),
        category: TransactionCategory.service,
        status: TransactionStatus.completed,
        date: BigInt(Date.now() - 5 * 86400000) * BigInt(1_000_000),
      },
      {
        id: BigInt(5),
        description: "Annual Platform License",
        amount: BigInt(9600_00),
        category: TransactionCategory.subscription,
        status: TransactionStatus.refunded,
        date: BigInt(Date.now() - 7 * 86400000) * BigInt(1_000_000),
      },
    ],
  }),

  getTransaction: async (id) => ({
    id,
    description: "Enterprise License — Q2 Renewal",
    amount: BigInt(4200_00),
    category: TransactionCategory.subscription,
    status: TransactionStatus.completed,
    date: BigInt(Date.now() - 1 * 86400000) * BigInt(1_000_000),
  }),

  addTransaction: async (_amount, category, status, description) => ({
    id: BigInt(99),
    description,
    amount: BigInt(1000_00),
    category,
    status,
    date: BigInt(Date.now()) * BigInt(1_000_000),
  }),

  getRecentActivity: async () => [
    {
      id: BigInt(1),
      kind: ActivityEventKind.transaction_added,
      description: "New subscription transaction — $4,200",
      timestamp: BigInt(Date.now() - 15 * 60000) * BigInt(1_000_000),
    },
    {
      id: BigInt(2),
      kind: ActivityEventKind.user_created,
      description: "New user registered: Sofia Reyes",
      timestamp: BigInt(Date.now() - 45 * 60000) * BigInt(1_000_000),
    },
    {
      id: BigInt(3),
      kind: ActivityEventKind.transaction_added,
      description: "Service transaction completed — $1,850",
      timestamp: BigInt(Date.now() - 2 * 3600000) * BigInt(1_000_000),
    },
    {
      id: BigInt(4),
      kind: ActivityEventKind.user_deactivated,
      description: "User deactivated: Tobias Müller",
      timestamp: BigInt(Date.now() - 4 * 3600000) * BigInt(1_000_000),
    },
  ],
};
