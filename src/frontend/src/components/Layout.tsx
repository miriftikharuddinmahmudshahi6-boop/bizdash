import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

function getInitials(principalId?: string): string {
  if (!principalId) return "U";
  return principalId.slice(0, 2).toUpperCase();
}

function formatPrincipal(principalId?: string): string {
  if (!principalId) return "Anonymous";
  if (principalId.length > 16) {
    return `${principalId.slice(0, 8)}...${principalId.slice(-4)}`;
  }
  return principalId;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { logout, principalId } = useAuth();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((c) => !c)}
      />

      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header
          data-ocid="header"
          className="flex items-center justify-between px-6 h-14 bg-card border-b border-border shadow-xs flex-shrink-0"
        >
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-foreground text-base tracking-tight">
              BizDash
            </span>
            <span className="text-muted-foreground/40 text-sm">/</span>
            <span className="text-muted-foreground text-sm font-medium">
              Business Intelligence
            </span>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  data-ocid="header.user_menu"
                  className="flex items-center gap-2.5 px-2 h-9 hover:bg-muted/50"
                >
                  <Avatar className="size-7">
                    <AvatarFallback className="text-xs font-mono bg-primary/20 text-primary">
                      {getInitials(principalId)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-mono text-xs text-muted-foreground hidden sm:block">
                    {formatPrincipal(principalId)}
                  </span>
                  <ChevronDown className="size-3 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-xs text-muted-foreground font-mono truncate">
                    {principalId ?? "Anonymous"}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  data-ocid="header.logout_button"
                  onClick={logout}
                  className="text-destructive focus:text-destructive gap-2 cursor-pointer"
                >
                  <LogOut className="size-3.5" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content */}
        <main
          data-ocid="main_content"
          className="flex-1 overflow-y-auto bg-background"
        >
          {children}
        </main>

        {/* Footer */}
        <footer className="flex-shrink-0 flex items-center justify-center px-6 h-9 bg-muted/40 border-t border-border/40">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
