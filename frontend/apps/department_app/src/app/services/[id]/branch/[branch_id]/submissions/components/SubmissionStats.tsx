import React from "react";
import { Card, StatusBadge } from "@myorg/ui";
import type { SubmissionStats } from "../types/submission.types";

interface SubmissionStatsProps {
  stats: SubmissionStats | null;
  isLoading?: boolean;
}

export default function SubmissionStats({ stats, isLoading }: SubmissionStatsProps) {
  if (isLoading) {
    return (
      <Card padding="md">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-6 bg-background-200 rounded animate-pulse mx-auto mb-2"></div>
              <div className="w-12 h-8 bg-background-200 rounded animate-pulse mx-auto"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (!stats) {
    return (
      <Card padding="md">
        <div className="text-center text-text-500">
          No statistics available
        </div>
      </Card>
    );
  }

  const statsData = [
    {
      status: 'pending' as const,
      count: stats.pending,
      label: 'Pending'
    },
    {
      status: 'approved' as const,
      count: stats.approved,
      label: 'Approved'
    },
    {
      status: 'completed' as const,
      count: stats.completed,
      label: 'Completed'
    },
    {
      status: 'rejected' as const,
      count: stats.rejected,
      label: 'Rejected'
    },
    {
      status: 'cancelled' as const,
      count: stats.cancelled,
      label: 'Cancelled'
    }
  ];

  return (
    <Card padding="md">
      <h3 className="text-lg font-medium text-text-900 mb-4">Submission Statistics</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {statsData.map(({ status, count, label }) => (
          <div key={status} className="text-center">
            <div className="flex justify-center mb-2">
              <StatusBadge status={status} />
            </div>
            <div className="text-2xl font-bold text-text-900 mb-1">
              {count.toLocaleString()}
            </div>
            <div className="text-sm text-text-600">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Total count */}
      <div className="mt-6 pt-4 border-t border-border-200">
        <div className="text-center">
          <div className="text-3xl font-bold text-text-900 mb-1">
            {stats.total.toLocaleString()}
          </div>
          <div className="text-base text-text-600">
            Total Submissions
          </div>
        </div>
      </div>

      {/* Progress indicators */}
      <div className="mt-4 space-y-2">
        {statsData.map(({ status, count, label }) => {
          const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
          return (
            <div key={`progress-${status}`} className="flex items-center justify-between text-sm">
              <span className="text-text-600 min-w-0 flex-1">{label}</span>
              <span className="text-text-500 ml-2">
                {percentage.toFixed(1)}%
              </span>
              <div className="w-20 bg-background-200 rounded-full h-2 ml-2">
                <div
                  className={`h-2 rounded-full ${
                    status === 'pending' ? 'bg-warning-500' :
                    status === 'approved' ? 'bg-info-500' :
                    status === 'completed' ? 'bg-success-500' :
                    status === 'rejected' ? 'bg-error-500' :
                    'bg-text-400'
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
