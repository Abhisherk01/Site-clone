import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "meridian-theme";

const ThemeContext = createContext(null);

// Default: stored choice → system preference → dark (dark-first brand).
// Duplicated in the no-flash script in index.html — keep in sync.
function getInitialTheme() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* storage blocked (private mode) — fall through to system preference */
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function ThemeProvider({ children }) {

  const THEME_COLORS = { dark: "#0e100f", light: "#f6f8f6" };
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", THEME_COLORS[theme]);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore — non-persistent themes are fine */
    }
  }, [theme]);

  const value = {
    theme,
    toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}