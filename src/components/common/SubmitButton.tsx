interface SubmitButtonProps {
  isSubmitting: boolean;
  submittingLabel?: string;
  defaultLabel: string;
  className?: string;
}

export default function SubmitButton({
                                       isSubmitting,
                                       submittingLabel = "Enviando...",
                                       defaultLabel,
                                       className = "",
                                     }: SubmitButtonProps) {
  return (
      <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-primary-dark text-white py-3 px-6 rounded-lg font-semibold text-sm
                  hover:bg-primary-medium disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200 mt-6 shadow-sm hover:shadow-md 
                  focus:ring-2 focus:ring-primary-dark/20 focus:outline-none ${className}`}
      >
        {isSubmitting ? submittingLabel : defaultLabel}
      </button>
  );
}