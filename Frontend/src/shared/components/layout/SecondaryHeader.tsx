import { useNavigate, useLocation } from 'react-router-dom';

export const SecondaryHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Projects', path: '/dashboard/projects' },
    { label: 'Tasks', path: '/dashboard/tasks' },
    { label: 'Subscription', path: '/subscription' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 shadow-sm overflow-x-auto no-scrollbar">
      <div className="px-6 h-11 flex items-center justify-center space-x-0 min-w-max md:min-w-0">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`px-6 h-full flex items-center justify-center text-xs font-bold transition-all relative ${
              isActive(item.path)
                ? 'text-amber-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-amber-500'
            }`}
          >
            <span className="uppercase ">{item.label}</span>
            {isActive(item.path) && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
