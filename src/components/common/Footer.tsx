import { useNavigate } from "react-router-dom";
import LogoWhite from '../../assets/LogoWhite.svg';
import {
    InstagramLogoIcon, LinkedinLogoIcon, PhoneIcon, EnvelopeIcon
} from '@phosphor-icons/react';

export default function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="w-full bg-neutral-dark text-white py-8 px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <img src={LogoWhite} alt="FEITTO" className="h-8 w-auto" />
                    </div>
                    <p className="text-sm text-neutral-light mr-14">
                        Conectamos você aos melhores profissionais do litoral norte gaúcho.
                    </p>
                    <div className="flex gap-3">
                        <a href="https://www.instagram.com/ariafromforks">
                            <InstagramLogoIcon size={24} weight="regular" />
                        </a>
                        <a href="https://www.linkedin.com/in/arianaqalmeida/">
                            <LinkedinLogoIcon size={24} weight="regular" />
                        </a>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-lg mb-2">LINKS</h3>
                    <button
                        onClick={() => {
                            navigate('/');
                            setTimeout(() => {
                                document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                        }}
                        className="text-left text-sm text-neutral-300 hover:text-white transition-colors"
                    >
                        Nossos Serviços
                    </button>
                    <button
                        onClick={() => {
                            navigate('/');
                            setTimeout(() => {
                                document.getElementById('funciona')?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                        }}
                        className="text-left text-sm text-neutral-300 hover:text-white transition-colors"
                    >
                        Como Funciona
                    </button>
                    <button
                        onClick={() => {
                            navigate('/');
                            setTimeout(() => {
                                document.getElementById('motivos')?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                        }}
                        className="text-left text-sm text-neutral-300 hover:text-white transition-colors"
                    >
                        Por que escolher a FEITTO?
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-lg mb-2">CONTATO</h3>
                    <a
                        href="tel:+5551992805348"
                        className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors"
                    >
                        <PhoneIcon size={20} weight="regular" />
                        (51) 99280-5348
                    </a>
                    <a
                        href="mailto:ariana.almeida@rede.ulbra.br"
                        className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors"
                    >
                        <EnvelopeIcon size={20} weight="regular" />
                        ariana.almeida@rede.ulbra.br
                    </a>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-neutral-700 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-400">
                <p>© 2025 FEITTO, Todos os direitos reservados.</p>
                <div className="flex gap-6">
                    <button
                        onClick={() => navigate('/terms')}
                        className="hover:text-white transition-colors"
                    >
                        Termos de Uso e Políticas de Privacidade
                    </button>
                </div>
            </div>
        </footer>
    );
}