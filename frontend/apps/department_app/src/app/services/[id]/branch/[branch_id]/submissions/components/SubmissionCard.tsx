'use client';

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, StatusBadge, Button } from "@myorg/ui";
import { Submission } from "../types/submission.types";

interface SubmissionCardProps {
  submission: Submission;
  onUpdate?: () => void;
}

export default function SubmissionCard({ 
  submission, 
  onUpdate 
}: SubmissionCardProps) {
  const router = useRouter();
  const params = useParams();
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleStatusChange = (newStatus: string) => {
    // TODO: Implement status change API call
    console.log(`Changing status of submission ${submission.id} to ${newStatus}`);
    onUpdate?.();
  };

  const handleViewDetails = () => {
    // Navigate to submission details page
    const detailsUrl = `/services/${params.id}/branch/${params.branch_id}/submissions/${submission.id}`;
    router.push(detailsUrl);
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200" padding="md">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <StatusBadge status={submission.status} />
          <div>
            <h3 className="font-medium text-text-900">{submission.citizenName}</h3>
            <p className="text-sm text-text-500">{submission.citizenEmail}</p>
          </div>
        </div>
        <div className="text-right text-sm text-text-500">
          <p>#{submission.id.slice(-8)}</p>
          <p>{formatDate(submission.createdAt)}</p>
        </div>
      </div>

      {/* Appointment Information */}
      {submission.appointment && (
        <div className="mb-4 p-3 bg-primary-400 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium text-primary-600">Appointment Scheduled</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-text-700">
                <strong>Date:</strong> {formatDate(submission.appointment.date)}
              </p>
              <p className="text-text-700">
                <strong>Time:</strong> {submission.appointment.startTime} - {submission.appointment.endTime}
              </p>
            </div>
            <div>
              <p className="text-text-700">
                <strong>Token:</strong> {submission.appointment.tokenNumber}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Information */}
      {submission.assignedTo && (
        <div className="mb-4 flex items-center space-x-2">
          <svg className="w-4 h-4 text-text-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-sm text-text-700">
            Assigned to: <strong>{submission.assignedTo.name}</strong>
          </span>
        </div>
      )}

      {/* Documents Information */}
      {submission.documentsCount > 0 && (
        <div className="mb-4 flex items-center space-x-2">
          <svg className="w-4 h-4 text-text-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm text-text-700">
            {submission.documentsCount} document{submission.documentsCount > 1 ? 's' : ''} attached
          </span>
        </div>
      )}

      {/* Form Data Preview */}
      <div className="mb-4 text-sm">
        <p className="text-text-500 mb-1">Form Data:</p>
        <div className="bg-background-50 p-2 rounded text-text-700">
          {Object.keys(submission.formData).length > 0 ? (
            <span>{Object.keys(submission.formData).length} field{Object.keys(submission.formData).length > 1 ? 's' : ''} submitted</span>
          ) : (
            <span className="italic">No form data</span>
          )}
        </div>
      </div>

      {/* Timestamps */}
      <div className="mb-4 grid grid-cols-2 gap-4 text-xs text-text-500">
        <div>
          <p><strong>Created:</strong> {formatDate(submission.createdAt)} at {formatTime(submission.createdAt)}</p>
        </div>
        <div>
          <p><strong>Updated:</strong> {formatDate(submission.updatedAt)} at {formatTime(submission.updatedAt)}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border-200">
        <div className="flex space-x-2">
          {submission.status === 'pending' && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleStatusChange('approved')}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleStatusChange('rejected')}
              >
                Reject
              </Button>
            </>
          )}
        </div>
        
        <Button
          size="sm"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
}
