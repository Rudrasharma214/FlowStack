import { Header } from './';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext/useAuth';
import { useSidebar } from '@/shared/hooks/useSidebar';

/**
 * Main layout wrapper component
 * Includes header, secondary navigation (for authenticated users), main content, and footer
 */
export const MainLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const sidebar = useSidebar();

  if (isLoading && isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-zinc-950">
        {/* Main Header - Brand and Actions */}
        <Header onMenuToggle={sidebar.toggleMobile} showMenuButton />

        {/* Secondary Navigation Header - Page Links */}
        {/* <SecondaryHeader /> */}

        {/* Body: Sidebar + Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar {...sidebar} />

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-zinc-900">
      <Header />

      <div className="flex flex-1">
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>

      {location.pathname === '/welcome' && <Footer />}
    </div>
  );
};
