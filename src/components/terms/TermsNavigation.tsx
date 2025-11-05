import TermsContent from "./TermsContent.tsx";
import PrivacyContent from "./PrivacyContent.tsx";

interface TermsNavigationProps {
    activeSection: 'terms' | 'privacy';
    onSectionChange: (section: 'terms' | 'privacy') => void;
}

export default function TermsNavigation({ activeSection, onSectionChange }: TermsNavigationProps) {
    return (
        <div className="flex flex-col w-full">
            {/* Título principal fora do container */}
            <h1 className="text-3xl font-bold text-primary-dark mb-8">
                {activeSection === 'terms' ? 'Termos de Uso' : 'Política de Privacidade'}
            </h1>

            <div className="flex gap-8">
                {/* Índice lateral */}
                <aside className="w-64">
                    <nav className="sticky top-8 space-y-2">
                        <p className="text-sm font-semibold text-primary-dark mb-3">Navegação</p>
                        <button
                            onClick={() => onSectionChange('terms')}
                            className={`w-full text-left px-3 py-2 text-sm ${
                                activeSection === 'terms'
                                    ? 'font-semibold text-primary-dark'
                                    : 'text-neutral-medium hover:text-primary-dark'
                            }`}
                        >
                            Termos de Uso
                        </button>
                        <button
                            onClick={() => onSectionChange('privacy')}
                            className={`w-full text-left px-3 py-2 text-sm ${
                                activeSection === 'privacy'
                                    ? 'font-semibold text-primary-dark'
                                    : 'text-neutral-medium hover:text-primary-dark'
                            }`}
                        >
                            Política de Privacidade
                        </button>
                    </nav>
                </aside>

                {/* Conteúdo principal */}
                <main className="flex-1 bg-white p-8 rounded-lg shadow-md">
                    {activeSection === 'terms' ? <TermsContent /> : <PrivacyContent />}
                </main>
            </div>
        </div>
    );
}
