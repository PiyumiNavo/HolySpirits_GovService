'use client';

import { Card } from '@myorg/ui';
import { SubmissionDetails } from '../types/submission-details.types';

interface CitizenInfoProps {
  citizen: SubmissionDetails['citizen'];
  appointment?: SubmissionDetails['appointment'];
  location?: SubmissionDetails['location'];
}

export function CitizenInfo({ citizen, appointment, location }: CitizenInfoProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-text-900 mb-4">
        Citizen Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-text-700">
              Name
            </label>
            <p className="text-text-900">{citizen.name}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-700">
              Email
            </label>
            <p className="text-text-900">{citizen.email}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-700">
              Verification Status
            </label>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              citizen.isVerified 
                ? 'bg-success-100 text-success-800' 
                : 'bg-warning-100 text-warning-800'
            }`}>
              {citizen.isVerified ? 'Verified' : 'Unverified'}
            </span>
          </div>
        </div>
        
        {(appointment || location) && (
          <div className="space-y-3">
            {appointment && (
              <>
                <div>
                  <label className="block text-sm font-medium text-text-700">
                    Appointment Date
                  </label>
                  <p className="text-text-900">{formatDate(appointment.date)}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-700">
                    Time Slot
                  </label>
                  <p className="text-text-900">
                    {appointment.startTime} - {appointment.endTime}
                  </p>
                </div>
                
                {appointment.tokenNumber && (
                  <div>
                    <label className="block text-sm font-medium text-text-700">
                      Token Number
                    </label>
                    <p className="text-text-900 font-mono">
                      {appointment.tokenNumber}
                    </p>
                  </div>
                )}
              </>
            )}
            
            {location && (
              <div>
                <label className="block text-sm font-medium text-text-700">
                  Service Location
                </label>
                <p className="text-text-900">{location.name}</p>
                <p className="text-text-600 text-sm">{location.address}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
