"use client";

import React from "react";
import { Checkbox } from "@myorg/ui";

interface Option {
  value: string;
  label: string;
  count?: number;
}

interface MultiSelectFilterProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  label: string;
  className?: string;
}

export default function MultiSelectFilter({
  options,
  selectedValues,
  onChange,
  label,
  className = ""
}: MultiSelectFilterProps) {
  const handleOptionChange = (value: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, value]);
    } else {
      onChange(selectedValues.filter(v => v !== value));
    }
  };

  const selectAll = () => {
    onChange(options.map(option => option.value));
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-text-700">
          {label}
        </label>
        <div className="flex gap-2 text-xs">
          <button
            type="button"
            onClick={selectAll}
            className="text-primary-600 hover:text-primary-hover"
            disabled={selectedValues.length === options.length}
          >
            All
          </button>
          <span className="text-text-500">|</span>
          <button
            type="button"
            onClick={clearAll}
            className="text-text-500 hover:text-text-700"
            disabled={selectedValues.length === 0}
          >
            None
          </button>
        </div>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {options.map((option) => (
          <div key={option.value} className="flex items-center justify-between">
            <Checkbox
              id={`filter-${option.value}`}
              label={option.label}
              checked={selectedValues.includes(option.value)}
              onChange={(checked) => handleOptionChange(option.value, checked)}
              className="flex-1"
            />
            {option.count !== undefined && (
              <span className="text-xs text-text-500 ml-2">
                ({option.count})
              </span>
            )}
          </div>
        ))}
      </div>

      {selectedValues.length > 0 && (
        <div className="mt-2 pt-2 border-t border-border-200">
          <p className="text-xs text-text-500">
            {selectedValues.length} of {options.length} selected
          </p>
        </div>
      )}
    </div>
  );
}
