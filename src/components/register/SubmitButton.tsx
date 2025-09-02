interface SubmitButtonProps {
  isSubmitting: boolean;
}

export default function SubmitButton({ isSubmitting }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold text-sm hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-6 shadow-sm hover:shadow-md focus:ring-2 focus:ring-amber-200 focus:outline-none"
    >
      {isSubmitting ? "Cadastrando..." : "Cadastrar"}
    </button>
  );
}
