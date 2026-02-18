import { useNavigate, useLocation } from 'react-router-dom';

/** ─── Types ─── */
interface NavChild {
  label: string;
  path: string;
}

interface NavItem {
  key: string;
  label: string;
  path?: string;
  icon: React.ReactNode;
  children?: NavChild[];
}

interface SidebarProps {
  isExpanded: boolean;
  isMobileOpen: boolean;
  expandedMenu: string | null;
  isMobile: boolean;
  toggleExpanded: () => void;
  closeMobile: () => void;
  toggleMenu: (key: string) => void;
  setIsExpanded: (v: boolean) => void;
}

/** ─── Icons (inline SVGs to avoid external deps) ─── */
const icons = {
  dashboard: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
    </svg>
  ),
  projects: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  ),
  chevron: (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
  collapse: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
    </svg>
  ),
  expand: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    </svg>
  ),
  close: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

/** ─── Nav config ─── */
const navItems: NavItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: icons.dashboard,
  },
  {
    key: 'projects',
    label: 'Projects',
    icon: icons.projects,
    children: [
      { label: 'All Projects', path: '/projects' },
      { label: 'My Tasks', path: '/projects/tasks' },
      { label: 'Timeline', path: '/projects/timeline' },
    ],
  }
];

/** ─── Component ─── */
export const Sidebar = ({
  isExpanded,
  isMobileOpen,
  expandedMenu,
  isMobile,
  toggleExpanded,
  closeMobile,
  toggleMenu,
  setIsExpanded,
}: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path?: string) => path && location.pathname === path;
  const isParentActive = (item: NavItem) =>
    item.children?.some((c) => location.pathname.startsWith(c.path));

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) closeMobile();
  };

  /** Shared nav list renderer */
  const renderNavItems = (expanded: boolean) =>
    navItems.map((item) => {
      const active = isActive(item.path) || isParentActive(item);
      const hasChildren = !!item.children?.length;
      const menuOpen = expandedMenu === item.key;

      return (
        <li key={item.key}>
          <button
            onClick={() => {
              if (hasChildren) {
                toggleMenu(item.key);
                if (!expanded && !isMobile) setIsExpanded(true);
              } else if (item.path) {
                handleNavigate(item.path);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (hasChildren) toggleMenu(item.key);
                else if (item.path) handleNavigate(item.path);
              }
            }}
            title={!expanded ? item.label : undefined}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
              transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-amber-500
              ${
                active
                  ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
              }
              ${!expanded ? 'justify-center' : ''}
            `}
            aria-expanded={hasChildren ? menuOpen : undefined}
          >
            <span className={active ? 'text-amber-600 dark:text-amber-400' : 'text-gray-500 dark:text-gray-400'}>
              {item.icon}
            </span>

            {expanded && (
              <>
                <span className="flex-1 text-left whitespace-nowrap">{item.label}</span>
                {hasChildren && (
                  <span
                    className={`transition-transform duration-200 ${menuOpen ? 'rotate-90' : ''}`}
                  >
                    {icons.chevron}
                  </span>
                )}
              </>
            )}
          </button>

          {/* Children / Sub-nav */}
          {hasChildren && expanded && (
            <ul
              className={`overflow-hidden transition-all duration-200 ${
                menuOpen ? 'max-h-60 opacity-100 mt-1' : 'max-h-0 opacity-0'
              }`}
            >
              {item.children!.map((child) => (
                <li key={child.path}>
                  <button
                    onClick={() => handleNavigate(child.path)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleNavigate(child.path);
                      }
                    }}
                    className={`
                      w-full text-left pl-11 pr-3 py-2 rounded-lg text-sm transition-all
                      outline-none focus-visible:ring-2 focus-visible:ring-amber-500
                      ${
                        isActive(child.path)
                          ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
                      }
                    `}
                  >
                    {child.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    });

  /** ─── Mobile Drawer ─── */
  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 transition-opacity"
            onClick={closeMobile}
            aria-hidden="true"
          />
        )}

        {/* Drawer */}
        <aside
          className={`
            fixed top-0 left-0 h-full w-72 bg-white dark:bg-zinc-900
            border-r border-gray-200 dark:border-zinc-800
            z-50 flex flex-col
            transition-transform duration-300 ease-in-out
            ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-zinc-800">
            <span className="text-xl font-bold text-amber-600 dark:text-amber-400">FlowStack</span>
            <button
              onClick={closeMobile}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-300"
              aria-label="Close navigation"
            >
              {icons.close}
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1" role="menubar">
              {renderNavItems(true)}
            </ul>
          </nav>
        </aside>
      </>
    );
  }

  /** ─── Desktop Sidebar ─── */
  return (
    <aside
      onMouseEnter={() => {
        if (!isExpanded) setIsExpanded(true);
      }}
      onMouseLeave={() => {
        if (isExpanded) setIsExpanded(false);
      }}
      className={`
        hidden lg:flex flex-col shrink-0
        bg-white dark:bg-zinc-900
        border-r border-gray-200 dark:border-zinc-800
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-60' : 'w-16'}
      `}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Toggle button */}
      <div className={`flex items-center px-3 py-3 ${isExpanded ? 'justify-end' : 'justify-center'}`}>
        <button
          onClick={toggleExpanded}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 dark:text-gray-400 transition"
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isExpanded ? icons.collapse : icons.expand}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 pb-4">
        <ul className="space-y-1" role="menubar">
          {renderNavItems(isExpanded)}
        </ul>
      </nav>
    </aside>
  );
};
