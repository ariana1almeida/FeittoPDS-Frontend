import { useState, useEffect, useRef } from "react";
import type {ProposalEntity} from "../../types/ProposalEntity";
import {StarIcon, XIcon} from "@phosphor-icons/react";
import {UserService} from "../../services/UserService.ts";
import type {ProfileResponse} from "../../types/ProfileResponse.ts";

interface ServiceConclusionModalProps {
    isOpen: boolean;
    onClose: () => void;
    proposal?: ProposalEntity;
    subject?: 'prestador' | 'cliente' | string;
    onSubmit?: (payload:  Partial<{ rating?: number; review?: string; description?: string }>) => Promise<void> | void;
}

export const ServiceConclusionModal = ({isOpen, onClose, proposal, onSubmit, subject}: ServiceConclusionModalProps) => {
    const userService = UserService.getInstance();
    const [rating, setRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userBeingEvaluated, setUserBeingEvaluated] = useState<ProfileResponse>();
    const starsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const id = subject === 'cliente'
                    ? proposal?.service?.clientId
                    : proposal?.providerId;

                if (!id) return;

                const response = await userService.getUserProfileInformation(id);
                setUserBeingEvaluated(response);
            } catch (e) {
                console.error("Erro ao carregar perfil", e);
            }
        };

        fetchProfile();
    }, [isOpen, subject, proposal]);

    if (!isOpen || !proposal) {
        return;
    }

    const subjectLabel = userBeingEvaluated?.userType === 'CLIENT' ? 'cliente' : 'prestador';
    const subjectName = `${userBeingEvaluated?.firstName ?? ''} ${userBeingEvaluated?.lastName ?? ''}`.trim();
    const subjectInitials = subjectName ? subjectName.split(' ').map(n => n[0]).join('').substring(0, 2) : '';

    const handleSubmit = async () => {
        if (rating <= 0) {
            setError('Por favor, selecione uma avaliação de 1 a 5 estrelas.');
            return;
        }
        setError(null);
        const payload = {
            rating,
            review: comment,
            description: comment,
        };

        try {
            setSubmitting(true);
            if (onSubmit) await onSubmit(payload);
            onClose();
        } catch (err) {
            console.error('Erro ao enviar avaliação', err);
            setError('Erro ao enviar avaliação. Tente novamente.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-xl">

                <div className="p-6 relative">
                    <button onClick={onClose}
                            className="absolute top-4 right-4 text-neutral-dark hover:text-primary-dark">
                        <XIcon size={20}/>
                    </button>

                    <h2 className="text-xl font-bold text-primary-dark">{`Avaliar ${subjectLabel}`}</h2>
                    <p className="text-sm text-neutral-dark mb-6">
                        {`Como foi sua experiência com ${subjectName}?`}
                    </p>

                    <div className="flex items-center space-x-4 mb-6">
                        <div
                            className="w-14 h-14 rounded-full bg-primary-dark flex items-center justify-center text-white font-bold text-xl">
                            {subjectInitials}
                        </div>
                        <div>
                            <h3 className="font-semibold text-primary-dark">{subjectName}</h3>
                            {(userBeingEvaluated?.userType === 'PROVIDER' && proposal?.provider?.providerData?.professions) && (
                                <p className="text-sm text-neutral-dark">{proposal.provider.providerData.professions}</p>
                            )}
                            <div className="flex items-center text-sm text-neutral-dark mt-1">
                                <StarIcon weight="fill" className="text-accent-yellow mr-1"/>
                                <span className="font-bold">{userBeingEvaluated?.averageRating}</span>
                                <span className="ml-1">({userBeingEvaluated?.numberOfRatings} avaliações)</span>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-200 my-4"/>

                    <div className="mb-4">
                        <div
                            ref={starsRef}
                            tabIndex={0}
                            role="radiogroup"
                            aria-label={`Avaliação para ${subjectName}`}
                            className="flex items-center gap-2"
                        >
                            {[1,2,3,4,5].map((i) => {
                                const filled = i <= (hoverRating || rating);
                                return (
                                    <button
                                        key={i}
                                        type="button"
                                        role="radio"
                                        aria-checked={filled}
                                        aria-label={`Avaliar ${i} estrela${i>1? 's' : ''}`}
                                        onMouseEnter={() => setHoverRating(i)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onFocus={() => setHoverRating(i)}
                                        onBlur={() => setHoverRating(0)}
                                        onClick={() => setRating(i)}
                                        className="focus:outline-none"
                                    >
                                        <StarIcon size={28} weight={filled ? 'fill' : 'regular'} className={filled ? 'text-accent-yellow' : 'text-gray-300 hover:text-yellow-300 transition-colors'} />
                                    </button>
                                );
                            })}
                        </div>
                        {error && <p className="text-sm text-status-error mt-2">{error}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-2">Comentário (opcional)</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                            className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary-dark"
                            placeholder="Deixe um comentário sobre como foi sua experiência..."
                        />
                    </div>

                    <div className="mb-4">
                        <p className="bg-blue-100 text-sm text-primary-dark p-3 rounded-lg">
                            Sua avaliação ajuda outros clientes a escolherem os melhores
                            prestadores e contribui para a qualidade da plataforma FEITTO.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="flex-1 bg-accent-yellow text-primary-dark py-2.5 px-4 rounded-lg hover:bg-yellow-500 transition-colors duration-200 text-sm font-bold"
                        >
                            {submitting ? 'Enviando...' : (subjectLabel === 'cliente' ? 'Enviar Avaliação do Cliente' : 'Enviar Avaliação')}
                        </button>
                        <button
                            onClick={onClose}
                            disabled={submitting}
                            className="flex-1 bg-white border border-gray-200 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
