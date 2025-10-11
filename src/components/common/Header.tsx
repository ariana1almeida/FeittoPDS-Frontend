import { useAuth } from '../../hooks/useAuth.ts';
import { useState } from 'react';

export default function Header() {
  const { authData, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-neutral-light shadow">
      <div className="text-2xl font-bold text-neutral-900">FEITTO</div>

      {!authData ? (
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateTo('/login')}
            className="px-4 py-2 text-primary-dark hover:text-accent-yellow transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => navigateTo('/register')}
            className="px-4 py-2 bg-accent-yellow text-primary-dark font-semibold rounded-lg hover:bg-accent-yellow-hover transition-colors"
          >
            Cadastre-se
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-full hover:bg-neutral-100 transition"
            aria-label="Notificações"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 1 0-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button
            className="p-2 rounded-full hover:bg-neutral-100 transition"
            aria-label="Perfil"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
            </svg>
          </button>
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-neutral-100 transition"
              aria-label="Menu"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-primary-dark hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}