import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const tabs = [
  { to: '/admin', label: 'About' },
  { to: '/admin/collections', label: 'Collections' },
  { to: '/admin/drawings', label: 'Drawings' },
];

export function AdminLayout() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-zeneth-bg">
      <header className="sticky top-0 z-50 border-b border-zeneth-border bg-zeneth-surface">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <span className="font-display text-xl tracking-widest text-white">Admin</span>
          <nav className="flex gap-6">
            {tabs.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm font-medium ${
                  location.pathname === to ? 'text-zeneth-purple' : 'text-zeneth-muted hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link to="/" className="text-sm text-zeneth-muted hover:text-zeneth-purple">
              View site →
            </Link>
            <button
              type="button"
              onClick={logout}
              className="text-sm text-zeneth-muted hover:text-zeneth-purple"
            >
              Log out
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
