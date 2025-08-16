import React from "react";

type SubmissionStatus = 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';

interface StatusBadgeProps {
  status: SubmissionStatus;
  className?: string;
}

const statusConfig = {
  pending: {
    label: "Pending",
    bgColor: "bg-pending-100",
    textColor: "text-pending-500",
    icon: "⏳"
  },
  approved: {
    label: "Approved", 
    bgColor: "bg-approved-100",
    textColor: "text-approved-500",
    icon: "✓"
  },
  completed: {
    label: "Completed",
    bgColor: "bg-success-100", 
    textColor: "text-success-500",
    icon: "✅"
  },
  rejected: {
    label: "Rejected",
    bgColor: "bg-error-100",
    textColor: "text-error-500", 
    icon: "✗"
  },
  cancelled: {
    label: "Cancelled",
    bgColor: "bg-suspended-100",
    textColor: "text-suspended-500",
    icon: "⊘"
  }
};

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span 
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${config.bgColor} ${config.textColor} ${className}
      `}
    >
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </span>
  );
}
