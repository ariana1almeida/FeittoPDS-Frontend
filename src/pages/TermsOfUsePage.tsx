import BackButton from "../components/common/BackButton.tsx";
import H1 from "../components/common/H1.tsx";
import TermsContent from "../components/terms/TermsContent.tsx";
import PrivacyContent from "../components/terms/PrivacyContent.tsx";
import { useState } from "react";

export default function TermsOfUsePage() {
    const [activeSection, setActiveSection] = useState<'terms' | 'privacy'>('terms');

    return (
        <div className="min-h-screen flex flex-col bg-neutral-light">
            <div className="flex flex-col flex-1 max-w-7xl mx-auto w-full">
                <div className="max-w-7xl px-8 py-12 h-16 flex items-center justify-start">
                    <BackButton />
                </div>
                <div className="flex flex-col justify-start items-center flex-1 px-4 pb-12">
                    <H1 className="text-primary-dark mb-2">
                        {activeSection === 'terms' ? 'Termos e Condições de Uso' : 'Política de Privacidade'}
                    </H1>
                    <p className="text-sm text-neutral-medium mb-8">Última atualização: 04 de novembro de 2025</p>

                    <div className="flex w-full max-w-6xl">
                        <aside className="w-50">
                            <nav className="sticky top-8 space-y-2 p-2">
                                <p className="text-sm font-semibold text-primary-dark mb-3">Navegação</p>
                                <button
                                    onClick={() => setActiveSection('terms')}
                                    className={"w-full text-left px-3 py-2 rounded-md text-sm text-primary-dark"}
                                >
                                    Termos de Uso
                                </button>
                                <button
                                    onClick={() => setActiveSection('privacy')}
                                    className={"w-full text-left px-3 py-2 text-sm text-primary-dark"}
                                >
                                    Política de Privacidade
                                </button>
                            </nav>
                        </aside>

                        <div className="flex-1 bg-white p-8 rounded-lg shadow-md">
                            {activeSection === 'terms' ? <TermsContent /> : <PrivacyContent />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
