import SubmitButton from "./SubmitButton";

interface ModalActionsProps {
  onCancel: () => void;
  onSubmit?: () => void;
  cancelLabel?: string;
  submitLabel?: string;
  submittingLabel?: string;
  isSubmitting?: boolean;
  disabled?: boolean;
  submitType?: "button" | "submit";
}

const ModalActions = ({
  onCancel,
  onSubmit,
  cancelLabel = "Cancelar",
  submitLabel = "Confirmar",
  submittingLabel = "Processando...",
  isSubmitting = false,
  disabled = false,
  submitType = "submit"
}: ModalActionsProps) => {
  return (
    <div className="flex gap-6 pt-4">
      <button
          type="button"
          onClick={onCancel}
          className="w-32 bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold text-sm
    hover:bg-gray-50 transition-all duration-200 mt-6 shadow-sm hover:shadow-md
    focus:ring-2 focus:ring-gray-300/20 focus:outline-none"
      >
        {cancelLabel}
      </button>
      {submitType === "submit" ? (
        <SubmitButton
          isSubmitting={isSubmitting}
          defaultLabel={submitLabel}
          submittingLabel={submittingLabel}
          className="flex-1"
        />
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          className="flex-1 px-3 py-2 bg-primary-dark text-white rounded-lg hover:bg-primary-dark/90 transition-colors duration-200"
          disabled={disabled || isSubmitting}
        >
          {isSubmitting ? submittingLabel : submitLabel}
        </button>
      )}
    </div>
  );
};

export default ModalActions;
