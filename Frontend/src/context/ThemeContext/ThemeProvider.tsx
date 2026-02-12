import { useMemo, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { ThemeContext, type ThemeContextType } from './ThemeContext';
import { lightTheme, darkTheme, type ThemeMode } from './colors';

interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_STORAGE_KEY = 'app-theme';

/**
 * Theme Provider Component
 * Manages application theme (light/dark mode)
 * Persists theme preference in localStorage
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // First priority: check localStorage for saved theme
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    // Second priority: check if dark class is already on the HTML element
    if (typeof window !== 'undefined' && document.documentElement.classList.contains('dark')) {
      return 'dark';
    }

    // Last resort: check system preference
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }

    return 'light';
  });

  // Get colors based on current mode (memoized to prevent unnecessary recreations)
  const colors = useMemo(
    () => (mode === 'light' ? lightTheme : darkTheme),
    [mode]
  );

  // Apply theme to DOM
  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
      console.log('Applied dark theme to DOM');
    } else {
      root.classList.remove('dark');
      console.log('Applied light theme to DOM');
    }
    localStorage.setItem(THEME_STORAGE_KEY, mode);
    console.log('Theme saved to localStorage:', mode);
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      console.log('Theme toggled from', prevMode, 'to', newMode);
      return newMode;
    });
  }, []);

  const setTheme = useCallback((newMode: ThemeMode) => {
    setMode(newMode);
  }, []);

  const value: ThemeContextType = useMemo(
    () => ({
      mode,
      colors,
      toggleTheme,
      setTheme,
    }),
    [mode, colors, toggleTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
