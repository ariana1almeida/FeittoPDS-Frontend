interface TextareaProps {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: boolean;
  required?: boolean;
  rows?: number;
  className?: string;
}

const Textarea = ({
  name,
  label,
  placeholder = "",
  value,
  onChange,
  error = false,
  required = false,
  rows = 4,
  className = "",
}: TextareaProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-dark mb-1">
        {label} {required && <span className="text-status-error">*</span>}
      </label>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark resize-none ${
          error ? "border-status-error" : "border-gray-300"
        } ${className}`}
        rows={rows}
        required={required}
      />
    </div>
  );
};

export default Textarea;
