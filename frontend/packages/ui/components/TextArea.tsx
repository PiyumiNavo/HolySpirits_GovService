import React from "react";

interface TextAreaProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
  className?: string;
}

export default function TextArea({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  rows = 3,
  className = ''
}: TextAreaProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-text-700 mb-2">
        {label}
        {required && <span className="text-error-500 ml-1">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          resize-vertical
          ${error ? 'border-error-500' : 'border-border-200'}
        `}
        placeholder={placeholder}
        required={required}
      />
      {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
    </div>
  );
}
