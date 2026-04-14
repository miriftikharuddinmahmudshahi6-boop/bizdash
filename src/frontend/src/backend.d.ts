import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface UserPublic {
    id: UserId;
    status: UserStatus;
    joinDate: Timestamp;
    name: string;
    role: UserRole;
    email: string;
}
export interface CreateUserRequest {
    name: string;
    role: UserRole;
    email: string;
}
export interface TransactionPage {
    total: bigint;
    offset: bigint;
    limit: bigint;
    items: Array<Transaction>;
}
export interface Transaction {
    id: TransactionId;
    status: TransactionStatus;
    date: Timestamp;
    description: string;
    category: TransactionCategory;
    amount: bigint;
}
export type UserId = bigint;
export type TransactionId = bigint;
export interface ActivityEvent {
    id: bigint;
    kind: ActivityEventKind;
    description: string;
    timestamp: bigint;
}
export interface RevenueAggregates {
    revenueYesterday: bigint;
    revenueToday: bigint;
    totalRevenue: bigint;
    revenueThisWeek: bigint;
}
export interface UpdateUserRequest {
    status?: UserStatus;
    name?: string;
    role?: UserRole;
    email?: string;
}
export interface DashboardKPIs {
    activeUsers: bigint;
    revenueYesterday: bigint;
    revenueToday: bigint;
    totalUsers: bigint;
    totalRevenue: bigint;
    revenueThisWeek: bigint;
}
export enum ActivityEventKind {
    user_created = "user_created",
    user_deactivated = "user_deactivated",
    transaction_added = "transaction_added"
}
export enum TransactionCategory {
    service = "service",
    subscription = "subscription",
    other = "other",
    sales = "sales"
}
export enum TransactionStatus {
    pending = "pending",
    completed = "completed",
    refunded = "refunded"
}
export enum UserRole {
    admin = "admin",
    viewer = "viewer"
}
export enum UserStatus {
    active = "active",
    inactive = "inactive"
}
export interface backendInterface {
    addTransaction(amount: bigint, category: TransactionCategory, status: TransactionStatus, description: string): Promise<Transaction>;
    createUser(req: CreateUserRequest): Promise<UserPublic>;
    deleteUser(id: UserId): Promise<boolean>;
    getDashboardKPIs(): Promise<DashboardKPIs>;
    getRecentActivity(): Promise<Array<ActivityEvent>>;
    getRevenueAggregates(): Promise<RevenueAggregates>;
    getTransaction(id: TransactionId): Promise<Transaction | null>;
    getUser(id: UserId): Promise<UserPublic | null>;
    listTransactions(offset: bigint, limit: bigint): Promise<TransactionPage>;
    listUsers(): Promise<Array<UserPublic>>;
    searchUsers(searchTerm: string): Promise<Array<UserPublic>>;
    updateUser(id: UserId, req: UpdateUserRequest): Promise<UserPublic | null>;
}
