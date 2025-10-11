import React, { useState } from 'react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Pesquisar...",
  className = ""
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="flex-1 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:ring-inset"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-primary-dark font-semibold hover:bg-accent-yellow-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:ring-offset-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
