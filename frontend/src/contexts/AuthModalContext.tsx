import React from 'react';
import {useState, useContext, useMemo, createContext} from 'react';

/*create a context to manage the state of authentication modals,
so all components can access and modify the state without prop drilling*/
export type AuthModalMode = 'login' | 'register' | null; //union type to give 3 possible values
type AuthModalContextValue = {
    mode: AuthModalMode;
    openAuthModal: (mode: Exclude<AuthModalMode, null>) => void;
    closeAuthModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null);//iinitialize with null

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<AuthModalMode>(null);
  
    const value = useMemo<AuthModalContextValue>(//?
      () => ({
        mode,
        openAuthModal: (m) => setMode(m),
        closeAuthModal: () => setMode(null),
      }),
      [mode]
     
    );
  
    return (
        <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
      );
    
}  
export function useAuthModal() {
const ctx = useContext(AuthModalContext);
if (!ctx) {
    throw new Error("useAuthModal must be used within <AuthModalProvider>");
}
return ctx;
}