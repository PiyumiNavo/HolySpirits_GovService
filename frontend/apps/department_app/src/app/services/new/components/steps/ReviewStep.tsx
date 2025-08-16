import React from "react";
import { Card } from "@myorg/ui";
import { ServiceDetails, Location, FormField, AppointmentSettings } from "../../types/service-creation.types";

interface ReviewStepProps {
  serviceDetails: ServiceDetails;
  selectedBranches: Location[];
  formFields: FormField[];
  appointmentSettings: Record<string, AppointmentSettings>;
}

const fieldTypeLabels: Record<string, string> = {
  text: "Text Input",
  number: "Number Input", 
  date: "Date Picker",
  time: "Time Picker",
  select: "Dropdown Selection",
  radio: "Radio Buttons",
  checkbox: "Checkboxes",
  textarea: "Text Area",
  file: "File Upload"
};

const serviceTypeLabels: Record<string, string> = {
  "single-location": "Single Location",
  "multi-location-preselect": "Multi-location with Selection",
  "multi-location-inform": "Multi-location Informational"
};

const daysOfWeek: Record<string, string> = {
  mon: 'Monday',
  tue: 'Tuesday', 
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday'
};

export default function ReviewStep({ 
  serviceDetails, 
  selectedBranches, 
  formFields, 
  appointmentSettings 
}: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-text-900 mb-4">Review & Confirm</h2>
        <p className="text-text-500 mb-6">
          Please review all the details below before creating the service. You can go back to edit any section if needed.
        </p>
      </div>

      {/* Service Details */}
      <Card padding="md">
        <h3 className="text-lg font-medium text-text-900 mb-4">Service Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-text-700">Service Name</p>
            <p className="text-text-900">{serviceDetails.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-text-700">Service Type</p>
            <p className="text-text-900">{serviceTypeLabels[serviceDetails.type]}</p>
          </div>
        </div>
        {serviceDetails.description && (
          <div className="mt-4">
            <p className="text-sm font-medium text-text-700">Description</p>
            <p className="text-text-900">{serviceDetails.description}</p>
          </div>
        )}
      </Card>

      {/* Selected Branches */}
      <Card padding="md">
        <h3 className="text-lg font-medium text-text-900 mb-4">
          Selected Branches ({selectedBranches.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedBranches.map((branch) => (
            <div key={branch.id} className="border border-border-200 rounded-lg p-3">
              <h4 className="font-medium text-text-900">{branch.name}</h4>
              <p className="text-sm text-text-500">{branch.address}</p>
              <div className="mt-2 flex justify-between text-xs text-text-500">
                <span>{branch.counterCount} Counters</span>
                <span>{branch.assigneeCount} Staff</span>
              </div>
              {/* Appointment settings indicator */}
              <div className="mt-2">
                {appointmentSettings[branch.id] ? (
                  <span className="inline-flex items-center px-2 py-1 text-xs bg-success-100 text-success-500 rounded-full">
                    ✓ Settings Configured
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 text-xs bg-warning-100 text-warning-500 rounded-full">
                    ⚠ Settings Missing
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Form Fields */}
      <Card padding="md">
        <h3 className="text-lg font-medium text-text-900 mb-4">
          Application Form ({formFields.length} fields)
        </h3>
        {formFields.length > 0 ? (
          <div className="space-y-3">
            {formFields.map((field, index) => (
              <div key={field.id} className="border border-border-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-text-900">
                      {index + 1}. {field.label}
                      {field.required && <span className="text-error-500 ml-1">*</span>}
                    </h4>
                    <p className="text-sm text-text-500">
                      Type: {fieldTypeLabels[field.fieldType]}
                      {field.placeholder && ` • Placeholder: "${field.placeholder}"`}
                    </p>
                  </div>
                </div>
                
                {/* Show options for select/radio/checkbox fields */}
                {field.options && field.options.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-text-500 mb-1">Options:</p>
                    <div className="flex flex-wrap gap-1">
                      {field.options.map((option, i) => (
                        <span key={i} className="px-2 py-1 bg-background-50 text-text-700 text-xs rounded">
                          {option.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-500 italic">No form fields configured</p>
        )}
      </Card>

      {/* Appointment Settings Summary */}
      <Card padding="md">
        <h3 className="text-lg font-medium text-text-900 mb-4">Appointment Settings</h3>
        <div className="space-y-4">
          {selectedBranches.map((branch) => {
            const settings = appointmentSettings[branch.id];
            if (!settings) {
              return (
                <div key={branch.id} className="border border-warning-500 bg-warning-100 rounded-lg p-3">
                  <h4 className="font-medium text-warning-500">{branch.name}</h4>
                  <p className="text-warning-500 text-sm">⚠ Appointment settings not configured</p>
                </div>
              );
            }

            return (
              <div key={branch.id} className="border border-border-200 rounded-lg p-3">
                <h4 className="font-medium text-text-900 mb-2">{branch.name}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Appointments:</strong> {settings.isRequired ? 'Required' : 'Optional'}</p>
                    <p><strong>Duration:</strong> {settings.duration} minutes</p>
                    <p><strong>Max per slot:</strong> {settings.maxPerSlot} people</p>
                    <p><strong>Buffer time:</strong> {settings.bufferTime} minutes</p>
                    <p><strong>Advance booking:</strong> {settings.advanceBookingDays} days</p>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-1">Available Hours:</p>
                    <div className="space-y-1">
                      {settings.timeSlots
                        .filter(slot => slot.isAvailable)
                        .map(slot => (
                          <div key={slot.day} className="text-xs">
                            {daysOfWeek[slot.day]}: {slot.startTime} - {slot.endTime}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Validation Summary */}
      <Card padding="md" className="bg-primary-400">
        <h3 className="text-lg font-medium text-primary-600 mb-4">Ready to Create</h3>
        <div className="space-y-2 text-sm text-text-700">
          <div className="flex items-center">
            <span className="text-success-500 mr-2">✓</span>
            Service details provided
          </div>
          <div className="flex items-center">
            <span className="text-success-500 mr-2">✓</span>
            {selectedBranches.length} branch{selectedBranches.length > 1 ? 'es' : ''} selected
          </div>
          <div className="flex items-center">
            <span className="text-success-500 mr-2">✓</span>
            {formFields.length} form field{formFields.length > 1 ? 's' : ''} configured
          </div>
          <div className="flex items-center">
            <span className={`mr-2 ${
              selectedBranches.every(b => appointmentSettings[b.id]) 
                ? 'text-success-500' 
                : 'text-warning-500'
            }`}>
              {selectedBranches.every(b => appointmentSettings[b.id]) ? '✓' : '⚠'}
            </span>
            Appointment settings for {
              selectedBranches.filter(b => appointmentSettings[b.id]).length
            } of {selectedBranches.length} branches
          </div>
        </div>
        
        {!selectedBranches.every(b => appointmentSettings[b.id]) && (
          <div className="mt-4 p-3 bg-warning-100 border border-warning-500 rounded-md">
            <p className="text-warning-500 text-sm">
              Please configure appointment settings for all selected branches before creating the service.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
