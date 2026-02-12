import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext/useAuth';

/**
 * Main layout wrapper component
 * Includes header, sidebar (for authenticated users), main content, and footer
 */
export const MainLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-zinc-900">
      {/* Header */}
      <Header />

      {/* Main Container */}
      <div className="flex flex-1">
        {/* Sidebar - visible only for authenticated users */}
        {isAuthenticated && <Sidebar />}

        {/* Main Content */}
        <main className={`flex-1 ${isAuthenticated ? 'lg:ml-0' : ''}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
