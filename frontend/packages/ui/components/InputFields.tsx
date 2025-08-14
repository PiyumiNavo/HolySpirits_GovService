import React from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}

export function InputField({ 
  id, 
  label, 
  type, 
  value, 
  onChange, 
  placeholder, 
  required = false 
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
        required={required}
      />
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
        />
      ))}
    </>
  );
}
