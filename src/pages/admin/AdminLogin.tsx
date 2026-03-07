import { useState, FormEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export function AdminLogin() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (login(username, password)) {
      return;
    }
    setError('Invalid username or password.');
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded border border-zeneth-border bg-zeneth-surface p-8"
      >
        <h1 className="font-display text-2xl tracking-widest text-zeneth-purple">
          Admin login
        </h1>
        <p className="mt-2 text-sm text-white/80">
          Enter your credentials to access the admin area.
        </p>
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white/80">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="mt-1 w-full rounded border border-zeneth-border bg-zeneth-bg px-3 py-2 text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="mt-1 w-full rounded border border-zeneth-border bg-zeneth-bg px-3 py-2 text-white"
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
          <button
            type="submit"
            className="w-full rounded bg-zeneth-purple py-2 font-semibold text-zeneth-bg transition hover:opacity-90"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
