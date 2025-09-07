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
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg transition-all duration-200 ${
          error
            ? "bg-red-50 border-2 border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "bg-stone-200 border-2 border-transparent focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
        } text-gray-900 placeholder-gray-500 focus:outline-none`}
      />
    </div>
  );
}
