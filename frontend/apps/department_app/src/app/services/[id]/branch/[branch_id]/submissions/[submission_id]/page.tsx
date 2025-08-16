'use client';

import { useParams } from 'next/navigation';
import { LoadingSkeleton, Button } from '@myorg/ui';
import { 
  SubmissionHeader, 
  CitizenInfo, 
  FormDataDisplay, 
  ApprovalActions, 
  SubmissionNotes 
} from './components';
import { useSubmissionDetails } from './hooks/useSubmissionDetails';

export default function SubmissionDetailsPage() {
  const params = useParams();
  const submissionId = params.submission_id as string;

  const { submission, loading, error, refetch } = useSubmissionDetails({
    submissionId
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-text-700 text-center">{error}</p>
        <Button
          onClick={refetch}
          className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-text-700">Submission not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header with status and basic info */}
      <SubmissionHeader submission={submission} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Citizen Information */}
          <CitizenInfo 
            citizen={submission.citizen}
            appointment={submission.appointment}
            location={submission.location}
          />

          {/* Form Data */}
          <FormDataDisplay 
            formData={submission.formData}
            formFields={submission.service.formFields}
            serviceName={submission.service.name}
          />
        </div>

        {/* Right Column - Actions and Notes */}
        <div className="space-y-6">
          {/* Approval Actions */}
          {submission.status === 'pending' && (
            <ApprovalActions 
              submissionId={submission.id}
              onSuccess={refetch}
            />
          )}

          {/* Notes Section */}
          <SubmissionNotes 
            notes={submission.notes}
            submissionId={submission.id}
            onNoteAdded={refetch}
          />
        </div>
      </div>
    </div>
  );
}
