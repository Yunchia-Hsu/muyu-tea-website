import React from "react";
import { useState, useContext, useMemo, createContext } from "react";

// Context for auth modal state to avoid prop drilling.
export type AuthModalMode = "login" | "register" | null;
// Define context type.
type AuthModalContextValue = {
  mode: AuthModalMode;
  openAuthModal: (mode: Exclude<AuthModalMode, null>) => void; 
  closeAuthModal: () => void;
};
const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<AuthModalMode>(null);
  // Memoize context value to avoid unnecessary rerenders.
  const value = useMemo<AuthModalContextValue>(
    () => ({
      mode,
      openAuthModal: (m) => setMode(m),
      closeAuthModal: () => setMode(null),
    }),
    [mode]  
  );

  return (
    <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>
  );
}
// Hook for consuming auth modal context.
export function useAuthModal() {
  const ctx = useContext(AuthModalContext); 
  if (!ctx) {
    throw new Error("useAuthModal must be used within <AuthModalProvider>");
  }
  return ctx;
}
