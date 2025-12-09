interface Option {
    label: string;
    value: string;
    description?: string;
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
        <div className="flex gap-4">
            {options.map((opt) => (
                <label
                    key={opt.value}
                    className={`flex items-center justify-start w-full space-x-3 cursor-pointer px-6 py-4 rounded-2xl border-2 transition-all ${
                        selected === opt.value
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                >
                    <input
                        type="radio"
                        name={name}
                        value={opt.value}
                        checked={selected === opt.value}
                        onChange={onChange}
                        className="w-3 h-3 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-primary-dark">{opt.label}</span>
                        {opt.description && (
                            <span className="text-xs text-neutral-medium">{opt.description}</span>
                        )}
                    </div>
                </label>
            ))}
        </div>
    );
}
