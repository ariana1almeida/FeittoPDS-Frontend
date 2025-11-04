import React from "react";

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
          const baseSelect =
            "w-full h-10 px-4 pr-10 rounded-lg transition-all duration-200 focus:outline-none appearance-none cursor-pointer text-sm leading-normal";
          const okStyle =
            "bg-neutral-light border-2 border-transparent focus:bg-white focus:border-accent-yellow focus:ring-2 focus:ring-accent-yellow/20";
          const errorStyle =
            "bg-red-50 border-2 border-status-error focus:border-status-error focus:ring-2 focus:ring-status-error/20";

          const isStringArray = typeof options[0] === "string";

          return (
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-primary-dark">
                {label}
                <span className="text-status-error ml-1">*</span>
              </label>

              {/* wrapper relativo apenas para select + ícone */}
              <div className="relative">
                <select
                  name={name}
                  value={value}
                  onChange={onChange}
                  className={`${baseSelect} ${error ? errorStyle : okStyle} ${
                    value ? "text-primary-dark" : "text-neutral-dark/60"
                  }`}
                >
                  <option value="" disabled hidden>
                    {placeholder}
                  </option>

                  {isStringArray
                    ? (options as string[]).map((opt) => (
                        <option key={opt} value={opt} className="text-neutral-dark text-sm">
                          {opt.replace(/_/g, " ")}
                        </option>
                      ))
                    : (options as Option[]).map((opt) => (
                        <option key={opt.value} value={opt.value} className="text-neutral-dark text-sm">
                          {opt.label}
                        </option>
                      ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-dark">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </div>
          );
        };

        export default CustomSelect;