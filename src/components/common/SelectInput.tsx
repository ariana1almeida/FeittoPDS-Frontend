import React, { useState, useEffect } from 'react';

interface SelectInputProps {
    startingValue?: string;
    options: [string, string][];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectInput({
                                        startingValue,
                                        options,
                                        onChange,
                                    }: SelectInputProps) {
    const [value, setValue] = useState(startingValue || '');

    useEffect(() => {
        if (startingValue !== undefined) {
            setValue(startingValue);
        }
    }, [startingValue]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
        onChange(e);
    };

    return (
        <div className="mb-6 relative">
            <select className="w-full" value={value} onChange={handleChange}>
                {options.map(([val, label]) => (
                    <option key={val} value={val}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    );
}
