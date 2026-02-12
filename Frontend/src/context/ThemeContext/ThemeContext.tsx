import { createContext } from 'react';
import type { ThemeType, ThemeMode } from './colors';

export interface ThemeContextType {
  mode: ThemeMode;
  colors: ThemeType;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
