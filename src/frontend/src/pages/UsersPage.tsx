import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Edit2,
  PlusCircle,
  PowerOff,
  Search,
  Trash2,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { type Column, DataTable } from "../components/DataTable";
import { StatusBadge } from "../components/StatusBadge";
import {
  useCreateUser,
  useDeleteUser,
  useSearchUsers,
  useUpdateUser,
} from "../hooks/useBackend";
import type { UserPublic } from "../types";
import { UserRole, UserStatus } from "../types";

function formatDate(ts: bigint): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(Number(ts) / 1_000_000));
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const roleBadgeClass: Record<UserRole, string> = {
  [UserRole.admin]: "border-primary/40 text-primary bg-primary/10",
  [UserRole.viewer]: "border-border text-muted-foreground",
};

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | undefined;
  "data-ocid"?: string;
}

function SummaryCard({
  icon,
  label,
  value,
  "data-ocid": dataOcid,
}: SummaryCardProps) {
  return (
    <div
      data-ocid={dataOcid}
      className="flex items-center gap-3 rounded-lg border border-border/60 bg-card px-4 py-3"
    >
      <div className="flex size-8 items-center justify-center rounded-md bg-muted/60 text-muted-foreground">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        {value === undefined ? (
          <Skeleton className="mt-0.5 h-5 w-12" />
        ) : (
          <p className="text-lg font-semibold font-mono text-foreground leading-none mt-0.5">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editUser, setEditUser] = useState<UserPublic | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<bigint | null>(null);
  const [toggleUser, setToggleUser] = useState<UserPublic | null>(null);

  const [newForm, setNewForm] = useState<{
    name: string;
    email: string;
    role: UserRole;
  }>({ name: "", email: "", role: UserRole.viewer });

  const [editForm, setEditForm] = useState<{
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
  }>({ name: "", email: "", role: UserRole.viewer, status: UserStatus.active });

  const { data: users, isLoading } = useSearchUsers(search);
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const summary = useMemo(() => {
    if (!users) return undefined;
    const total = users.length;
    const active = users.filter((u) => u.status === UserStatus.active).length;
    return { total, active, inactive: total - active };
  }, [users]);

  const columns: Column<UserPublic>[] = [
    {
      key: "name",
      header: "User",
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <Avatar className="size-7 shrink-0">
            <AvatarFallback className="text-xs font-mono bg-primary/10 text-primary">
              {getInitials(row.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {row.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {row.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (row) => (
        <Badge
          variant="outline"
          className={`capitalize text-xs ${roleBadgeClass[row.role]}`}
        >
          {row.role}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "joinDate",
      header: "Joined",
      render: (row) => (
        <span className="font-mono text-xs text-muted-foreground">
          {formatDate(row.joinDate)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (row, index) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="sm"
            aria-label={
              row.status === UserStatus.active
                ? "Deactivate user"
                : "Reactivate user"
            }
            data-ocid={`users.toggle_button.${index + 1}`}
            className="size-7 p-0 text-muted-foreground hover:text-foreground"
            onClick={() => setToggleUser(row)}
          >
            <PowerOff className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Edit user"
            data-ocid={`users.edit_button.${index + 1}`}
            className="size-7 p-0 text-muted-foreground hover:text-foreground"
            onClick={() => {
              setEditUser(row);
              setEditForm({
                name: row.name,
                email: row.email,
                role: row.role,
                status: row.status,
              });
            }}
          >
            <Edit2 className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Delete user"
            data-ocid={`users.delete_button.${index + 1}`}
            className="size-7 p-0 text-muted-foreground hover:text-destructive"
            onClick={() => setDeleteUserId(row.id)}
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createUser.mutateAsync(newForm);
      toast.success("User created");
      setAddOpen(false);
      setNewForm({ name: "", email: "", role: UserRole.viewer });
    } catch {
      toast.error("Failed to create user");
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editUser) return;
    try {
      await updateUser.mutateAsync({ id: editUser.id, req: editForm });
      toast.success("User updated");
      setEditUser(null);
    } catch {
      toast.error("Failed to update user");
    }
  }

  async function handleDelete() {
    if (deleteUserId == null) return;
    try {
      await deleteUser.mutateAsync(deleteUserId);
      toast.success("User removed");
      setDeleteUserId(null);
    } catch {
      toast.error("Failed to delete user");
    }
  }

  async function handleToggleStatus() {
    if (!toggleUser) return;
    const newStatus =
      toggleUser.status === UserStatus.active
        ? UserStatus.inactive
        : UserStatus.active;
    try {
      await updateUser.mutateAsync({
        id: toggleUser.id,
        req: { status: newStatus },
      });
      toast.success(
        newStatus === UserStatus.active
          ? `${toggleUser.name} reactivated`
          : `${toggleUser.name} deactivated`,
      );
      setToggleUser(null);
    } catch {
      toast.error("Failed to update user status");
    }
  }

  return (
    <div data-ocid="users.page" className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground tracking-tight">
            Users
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage team members and access roles
          </p>
        </div>
        <Button
          data-ocid="users.add_user.open_modal_button"
          onClick={() => setAddOpen(true)}
          className="gap-2"
        >
          <PlusCircle className="size-4" />
          Add User
        </Button>
      </div>

      {/* Summary cards */}
      <div
        data-ocid="users.summary.section"
        className="grid grid-cols-3 gap-3 sm:grid-cols-3"
      >
        <SummaryCard
          data-ocid="users.summary.total.card"
          icon={<Users className="size-4" />}
          label="Total Users"
          value={summary?.total}
        />
        <SummaryCard
          data-ocid="users.summary.active.card"
          icon={<UserCheck className="size-4" />}
          label="Active"
          value={summary?.active}
        />
        <SummaryCard
          data-ocid="users.summary.inactive.card"
          icon={<UserX className="size-4" />}
          label="Inactive"
          value={summary?.inactive}
        />
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
        <Input
          data-ocid="users.search_input"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9 text-sm"
        />
      </div>

      {/* Table */}
      <DataTable
        data-ocid="users.table"
        columns={columns}
        data={users ?? []}
        loading={isLoading}
        emptyMessage={
          search
            ? `No users match "${search}". Try a different search term.`
            : "No users yet. Add your first team member."
        }
        rowKey={(row) => row.id.toString()}
      />

      {/* Add User dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent
          data-ocid="users.add_user.dialog"
          className="sm:max-w-md"
        >
          <DialogHeader>
            <DialogTitle className="font-display">Add User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="user-name">Full Name</Label>
              <Input
                id="user-name"
                data-ocid="users.add_user.name.input"
                placeholder="Jane Smith"
                value={newForm.name}
                onChange={(e) =>
                  setNewForm((f) => ({ ...f, name: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="user-email">Email</Label>
              <Input
                id="user-email"
                data-ocid="users.add_user.email.input"
                type="email"
                placeholder="jane@example.com"
                value={newForm.email}
                onChange={(e) =>
                  setNewForm((f) => ({ ...f, email: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>Role</Label>
              <Select
                value={newForm.role}
                onValueChange={(v) =>
                  setNewForm((f) => ({ ...f, role: v as UserRole }))
                }
              >
                <SelectTrigger data-ocid="users.add_user.role.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(UserRole).map((r) => (
                    <SelectItem key={r} value={r} className="capitalize">
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                data-ocid="users.add_user.cancel_button"
                onClick={() => setAddOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                data-ocid="users.add_user.submit_button"
                disabled={createUser.isPending}
              >
                {createUser.isPending ? "Creating…" : "Create User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit User dialog */}
      <Dialog open={!!editUser} onOpenChange={(o) => !o && setEditUser(null)}>
        <DialogContent
          data-ocid="users.edit_user.dialog"
          className="sm:max-w-md"
        >
          <DialogHeader>
            <DialogTitle className="font-display">Edit User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                data-ocid="users.edit_user.name.input"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, name: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                data-ocid="users.edit_user.email.input"
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, email: e.target.value }))
                }
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Role</Label>
                <Select
                  value={editForm.role}
                  onValueChange={(v) =>
                    setEditForm((f) => ({ ...f, role: v as UserRole }))
                  }
                >
                  <SelectTrigger data-ocid="users.edit_user.role.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(UserRole).map((r) => (
                      <SelectItem key={r} value={r} className="capitalize">
                        {r.charAt(0).toUpperCase() + r.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Select
                  value={editForm.status}
                  onValueChange={(v) =>
                    setEditForm((f) => ({ ...f, status: v as UserStatus }))
                  }
                >
                  <SelectTrigger data-ocid="users.edit_user.status.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(UserStatus).map((s) => (
                      <SelectItem key={s} value={s} className="capitalize">
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                data-ocid="users.edit_user.cancel_button"
                onClick={() => setEditUser(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                data-ocid="users.edit_user.save_button"
                disabled={updateUser.isPending}
              >
                {updateUser.isPending ? "Saving…" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Toggle status confirm */}
      <AlertDialog
        open={toggleUser != null}
        onOpenChange={(o) => !o && setToggleUser(null)}
      >
        <AlertDialogContent data-ocid="users.toggle_status.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {toggleUser?.status === UserStatus.active
                ? `Deactivate ${toggleUser?.name}?`
                : `Reactivate ${toggleUser?.name}?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {toggleUser?.status === UserStatus.active
                ? "This user will lose access to the system until reactivated."
                : "This user will regain full access to the system."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="users.toggle_status.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="users.toggle_status.confirm_button"
              onClick={handleToggleStatus}
              className={
                toggleUser?.status === UserStatus.active
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : ""
              }
            >
              {updateUser.isPending
                ? "Updating…"
                : toggleUser?.status === UserStatus.active
                  ? "Deactivate"
                  : "Reactivate"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete confirm */}
      <AlertDialog
        open={deleteUserId != null}
        onOpenChange={(o) => !o && setDeleteUserId(null)}
      >
        <AlertDialogContent data-ocid="users.delete_confirm.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove user?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The user will be permanently removed
              from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="users.delete_confirm.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="users.delete_confirm.confirm_button"
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteUser.isPending ? "Removing…" : "Remove user"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
