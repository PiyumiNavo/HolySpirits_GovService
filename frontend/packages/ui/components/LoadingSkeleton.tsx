import React from "react";

interface LoadingSkeletonProps {
  className?: string;
  rows?: number;
  height?: string;
}

export default function LoadingSkeleton({ 
  className = "", 
  rows = 1, 
  height = "h-4" 
}: LoadingSkeletonProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className={`bg-border-200 rounded ${height} ${index > 0 ? 'mt-2' : ''}`}
        />
      ))}
    </div>
  );
}

interface SubmissionCardSkeletonProps {
  count?: number;
}

export function SubmissionCardSkeleton({ count = 3 }: SubmissionCardSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-text-white rounded-lg border border-border-200 p-4">
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-6 bg-border-200 rounded-full"></div>
                <div className="w-24 h-4 bg-border-200 rounded"></div>
              </div>
              <div className="w-20 h-4 bg-border-200 rounded"></div>
            </div>
            
            <div className="space-y-2 mb-3">
              <div className="w-3/4 h-4 bg-border-200 rounded"></div>
              <div className="w-1/2 h-4 bg-border-200 rounded"></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="w-32 h-4 bg-border-200 rounded"></div>
              <div className="w-24 h-8 bg-border-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
