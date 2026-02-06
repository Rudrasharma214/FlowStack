import React from 'react';
import { ErrorBoundary } from '../errorBoundry/errorBoundry';

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Wrapper component for all application providers
 * Add context providers, theme providers, etc. here
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      {/* Add your providers here */}
      {/* <ThemeProvider> */}
      {/* <QueryClientProvider> */}
      {children}
      {/* </QueryClientProvider> */}
      {/* </ThemeProvider> */}
    </ErrorBoundary>
  );
};
