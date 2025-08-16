import React from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export default function InputField({ 
  id, 
  label, 
  type,
  name,
  value, 
  onChange, 
  placeholder, 
  required = false,
  error,
  className = ''
}: InputFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-xs font-medium text-text-700 mb-1">
        {label}
        {required && <span className="text-error-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name || id}
        value={value}
        onChange={onChange}
        className={`
          w-full px-2.5 py-1.5 text-sm border rounded-md shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          ${error ? 'border-error-500' : 'border-border-200'}
        `}
        placeholder={placeholder}
        required={required}
        suppressHydrationWarning={true}
      />
      {error && <p className="mt-0.5 text-xs text-error-500">{error}</p>}
    </div>
  );
}
