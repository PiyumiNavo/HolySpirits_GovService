"use client";

import React, { useState } from "react";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (start: Date | null, end: Date | null) => void;
  label: string;
  placeholder?: string;
  className?: string;
  error?: string;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onChange,
  label,
  placeholder = "Select date range",
  className = "",
  error
}: DateRangePickerProps) {
  const formatDateForInput = (date: Date | null): string => {
    if (!date) return "";
    return date.toISOString().split('T')[0];
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? new Date(e.target.value) : null;
    onChange(newDate, endDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? new Date(e.target.value) : null;
    onChange(startDate, newDate);
  };

  const clearDates = () => {
    onChange(null, null);
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-text-700 mb-2">
        {label}
      </label>
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <input
              type="date"
              value={formatDateForInput(startDate)}
              onChange={handleStartDateChange}
              className={`
                w-full px-3 py-2 border rounded-md shadow-sm text-sm
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                ${error ? 'border-error-500' : 'border-border-200'}
              `}
              placeholder="Start date"
            />
          </div>
          <div>
            <input
              type="date"
              value={formatDateForInput(endDate)}
              onChange={handleEndDateChange}
              className={`
                w-full px-3 py-2 border rounded-md shadow-sm text-sm
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                ${error ? 'border-error-500' : 'border-border-200'}
              `}
              placeholder="End date"
            />
          </div>
        </div>
        
        {(startDate || endDate) && (
          <button
            type="button"
            onClick={clearDates}
            className="text-xs text-text-500 hover:text-text-700"
          >
            Clear dates
          </button>
        )}
        
        {startDate && endDate && (
          <p className="text-xs text-text-500">
            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          </p>
        )}
      </div>
      
      {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
    </div>
  );
}
