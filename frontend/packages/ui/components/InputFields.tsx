import React from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export function InputField({ 
  id, 
  label, 
  type, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  error,
  className = ''
}: InputFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-text-700 mb-2">
        {label}
        {required && <span className="text-error-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          ${error ? 'border-error-500' : 'border-border-200'}
        `}
        placeholder={placeholder}
        required={required}
      />
      {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
    </div>
  );
}

interface FieldConfig {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  error?: string;
}

interface InputFieldsProps {
  fields: FieldConfig[];
}

export function InputFields({ fields }: InputFieldsProps) {
  return (
    <>
      {fields.map((field) => (
        <InputField
          key={field.id}
          id={field.id}
          label={field.label}
          type={field.type}
          value={field.value}
          onChange={field.onChange}
          placeholder={field.placeholder}
          required={field.required}
          error={field.error}
        />
      ))}
    </>
  );
}
