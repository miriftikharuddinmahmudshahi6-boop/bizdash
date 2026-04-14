import { Button } from "@/components/ui/button";
import { BarChart3, DollarSign, TrendingUp, Users } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const FEATURES = [
  {
    icon: DollarSign,
    label: "Revenue tracking",
    desc: "Real-time revenue metrics and aggregates",
  },
  {
    icon: Users,
    label: "User management",
    desc: "Manage team members and access roles",
  },
  {
    icon: TrendingUp,
    label: "Business health",
    desc: "Day-to-day KPI monitoring at a glance",
  },
];

export default function LoginPage() {
  const { login, isLoading } = useAuth();

  return (
    <div
      data-ocid="login.page"
      className="min-h-screen bg-background flex items-center justify-center p-6"
    >
      <div className="w-full max-w-md">
        {/* Logo mark */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center justify-center size-14 rounded-xl bg-primary/15 text-primary mb-4 shadow-elevated">
            <BarChart3 className="size-7" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-foreground tracking-tight mb-1">
            BizDash
          </h1>
          <p className="text-muted-foreground text-sm text-center">
            Business intelligence for your day-to-day operations
          </p>
        </div>

        {/* Feature list */}
        <div className="space-y-3 mb-8">
          {FEATURES.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex items-start gap-3 p-3.5 rounded-lg bg-card border border-border/60"
            >
              <div className="flex items-center justify-center size-8 rounded-md bg-primary/10 text-primary flex-shrink-0 mt-0.5">
                <Icon className="size-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Button
          data-ocid="login.submit_button"
          onClick={() => login()}
          disabled={isLoading}
          className="w-full h-11 font-medium"
          size="lg"
        >
          {isLoading ? "Connecting..." : "Sign in with Internet Identity"}
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Secured by the Internet Computer. No passwords needed.
        </p>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center text-xs text-muted-foreground/50">
        © {new Date().getFullYear()} Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-muted-foreground transition-colors"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
