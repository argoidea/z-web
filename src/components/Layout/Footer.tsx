import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-zeneth-border bg-zeneth-surface py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link to="/" className="font-display text-xl tracking-widest text-white">
            ZENETH
          </Link>
          <nav className="flex gap-8 text-sm text-white">
            <Link to="/about" className="transition hover:text-zeneth-purple">About</Link>
            <Link to="/collections" className="transition hover:text-zeneth-purple">Collections</Link>
            <Link to="/drawings" className="transition hover:text-zeneth-purple">Drawings</Link>
          </nav>
        </div>
        <p className="mt-8 text-center text-xs text-white/80">
          © {new Date().getFullYear()} Zeneth. Dark gothic & graffiti-inspired fashion.
        </p>
      </div>
    </footer>
  );
}
