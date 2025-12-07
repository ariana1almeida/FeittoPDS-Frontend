import { useAuth } from '../../hooks/useAuth.ts';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/Logo.svg';
import {UserIcon, SignOutIcon, HouseIcon, XIcon, ListIcon} from '@phosphor-icons/react';

export default function Header() {
    const { authData, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const navigate = useNavigate();

    return (
        <header className="w-full flex items-center justify-between px-10 py-4 bg-white shadow">
            <button className="flex items-center gap-2" onClick={() => navigate("/")}>
                <img src={Logo} alt="FEITTO" className="h-8 w-auto text-2xl font-bold text-neutral-900" />
            </button>

            {!authData ? (
                <div>
                    <button
                        onClick={toggleMenu}
                        className="p-2 rounded-full hover:bg-neutral-100 transition"
                        aria-label="Menu"
                    >
                        <ListIcon size={24} weight="regular" />
                    </button>

                    {isMenuOpen && (
                        <div className="fixed inset-0 bg-neutral-dark/20 z-50" onClick={toggleMenu}>
                            <div
                                className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-xl text-neutral-dark font-bold">Menu</h2>
                                    <button onClick={toggleMenu} aria-label="Fechar">
                                        <XIcon size={24} weight="regular" />
                                    </button>
                                </div>

                                <nav className="flex flex-col gap-4 flex-1">
                                    <button onClick={() => {
                                        navigate('/');
                                        setTimeout(() => {
                                            document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' });
                                        }, 100);
                                        setIsMenuOpen(false);
                                    }} className="text-left py-2 text-neutral-dark hover:text-primary-dark">
                                        Serviços
                                    </button>
                                    <button onClick={() => {
                                        navigate('/');
                                        setTimeout(() => {
                                            document.getElementById('funciona')?.scrollIntoView({ behavior: 'smooth' });
                                        }, 100);
                                        setIsMenuOpen(false);
                                    }} className="text-left py-2 text-neutral-dark hover:text-primary-dark">
                                        Como Funciona
                                    </button>
                                    <button onClick={() => {
                                        navigate('/');
                                        setTimeout(() => {
                                            document.getElementById('motivos')?.scrollIntoView({ behavior: 'smooth' });
                                        }, 100);
                                        setIsMenuOpen(false);
                                    }} className="text-left py-2 text-neutral-dark hover:text-primary-dark">
                                        Por que escolher a FEITTO?
                                    </button>
                                </nav>

                                <div className="flex flex-col gap-3 mt-auto">
                                    <button
                                        onClick={() => {
                                            navigate('/login');
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full py-3 text-neutral-dark font-semibold bg-neutral-light rounded-lg hover:bg-neutral-200 transition-colors"
                                    >
                                        Entrar
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigate('/register');
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full py-3 bg-primary-dark text-white font-semibold rounded-lg hover:bg-primary-medium transition-colors"
                                    >
                                        Cadastrar
                                    </button>
                                    <p className="text-center text-xs text-neutral-medium mt-2">FEITTO © 2025</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <button
                        onClick={toggleMenu}
                        className="p-2 rounded-full hover:bg-neutral-100 transition"
                        aria-label="Menu"
                    >
                        <ListIcon size={24} weight="regular" />
                    </button>

                    {isMenuOpen && (
                        <div className="fixed inset-0 bg-neutral-dark/20 z-50" onClick={toggleMenu}>
                            <div
                                className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-xl text-neutral-dark font-bold">Menu</h2>
                                    <button onClick={toggleMenu} aria-label="Fechar">
                                        <XIcon size={24} weight="regular" />
                                    </button>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-neutral-light rounded-lg mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-primary-dark flex items-center justify-center text-white font-bold">
                                        {authData.userType.charAt(0).toUpperCase()}
                                        {/*TODO: foto de perfil*/}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-neutral-dark">{authData.userType}</p>
                                        {/*TODO: primeiro nome do usuário*/}
                                        <p className="text-sm font-regular text-neutral-medium">{authData.userType}</p>
                                        {/*TODO: printar Cliente ao invés de Client*/}
                                    </div>
                                </div>

                                <nav className="flex flex-col gap-4 flex-1">
                                    <button
                                        onClick={() => {
                                            navigate('/services');
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center gap-3 py-2 text-neutral-dark hover:text-primary-dark"
                                    >
                                        <HouseIcon size={20} weight="regular" />
                                        Meus Serviços
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigate('/profile');
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center gap-3 py-2 text-neutral-dark hover:text-primary-dark"
                                    >
                                        <UserIcon size={20} weight="regular" />
                                        Meu Perfil
                                    </button>
                                </nav>

                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="flex items-center gap-3 py-3 text-status-error hover:text-red-700 mt-auto"
                                >
                                    <SignOutIcon size={20} weight="regular" />
                                    Sair
                                </button>

                                <p className="text-center text-xs text-neutral-medium mt-4">FEITTO © 2025</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
