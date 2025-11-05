interface Option {
  label: string;
  value: string;
}

interface RadioGroupProps {
  name: string;
  options: Option[];
  selected: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioGroup({
  name,
  options,
  selected,
  onChange,
}: RadioGroupProps) {
  return (
    <div className="flex space-x-6">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={selected === opt.value}
            onChange={onChange}
            className="w-4 h-4 text-accent-yellow bg-neutral-light border-neutral-dark focus:ring-accent-yellow focus:ring-1"
          />
          <span className="text-sm font-medium text-primary-dark">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
