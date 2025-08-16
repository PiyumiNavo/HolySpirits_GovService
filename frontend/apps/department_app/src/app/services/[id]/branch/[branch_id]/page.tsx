'use client';

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card } from "@myorg/ui";

export default function BranchPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params?.id as string;
  const branchId = params?.branch_id as string;

  const handleViewSubmissions = () => {
    router.push(`/services/${serviceId}/branch/${branchId}/submissions`);
  };

  const handleBackToService = () => {
    router.push(`/services/${serviceId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-900">
            Branch Management
          </h1>
          <p className="text-text-600 mt-2">
            Manage branch settings and view submissions
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleBackToService}
        >
          Back to Service
        </Button>
      </div>

      {/* Branch Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card padding="lg" className="hover:shadow-lg transition-shadow duration-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-text-900 mb-2">
              View Submissions
            </h3>
            <p className="text-text-600 mb-4">
              View and manage all submissions for this branch
            </p>
            <Button onClick={handleViewSubmissions} className="w-full">
              View Submissions
            </Button>
          </div>
        </Card>

        <Card padding="lg" className="hover:shadow-lg transition-shadow duration-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-info-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-info-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-text-900 mb-2">
              Branch Settings
            </h3>
            <p className="text-text-600 mb-4">
              Configure branch settings and staff assignments
            </p>
            <Button variant="outline" className="w-full" disabled>
              Coming Soon
            </Button>
          </div>
        </Card>

        <Card padding="lg" className="hover:shadow-lg transition-shadow duration-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-text-900 mb-2">
              Analytics
            </h3>
            <p className="text-text-600 mb-4">
              View branch performance and statistics
            </p>
            <Button variant="outline" className="w-full" disabled>
              Coming Soon
            </Button>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-text-900 mb-6">Quick Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card padding="md" className="text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">150</div>
            <div className="text-sm text-text-600">Total Submissions</div>
          </Card>
          <Card padding="md" className="text-center">
            <div className="text-2xl font-bold text-warning-600 mb-1">45</div>
            <div className="text-sm text-text-600">Pending Review</div>
          </Card>
          <Card padding="md" className="text-center">
            <div className="text-2xl font-bold text-success-600 mb-1">90</div>
            <div className="text-sm text-text-600">Completed</div>
          </Card>
          <Card padding="md" className="text-center">
            <div className="text-2xl font-bold text-info-600 mb-1">8</div>
            <div className="text-sm text-text-600">Staff Members</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
