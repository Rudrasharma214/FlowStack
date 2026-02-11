import { useContext } from 'react';
import { ThemeContext, type ThemeContextType } from './ThemeContext';

/**
 * Custom hook to use theme context
 * @throws Error if used outside ThemeProvider
 * @returns ThemeContextType with mode, colors, toggleTheme, and setTheme
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
