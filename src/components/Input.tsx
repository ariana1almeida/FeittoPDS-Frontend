interface InputProps {
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  label?: string;
  required?: boolean;
  error?: boolean;
}

export default function Input({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  label,
  required = false,
  error = false,
}: InputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-primary-dark"
        >
          {label}
          {required && <span className="text-status-error ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-lg transition-all duration-200 ${
          error
            ? "bg-red-50 border-2 border-status-error focus:border-status-error focus:ring-2 focus:ring-status-error/20"
            : "bg-neutral-light border-2 border-transparent focus:bg-white focus:border-accent-yellow focus:ring-2 focus:ring-accent-yellow/20"
        } text-primary-dark placeholder-neutral-dark/60 focus:outline-none`}
      />
    </div>
  );
}
