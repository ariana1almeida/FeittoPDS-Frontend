import React, { useState, useRef, useEffect } from "react";

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    label: string;
    name: string;
    value: string;
    options: string[] | Option[];
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
                                                       label,
                                                       name,
                                                       value,
                                                       options,
                                                       placeholder,
                                                       onChange,
                                                       error = false,
                                                   }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const baseSelect =
        "w-full h-9 px-4 rounded-lg transition-all duration-200 cursor-pointer text-sm leading-normal";
    const okStyle =
        "bg-neutral-light focus:ring-2 ring-neutral-medium";
    const errorStyle =
        "bg-red-50 focus:border-status-error focus:ring-2 focus:ring-status-error/20";

    const isStringArray = typeof options[0] === "string";

    const displayValue = isStringArray
        ? value?.replace(/_/g, " ")
        : (options as Option[]).find((opt) => opt.value === value)?.label;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (selectedValue: string) => {
        const syntheticEvent = {
            target: { name, value: selectedValue },
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange(syntheticEvent);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef}>
            <label className="mb-1 block text-sm font-medium text-neutral-dark">
                {label}
                <span className="text-status-error ml-1">*</span>
              </label>

            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`${baseSelect} ${error ? errorStyle : okStyle} ${
                        value ? "text-neutral-dark" : "text-neutral-dark/60"
                    } flex items-center justify-between`}
                >
                    <span className="truncate">{displayValue || placeholder}</span>
                    <svg
                        className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border-1 border-neutral-light rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {isStringArray
                            ? (options as string[]).map((opt) => (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => handleSelect(opt)}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-neutral-light transition-colors ${
                                        value === opt ? "bg-accent-green/10 font-medium" : ""
                                    }`}
                                >
                                    {opt.replace(/_/g, " ")}
                                </button>
                            ))
                            : (options as Option[]).map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => handleSelect(opt.value)}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-neutral-light transition-colors ${
                                        value === opt.value ? "bg-accent-green/10 font-medium" : ""
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomSelect;
