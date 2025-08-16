'use client';

import { useState } from 'react';
import { Card, Button, TextArea } from '@myorg/ui';
import { useSubmissionActions } from '../hooks/useSubmissionActions';

interface ApprovalActionsProps {
  submissionId: string;
  onSuccess: () => void;
}

export function ApprovalActions({ submissionId, onSuccess }: ApprovalActionsProps) {
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [notes, setNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  const { approveSubmission, rejectSubmission, loading, error } = useSubmissionActions({
    submissionId,
    onSuccess: () => {
      onSuccess();
      setShowApprovalDialog(false);
      setShowRejectionDialog(false);
      setNotes('');
      setRejectionReason('');
    }
  });

  const handleApprove = async () => {
    if (showApprovalDialog) {
      await approveSubmission(notes || undefined);
    } else {
      setShowApprovalDialog(true);
    }
  };

  const handleReject = async () => {
    if (showRejectionDialog) {
      if (!rejectionReason.trim()) {
        return;
      }
      await rejectSubmission(rejectionReason, notes || undefined);
    } else {
      setShowRejectionDialog(true);
    }
  };

  const handleCancel = () => {
    setShowApprovalDialog(false);
    setShowRejectionDialog(false);
    setNotes('');
    setRejectionReason('');
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-text-900 mb-4">
        Approval Actions
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded-md">
          <p className="text-error-700 text-sm">{error}</p>
        </div>
      )}

      {!showApprovalDialog && !showRejectionDialog && (
        <div className="space-y-3">
          <Button
            onClick={handleApprove}
            disabled={loading}
            className="w-full bg-success-600 hover:bg-success-700 text-white"
          >
            Approve Submission
          </Button>
          
          <Button
            onClick={handleReject}
            disabled={loading}
            className="w-full bg-error-600 hover:bg-error-700 text-white"
          >
            Reject Submission
          </Button>
        </div>
      )}

      {showApprovalDialog && (
        <div className="space-y-4">
          <h4 className="font-medium text-text-900">Approve Submission</h4>
          
          <div>
            <TextArea
              id="approval-notes"
              label="Additional Notes (Optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes about the approval..."
              rows={3}
            />
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={handleApprove}
              disabled={loading}
              className="flex-1 bg-success-600 hover:bg-success-700 text-white"
            >
              {loading ? 'Approving...' : 'Confirm Approval'}
            </Button>
            
            <Button
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 bg-border-300 hover:bg-border-400 text-text-700"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {showRejectionDialog && (
        <div className="space-y-4">
          <h4 className="font-medium text-text-900">Reject Submission</h4>
          
          <div>
            <TextArea
              id="rejection-reason"
              label="Reason for Rejection"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Please provide a clear reason for rejection..."
              rows={3}
              required
            />
          </div>

          <div>
            <TextArea
              id="rejection-notes"
              label="Additional Notes (Optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes..."
              rows={2}
            />
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={handleReject}
              disabled={loading || !rejectionReason.trim()}
              className="flex-1 bg-error-600 hover:bg-error-700 text-white disabled:opacity-50"
            >
              {loading ? 'Rejecting...' : 'Confirm Rejection'}
            </Button>
            
            <Button
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 bg-border-300 hover:bg-border-400 text-text-700"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
