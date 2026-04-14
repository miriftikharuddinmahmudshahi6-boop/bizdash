import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";

// Lazy-load pages
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const RevenuePage = lazy(() => import("./pages/RevenuePage"));
const UsersPage = lazy(() => import("./pages/UsersPage"));

// Auth guard component
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="space-y-3 w-48">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <Layout>{children}</Layout>;
}

function PageLoader() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
          <Skeleton key={`sk-${i}`} className="h-28 rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-lg" />
    </div>
  );
}

// Root layout route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Auth-guarded routes
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <AuthGuard>
      <Suspense fallback={<PageLoader />}>
        <DashboardPage />
      </Suspense>
    </AuthGuard>
  ),
});

const revenueRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/revenue",
  component: () => (
    <AuthGuard>
      <Suspense fallback={<PageLoader />}>
        <RevenuePage />
      </Suspense>
    </AuthGuard>
  ),
});

const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/users",
  component: () => (
    <AuthGuard>
      <Suspense fallback={<PageLoader />}>
        <UsersPage />
      </Suspense>
    </AuthGuard>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  revenueRoute,
  usersRoute,
  loginRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
