interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  disabled?: boolean;
}

const ModalHeader = ({ title, onClose, disabled = false }: ModalHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-neutral-dark">{title}</h2>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-neutral-dark text-2xl"
        disabled={disabled}
      >
        ×
      </button>
    </div>
  );
};

export default ModalHeader;
