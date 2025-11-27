interface ConfirmAcceptProposalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title?: string;
    message?: string;
}

export default function ConfirmAcceptProposal({ isOpen, onConfirm, onCancel, title = 'Confirmar aceitação', message = 'Deseja realmente aceitar esta proposta?' }: ConfirmAcceptProposalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <p className="text-sm text-neutral-medium mb-4">{message}</p>

                    <div className="flex gap-3">
                        <button
                            onClick={onConfirm}
                            className="flex-1 bg-accent-yellow text-primary-dark py-2.5 px-4 rounded-lg hover:bg-accent-yellow-hover transition-colors duration-200 text-sm font-bold"
                        >
                            Confirmar
                        </button>
                        <button
                            onClick={onCancel}
                            className="flex-1 bg-white border border-gray-200 text-neutral-dark py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
