import React from "react";

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  error?: string;
  className?: string;
}

export default function Checkbox({
  id,
  label,
  checked,
  onChange,
  required = false,
  error,
  className = ''
}: CheckboxProps) {
  return (
    <div className={className}>
      <div className="flex items-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className={`
            h-4 w-4 rounded border-border-200 text-primary-600 
            focus:ring-2 focus:ring-primary-500
            ${error ? 'border-error-500' : ''}
          `}
          required={required}
        />
        <label htmlFor={id} className="ml-2 text-sm text-text-700">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      </div>
      {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
    </div>
  );
}
