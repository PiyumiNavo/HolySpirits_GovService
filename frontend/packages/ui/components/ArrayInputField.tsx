
"use client";
import React from "react";
import InputField from "./InputField";

interface ArrayInputFieldProps {
  id: string;
  label: string;
  values: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  type?: string;
  placeholder?: string;
  errors?: Record<string, string>;
  className?: string;
  inputLabel?: string; // Add this new prop
}

export default function ArrayInputField({
  id,
  label,
  values,
  onChange,
  onAdd,
  onRemove,
  type = "text",
  placeholder = "",
  errors = {},
  className = "",
  inputLabel = "Item", // Default value for input label
}: ArrayInputFieldProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-text-700 mb-2">
        {label}
      </label>
      <div className="space-y-3">
        {values.map((value, index) => (
          <div key={index} className="flex items-center gap-2">
            <InputField
              id={`${id}-${index}`}
              label={`${inputLabel} ${index + 1}`} // Added label prop
              type={type}
              value={value}
              onChange={(e) => onChange(index, e.target.value)}
              placeholder={placeholder}
              error={errors[`${id}-${index}`]}
              className="flex-1"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="p-2 text-error-500 hover:text-error-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={onAdd}
          className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add another
        </button>
      </div>
    </div>
  );
}