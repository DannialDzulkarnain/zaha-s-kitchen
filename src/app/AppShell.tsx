import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coffee, LogOut, Menu as MenuIcon, X } from 'lucide-react';
import type { User } from '@/types';
import { SHELLLESS_ROUTES, type NavItem } from './navigation';

interface AppShellProps {
  user: User;
  navItems: NavItem[];
  children: React.ReactNode;
}

interface SidebarProps {
  user: User;
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  activePath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ user, items, isOpen, onClose, activePath }) => {
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm" onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-stone-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-stone-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-orange-500 rounded-lg">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Zaha&apos;s Kitchen</span>
          </Link>
          <button onClick={onClose} className="lg:hidden text-stone-400 hover:text-white" aria-label="Close navigation">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-180px)] scrollbar-hide">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activePath === item.path
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-stone-400 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-stone-800 bg-stone-900">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-stone-700 rounded-full flex items-center justify-center text-lg font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">{user.role}</p>
            </div>
          </div>
          <Link
            to="/"
            className="flex items-center gap-3 w-full px-4 py-3 mt-2 text-stone-400 hover:text-red-400 transition-colors group"
            onClick={onClose}
          >
            <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span className="font-medium">Exit OS</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

const MobileHeader: React.FC<{ onOpen: () => void }> = ({ onOpen }) => (
  <div className="sticky top-0 z-30 flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-stone-200 lg:hidden">
    <button
      onClick={onOpen}
      className="p-2 bg-white rounded-lg shadow-sm border border-stone-200"
      aria-label="Open navigation"
    >
      <MenuIcon className="w-6 h-6" />
    </button>
    <div className="flex items-center gap-2">
      <Coffee className="w-6 h-6 text-orange-500" />
      <span className="text-lg font-bold">Zaha&apos;s Kitchen</span>
    </div>
    <div className="w-10" />
  </div>
);

const AppShell: React.FC<AppShellProps> = ({ user, navItems, children }) => {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const hideShell = SHELLLESS_ROUTES.includes(location.pathname);

  React.useEffect(() => {
    if (hideShell && isSidebarOpen) {
      setSidebarOpen(false);
    }
  }, [hideShell, isSidebarOpen]);

  const filteredNavItems = React.useMemo(
    () => navItems.filter((item) => item.roles.includes(user.role)),
    [navItems, user.role]
  );

  return (
    <div className="flex min-h-screen bg-stone-50">
      {!hideShell && (
        <Sidebar
          user={user}
          items={filteredNavItems}
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activePath={location.pathname}
        />
      )}

      <main className={`flex-1 ${hideShell ? '' : 'lg:ml-64'} flex flex-col min-h-screen overflow-x-hidden`}>
        {!hideShell && <MobileHeader onOpen={() => setSidebarOpen(true)} />}
        <div className={hideShell ? '' : 'p-4 md:p-6 lg:p-8 flex-1'}>{children}</div>
      </main>
    </div>
  );
};

export default AppShell;
