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

export default function RadioGroup({ name, options, selected, onChange }: RadioGroupProps) {
  return (
    <div className="flex space-x-4">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center space-x-2">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={selected === opt.value}
            onChange={onChange}
            className="form-radio"
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
