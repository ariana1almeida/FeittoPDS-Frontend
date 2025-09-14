import React from 'react';

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow">
      <div className="text-2xl font-bold text-neutral-900">FEITTO</div>
      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-full hover:bg-neutral-100 transition"
          aria-label="Notificações"
        >
          {/* Ícone de sino (notificação) */}
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 1 0-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
          </svg>
        </button>
        <button
          className="p-2 rounded-full hover:bg-neutral-100 transition"
          aria-label="Perfil"
        >
          {/* Ícone de usuário (perfil) */}
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
          </svg>
        </button>
      </div>
    </header>
  );
}