import { createContext, useCallback, useContext, useMemo, useState } from "react";

const AuthModalContext = createContext(null);

// Single source of truth for the auth dialog: which mode is open, or none.
// openAuth("signin" | "signup") from anywhere — Header today, other CTAs later.
export function AuthModalProvider({ children }) {
  const [state, setState] = useState({ open: false, mode: "signin" });

  const openAuth = useCallback(
    (mode = "signin") => setState({ open: true, mode }),
    []
  );
  const closeAuth = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  const setMode = useCallback(
    (mode) => setState((s) => (s.mode === mode ? s : { ...s, mode })),
    []
  );

  const value = useMemo(
    () => ({ open: state.open, mode: state.mode, openAuth, closeAuth, setMode }),
    [state.open, state.mode, openAuth, closeAuth, setMode]
  );

  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>;
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used inside <AuthModalProvider>");
  return ctx;
}