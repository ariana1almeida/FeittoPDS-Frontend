import React, {useState} from "react";
import {EyeClosedIcon, EyeIcon} from "@phosphor-icons/react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    error?: boolean;
    icon?: React.ReactNode;
    showPasswordToggle?: boolean;
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
                                  icon,
                                  readOnly = false,
                                  showPasswordToggle = false,
                                  ...rest
                              }: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordType = type === "password" && showPasswordToggle;
    const effectiveType = isPasswordType ? (showPassword ? "text" : "password") : type;

    const hasLeftIcon = !!icon;
    const hasToggle = isPasswordType;

    const paddingClass = hasLeftIcon && hasToggle
        ? "pl-10 pr-10"
        : hasLeftIcon
            ? "pl-10 pr-4"
            : hasToggle
                ? "pl-4 pr-10"
                : "px-4";

    return (
        <div className="mb-6">
            {label && (
                <label htmlFor={name} className="mb-1 block text-sm font-medium text-primary-dark">
                    {label}
                    {required && <span className="text-status-error ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {icon && (
                    <div
                        className="absolute left-3 top-0 bottom-0 flex items-center text-neutral-500 pointer-events-none">
                        {icon}
                    </div>
                )}

                <input
                    id={name}
                    type={effectiveType}
                    name={name}
                    value={value ?? ""}
                    onChange={onChange}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    required={required}
                    aria-invalid={error}
                    className={`w-full h-9 ${paddingClass} py-2 rounded-lg text-sm ${
                        error
                            ? "bg-red-50 border-2 border-status-error focus:border-status-error focus:ring-2 focus:ring-status-error/20"
                            : "bg-neutral-light border-2 border-transparent focus:bg-white focus:border-accent-yellow focus:ring-2 focus:ring-accent-yellow/20"
                    } text-primary-dark placeholder-neutral-dark/60 focus:outline-none`}
                    {...rest}
                />

                {hasToggle && (
                    <div className="absolute right-3 top-0 bottom-0 flex items-center">
                        <button
                            type="button"
                            onClick={() => setShowPassword(s => !s)}
                            aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                            className="text-neutral-dark hover:text-neutral-700 bg-transparent border-none p-0 cursor-pointer"
                        >
                            {showPassword ?
                                <EyeClosedIcon size={20} className="text-neutral-500"/> :
                                <EyeIcon size={20} className="text-neutral-500"/>
                            }
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}