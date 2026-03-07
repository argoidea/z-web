import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/collections', label: 'Collections' },
  { to: '/drawings', label: 'Other Drawings' },
];

export function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zeneth-border bg-zeneth-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-display text-2xl tracking-widest text-white transition hover:text-zeneth-purple">
          ZENETH
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm font-semibold uppercase tracking-wider transition hover:text-zeneth-purple ${
                location.pathname === to || (to !== '/' && location.pathname.startsWith(to))
                  ? 'text-zeneth-purple graffiti-underline'
                  : 'text-white/90'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-white transition ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>
      {mobileOpen && (
        <div className="border-t border-zeneth-border bg-zeneth-bg py-4 md:hidden">
          <div className="flex flex-col gap-4 px-4">
            {nav.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-semibold uppercase tracking-wider ${
                  location.pathname === to || (to !== '/' && location.pathname.startsWith(to))
                    ? 'text-zeneth-purple'
                    : 'text-white/90'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
