import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export function useAuth() {
  const {
    login,
    clear,
    loginStatus,
    identity,
    isAuthenticated,
    isInitializing,
  } = useInternetIdentity();

  const principalId = identity?.getPrincipal().toText();

  return {
    isAuthenticated,
    isLoading: isInitializing,
    login,
    logout: clear,
    identity,
    principalId,
    loginStatus,
  };
}
