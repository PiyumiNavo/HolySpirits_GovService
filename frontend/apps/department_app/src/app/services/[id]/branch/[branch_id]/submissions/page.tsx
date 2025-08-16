'use client';

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button, Pagination, LoadingSkeleton, Header, SearchInput, Card, MultiSelectFilter, DateRangePicker, StatusBadge } from "@myorg/ui";
import { useSubmissions } from "./hooks/useSubmissions";
import SubmissionCard from "./components/SubmissionCard";
import SubmissionFilters from "./components/SubmissionFilters";
import SubmissionStats from "./components/SubmissionStats";
import type { SubmissionFilters as SubmissionFiltersType, SubmissionSortField, SortDirection } from "./types/submission.types";

const userDepartmentName = "Department of Motor Traffic (DMT)";

export default function SubmissionsPage() {
  const params = useParams();
  const serviceId = params?.id as string;
  const branchId = params?.branch_id as string;

  const [filters, setFilters] = useState<SubmissionFiltersType>({
    status: [],
    search: '',
    submissionDateRange: { start: null, end: null },
    appointmentDateRange: { start: null, end: null }
  });

  const [sortField, setSortField] = useState<SubmissionSortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const {
    submissions,
    stats,
    pagination,
    loading,
    error,
    refetch
  } = useSubmissions({
    serviceId,
    branchId,
    filters,
    sortField,
    sortDirection,
    page: currentPage,
    limit: pageSize
  });

  const handleFiltersChange = (newFilters: SubmissionFiltersType) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClearFilters = () => {
    setFilters({
      status: [],
      search: '',
      submissionDateRange: { start: null, end: null },
      appointmentDateRange: { start: null, end: null }
    });
    setCurrentPage(1);
  };

  const handleSort = (field: SubmissionSortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleSubmissionUpdate = () => {
    // Refetch data when a submission is updated
    refetch();
  };

  if (error) {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen">
        <Header departmentName={userDepartmentName} />
        <main className="flex flex-col w-full gap-8 row-start-2 items-center justify-center p-12">
          <Card className="text-center max-w-md">
            <div className="text-error-500 text-lg font-medium mb-2">
              Error loading submissions
            </div>
            <div className="text-text-500 mb-4">
              {error}
            </div>
            <Button onClick={handleRefresh}>
              Try Again
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen gap-8">
      <Header departmentName={userDepartmentName} />
      
      <main className="flex flex-col w-full gap-8 row-start-2 items-start p-12">
        {/* Page Header */}
        <div className="w-full">
          <h1 className="text-3xl font-bold text-text-900 mb-2">
            Service Submissions
          </h1>
          <p className="text-text-500">
            Manage and track all submissions for this service and branch
          </p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <SearchInput
              placeholder="Search submissions..."
              value={filters.search}
              onChange={(value) => setFilters(prev => ({ ...prev, search: value }))}
            />
          </div>
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={loading}
            className="shrink-0"
          >
            Refresh
          </Button>
        </div>

        {/* Statistics */}
        <div className="w-full">
          <SubmissionStats stats={stats} isLoading={loading} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SubmissionFilters
              filters={filters}
              stats={stats}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Sort Controls */}
            <Card className="mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <span className="text-sm font-medium text-text-700">Sort by:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { field: 'createdAt' as const, label: 'Submission Date' },
                      { field: 'appointmentDate' as const, label: 'Appointment Date' },
                      { field: 'status' as const, label: 'Status' }
                    ].map(({ field, label }) => (
                      <button
                        key={field}
                        onClick={() => handleSort(field)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          sortField === field
                            ? 'bg-primary-600 text-text-white'
                            : 'bg-background-50 text-text-700 hover:bg-primary-400'
                        }`}
                      >
                        {label}
                        {sortField === field && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                {pagination && (
                  <div className="text-sm text-text-500">
                    Showing {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, pagination.total)} of {pagination.total} submissions
                  </div>
                )}
              </div>
            </Card>

            {/* Submissions List */}
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: pageSize }).map((_, index) => (
                  <LoadingSkeleton key={index} className="h-48" />
                ))}
              </div>
            ) : submissions.length === 0 ? (
              <Card className="text-center py-12">
                <div className="text-text-700 text-lg font-medium mb-2">
                  No submissions found
                </div>
                <div className="text-text-500">
                  {Object.values(filters).some(v => Array.isArray(v) ? v.length > 0 : v !== '' && v !== null)
                    ? 'Try adjusting your filters to see more results.'
                    : 'No submissions have been received yet for this service and branch.'
                  }
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <SubmissionCard
                    key={submission.id}
                    submission={submission}
                    onUpdate={handleSubmissionUpdate}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={pagination.totalPages}
                  itemsPerPage={pageSize}
                  totalItems={pagination.total}
                  hasNext={pagination.hasNext}
                  hasPrevious={pagination.hasPrevious}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
