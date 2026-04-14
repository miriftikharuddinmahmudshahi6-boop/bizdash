import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  ChevronLeft,
  DollarSign,
  LayoutDashboard,
  Users,
} from "lucide-react";

const NAV_ITEMS = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/revenue", label: "Revenue", icon: DollarSign },
  { path: "/users", label: "Users", icon: Users },
] as const;

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <aside
      data-ocid="sidebar"
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex-shrink-0",
        collapsed ? "w-16" : "w-56",
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center border-b border-sidebar-border px-4 h-14",
          collapsed ? "justify-center" : "gap-3",
        )}
      >
        <div className="flex items-center justify-center size-7 rounded bg-primary/20 text-primary flex-shrink-0">
          <BarChart3 className="size-4" />
        </div>
        {!collapsed && (
          <span className="font-display font-semibold text-sidebar-foreground tracking-tight text-base">
            BizDash
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2 py-4 space-y-0.5">
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
          const isActive =
            path === "/" ? currentPath === "/" : currentPath.startsWith(path);

          return (
            <Link
              key={path}
              to={path}
              data-ocid={`nav.${label.toLowerCase()}.link`}
              className={cn(
                "flex items-center rounded-md px-2.5 py-2 text-sm transition-smooth gap-3",
                collapsed && "justify-center px-2",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
              title={collapsed ? label : undefined}
            >
              <Icon className="size-4 flex-shrink-0" />
              {!collapsed && <span className="font-medium">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="px-2 pb-4">
        <Button
          variant="ghost"
          size="sm"
          data-ocid="sidebar.toggle"
          onClick={onToggle}
          className={cn(
            "w-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            collapsed ? "justify-center px-2" : "justify-start gap-3 px-2.5",
          )}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            className={cn(
              "size-4 flex-shrink-0 transition-transform duration-300",
              collapsed && "rotate-180",
            )}
          />
          {!collapsed && <span className="text-sm">Collapse</span>}
        </Button>
      </div>
    </aside>
  );
}
