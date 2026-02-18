import { useState, useCallback, useEffect } from 'react';

export interface SidebarState {
  isExpanded: boolean;
  isMobileOpen: boolean;
  expandedMenu: string | null;
}

const DESKTOP_BREAKPOINT = 1024;

export const useSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < DESKTOP_BREAKPOINT : false
  );

  // Track responsive breakpoint
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < DESKTOP_BREAKPOINT;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const toggleMenu = useCallback((menuKey: string) => {
    setExpandedMenu((prev) => (prev === menuKey ? null : menuKey));
  }, []);

  return {
    isExpanded,
    isMobileOpen,
    expandedMenu,
    isMobile,
    toggleExpanded,
    toggleMobile,
    closeMobile,
    toggleMenu,
    setIsExpanded,
  };
};
