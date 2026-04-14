import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  CreateUserRequest,
  DashboardKPIs,
  RevenueAggregates,
  Transaction,
  TransactionPage,
  UpdateUserRequest,
  UserPublic,
} from "../types";
import { TransactionCategory, TransactionStatus } from "../types";

// ─── Dashboard ────────────────────────────────────────────────────────────────

export function useDashboardKPIs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DashboardKPIs>({
    queryKey: ["dashboardKPIs"],
    queryFn: async () => {
      if (!actor) throw new Error("actor not ready");
      return actor.getDashboardKPIs();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

export function useRecentActivity() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["recentActivity"],
    queryFn: async () => {
      if (!actor) throw new Error("actor not ready");
      return actor.getRecentActivity();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

// ─── Revenue ──────────────────────────────────────────────────────────────────

export function useRevenueAggregates() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<RevenueAggregates>({
    queryKey: ["revenueAggregates"],
    queryFn: async () => {
      if (!actor) throw new Error("actor not ready");
      return actor.getRevenueAggregates();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

export function useTransactions(offset = 0n, limit = 20n) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TransactionPage>({
    queryKey: ["transactions", offset.toString(), limit.toString()],
    queryFn: async () => {
      if (!actor) throw new Error("actor not ready");
      return actor.listTransactions(offset, limit);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTransaction() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    Transaction,
    Error,
    {
      amount: bigint;
      category: TransactionCategory;
      status: TransactionStatus;
      description: string;
    }
  >({
    mutationFn: async ({ amount, category, status, description }) => {
      if (!actor) throw new Error("actor not ready");
      return actor.addTransaction(amount, category, status, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["revenueAggregates"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardKPIs"] });
    },
  });
}

// ─── Users ────────────────────────────────────────────────────────────────────

export function useUsers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserPublic[]>({
    queryKey: ["users"],
    queryFn: async () => {
      if (!actor) throw new Error("actor not ready");
      return actor.listUsers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchUsers(searchTerm: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserPublic[]>({
    queryKey: ["users", "search", searchTerm],
    queryFn: async () => {
      if (!actor) throw new Error("actor not ready");
      if (!searchTerm) return actor.listUsers();
      return actor.searchUsers(searchTerm);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateUser() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<UserPublic, Error, CreateUserRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("actor not ready");
      return actor.createUser(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardKPIs"] });
    },
  });
}

export function useUpdateUser() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    UserPublic | null,
    Error,
    { id: bigint; req: UpdateUserRequest }
  >({
    mutationFn: async ({ id, req }) => {
      if (!actor) throw new Error("actor not ready");
      return actor.updateUser(id, req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useDeleteUser() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("actor not ready");
      return actor.deleteUser(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardKPIs"] });
    },
  });
}

// Re-export enums for convenience
export { TransactionCategory, TransactionStatus };
