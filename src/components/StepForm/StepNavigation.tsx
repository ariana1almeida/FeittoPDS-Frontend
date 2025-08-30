interface Props {
  step: number;
  onBack?: () => void;
  onNext: () => void;
  submitting?: boolean;
}
export default function StepNavigation({
  step,
  onBack,
  onNext,
  submitting,
}: Props) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <button
        type="button"
        onClick={onBack}
        disabled={!onBack}
        className={
          "rounded px-4 py-2 " +
          (onBack
            ? "bg-gray-200 hover:bg-gray-300"
            : "bg-gray-100 text-gray-400")
        }
      >
        Back
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!!submitting}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {step === 2 ? (submitting ? "Submitting..." : "Submit") : "Next"}
      </button>
    </div>
  );
}
