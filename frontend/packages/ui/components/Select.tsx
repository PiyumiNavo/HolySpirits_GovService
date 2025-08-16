import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export default function Select({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false,
  error,
  className = ''
}: SelectProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-xs font-medium text-text-700 mb-1">
        {label}
        {required && <span className="text-error-500 ml-1">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full px-2.5 py-1.5 text-sm border rounded-md shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          ${error ? 'border-error-500' : 'border-border-200'}
        `}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-0.5 text-xs text-error-500">{error}</p>}
    </div>
  );
}
