interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  disabled?: boolean;
}

const ModalHeader = ({ title, onClose, disabled = false }: ModalHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 text-2xl"
        disabled={disabled}
      >
        ×
      </button>
    </div>
  );
};

export default ModalHeader;
