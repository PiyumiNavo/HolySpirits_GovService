'use client';

import { Card, StatusBadge } from '@myorg/ui';
import { SubmissionDetails } from '../types/submission-details.types';

interface SubmissionHeaderProps {
  submission: SubmissionDetails;
}

export function SubmissionHeader({ submission }: SubmissionHeaderProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-text-900">
            Submission #{submission.id}
          </h1>
          <p className="text-text-700">
            {submission.service.name}
          </p>
          <p className="text-text-600 text-sm">
            Submitted on {formatDate(submission.createdAt)}
          </p>
        </div>
        
        <div className="text-right space-y-2">
          <StatusBadge status={submission.status} />
          
          {submission.appointment && (
            <div className="text-sm text-text-600">
              <p>Appointment: {formatDate(submission.appointment.date)}</p>
              <p>Time: {submission.appointment.startTime} - {submission.appointment.endTime}</p>
              {submission.appointment.tokenNumber && (
                <p>Token: {submission.appointment.tokenNumber}</p>
              )}
            </div>
          )}
        </div>
      </div>
      
      {submission.service.description && (
        <div className="mt-4 pt-4 border-t border-border-200">
          <p className="text-text-600 text-sm">
            {submission.service.description}
          </p>
        </div>
      )}
    </Card>
  );
}
