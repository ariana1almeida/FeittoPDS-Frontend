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
          className={`w-full bg-accent-yellow text-primary-dark py-3 px-6 rounded-lg font-semibold text-sm
                  hover:bg-accent-yellow-hover disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200 mt-6 shadow-sm hover:shadow-md 
                  focus:ring-2 focus:ring-accent-yellow/20 focus:outline-none ${className}`}
      >
        {isSubmitting ? submittingLabel : defaultLabel}
      </button>
  );
}