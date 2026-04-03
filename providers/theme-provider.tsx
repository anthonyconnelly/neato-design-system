"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isThemeValue(value: string | null): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

function resolveTheme(theme: Theme, systemTheme: ResolvedTheme): ResolvedTheme {
  if (theme === "system") {
    return systemTheme;
  }

  return theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applySystemTheme = (matches: boolean) => {
      setSystemTheme(matches ? "dark" : "light");
    };

    applySystemTheme(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      applySystemTheme(event.matches);
    };

    mediaQuery.addEventListener("change", listener);

    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    if (isThemeValue(storedTheme)) {
      setThemeState(storedTheme);
    }

    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  }, []);

  const resolvedTheme = useMemo(() => resolveTheme(theme, systemTheme), [theme, systemTheme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", resolvedTheme === "dark");
  }, [resolvedTheme]);

  const toggleTheme = useCallback(() => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  }, [resolvedTheme, setTheme]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
