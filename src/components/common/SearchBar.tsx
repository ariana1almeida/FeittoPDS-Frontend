import React, {useState} from 'react';

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
                <div className="flex items-center bg-white rounded-4xl shadow-md overflow-hidden p-2 gap-2">
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className="flex-1 px-3 py-2 text-gray-700 focus:outline-none focus:ring-none"
                    />
                    <button
                        type="submit"
                        aria-label="Buscar"
                        className="flex items-center justify-center w-10 h-10 bg-primary-dark text-white rounded-full hover:bg-primary-dark/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:ring-offset-2"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
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