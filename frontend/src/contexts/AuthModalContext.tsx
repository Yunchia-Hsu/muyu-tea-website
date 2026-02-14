import React from "react";
import { useState, useContext, useMemo, createContext } from "react";

/*create a context to manage the state of authentication modals,
so all components can access and modify the state without prop drilling
*/
export type AuthModalMode = "login" | "register" | null; //union type
//define context type
type AuthModalContextValue = {
  mode: AuthModalMode;
  openAuthModal: (mode: Exclude<AuthModalMode, null>) => void; //Exclude is Utility Type help compor to check the type (not null)
  closeAuthModal: () => void;
};
const AuthModalContext = createContext<AuthModalContextValue | null>(null); //create a shared space

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<AuthModalMode>(null);
  const value = useMemo<AuthModalContextValue>(
    () => ({
      mode,
      openAuthModal: (m) => setMode(m),
      closeAuthModal: () => setMode(null),
    }),
    [mode]
  );

  return (
    <AuthModalContext.Provider value={value}>
      {" "}
      {/* context component , save "AuthModalContextValue" to context and broadcast to all */}
      {children}
    </AuthModalContext.Provider>
  );
}
export function useAuthModal() {
  const ctx = useContext(AuthModalContext); //在任何子元件拿資料
  if (!ctx) {
    throw new Error("useAuthModal must be used within <AuthModalProvider>");
  }
  return ctx;
}
