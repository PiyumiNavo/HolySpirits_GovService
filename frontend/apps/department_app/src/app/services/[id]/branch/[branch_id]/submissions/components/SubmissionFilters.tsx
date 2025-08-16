import React from "react";
import { Card, MultiSelectFilter, DateRangePicker, SearchInput, Button } from "@myorg/ui";
import type { SubmissionFilters, SubmissionStats } from "../types/submission.types";

interface SubmissionFiltersProps {
  filters: SubmissionFilters;
  stats: SubmissionStats | null;
  onFiltersChange: (filters: SubmissionFilters) => void;
  onClearFilters: () => void;
}

export default function SubmissionFilters({
  filters,
  stats,
  onFiltersChange,
  onClearFilters
}: SubmissionFiltersProps) {
  const statusOptions = [
    { value: 'pending', label: 'Pending', count: stats?.pending || 0 },
    { value: 'approved', label: 'Approved', count: stats?.approved || 0 },
    { value: 'completed', label: 'Completed', count: stats?.completed || 0 },
    { value: 'rejected', label: 'Rejected', count: stats?.rejected || 0 },
    { value: 'cancelled', label: 'Cancelled', count: stats?.cancelled || 0 }
  ];

  const updateFilters = (updates: Partial<SubmissionFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const hasActiveFilters = 
    filters.status.length > 0 ||
    filters.search.trim() !== '' ||
    filters.submissionDateRange.start !== null ||
    filters.submissionDateRange.end !== null ||
    filters.appointmentDateRange.start !== null ||
    filters.appointmentDateRange.end !== null;

  return (
    <Card padding="md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-text-900">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-text-700 mb-2">
            Search
          </label>
          <SearchInput
            value={filters.search}
            onChange={(value) => updateFilters({ search: value })}
            placeholder="Search by citizen name, email, or token number..."
          />
        </div>

        {/* Status Filter */}
        <MultiSelectFilter
          label="Status"
          options={statusOptions}
          selectedValues={filters.status}
          onChange={(values) => updateFilters({ status: values as SubmissionFilters['status'] })}
        />

        {/* Submission Date Range */}
        <DateRangePicker
          label="Submission Date Range"
          startDate={filters.submissionDateRange.start}
          endDate={filters.submissionDateRange.end}
          onChange={(start, end) => 
            updateFilters({ 
              submissionDateRange: { start, end } 
            })
          }
        />

        {/* Appointment Date Range */}
        <DateRangePicker
          label="Appointment Date Range"
          startDate={filters.appointmentDateRange.start}
          endDate={filters.appointmentDateRange.end}
          onChange={(start, end) => 
            updateFilters({ 
              appointmentDateRange: { start, end } 
            })
          }
        />

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="pt-4 border-t border-border-200">
            <h4 className="text-sm font-medium text-text-700 mb-2">Active Filters:</h4>
            <div className="flex flex-wrap gap-2">
              {filters.status.map(status => (
                <span
                  key={status}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-400 text-primary-600"
                >
                  {status}
                  <button
                    onClick={() => updateFilters({ 
                      status: filters.status.filter(s => s !== status) 
                    })}
                    className="ml-1 text-primary-600 hover:text-primary-hover"
                  >
                    ×
                  </button>
                </span>
              ))}
              
              {filters.search && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-400 text-primary-600">
                  Search: "{filters.search}"
                  <button
                    onClick={() => updateFilters({ search: '' })}
                    className="ml-1 text-primary-600 hover:text-primary-hover"
                  >
                    ×
                  </button>
                </span>
              )}
              
              {(filters.submissionDateRange.start || filters.submissionDateRange.end) && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-400 text-primary-600">
                  Submission Date
                  <button
                    onClick={() => updateFilters({ 
                      submissionDateRange: { start: null, end: null } 
                    })}
                    className="ml-1 text-primary-600 hover:text-primary-hover"
                  >
                    ×
                  </button>
                </span>
              )}
              
              {(filters.appointmentDateRange.start || filters.appointmentDateRange.end) && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-400 text-primary-600">
                  Appointment Date
                  <button
                    onClick={() => updateFilters({ 
                      appointmentDateRange: { start: null, end: null } 
                    })}
                    className="ml-1 text-primary-600 hover:text-primary-hover"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
