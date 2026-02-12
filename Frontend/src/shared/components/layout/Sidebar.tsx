import { useAuth } from '@/context/AuthContext/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: 'Projects', path: '/dashboard/projects', icon: '📁' },
    { label: 'Tasks', path: '/dashboard/tasks', icon: '✓' },
    { label: 'Subscription', path: '/subscription', icon: '💳' },
    { label: 'Settings', path: '/dashboard/settings', icon: '⚙️' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="hidden lg:block w-64 bg-gray-800 text-white min-h-[calc(100vh-64px)] shadow-lg">
      <nav className="p-6 space-y-2">
        {navItems.map(item => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path) ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="absolute bottom-0 w-64 p-6 border-t border-gray-700">
        <div className="text-sm text-gray-400">
          <p>© 2026 FlowStack</p>
          <p>v1.0.0</p>
        </div>
      </div>
    </aside>
  );
};
