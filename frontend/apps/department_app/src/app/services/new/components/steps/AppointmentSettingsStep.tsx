import React, { useState } from "react";
import { Card, InputField, Checkbox, Select, Button } from "@myorg/ui";
import { Location, AppointmentSettings } from "../../types/service-creation.types";

interface AppointmentSettingsStepProps {
  selectedBranches: Location[];
  appointmentSettings: Record<string, AppointmentSettings>;
  onUpdate: (branchId: string, settings: AppointmentSettings) => void;
  error?: string;
}

const daysOfWeek = [
  { value: 'mon', label: 'Monday' },
  { value: 'tue', label: 'Tuesday' },
  { value: 'wed', label: 'Wednesday' },
  { value: 'thu', label: 'Thursday' },
  { value: 'fri', label: 'Friday' },
  { value: 'sat', label: 'Saturday' },
  { value: 'sun', label: 'Sunday' },
];

const defaultAppointmentSettings: AppointmentSettings = {
  isRequired: true,
  duration: 30,
  maxPerSlot: 1,
  bufferTime: 0,
  advanceBookingDays: 30,
  blackoutDates: [],
  timeSlots: [
    { day: 'mon', startTime: '09:00', endTime: '17:00', isAvailable: true },
    { day: 'tue', startTime: '09:00', endTime: '17:00', isAvailable: true },
    { day: 'wed', startTime: '09:00', endTime: '17:00', isAvailable: true },
    { day: 'thu', startTime: '09:00', endTime: '17:00', isAvailable: true },
    { day: 'fri', startTime: '09:00', endTime: '17:00', isAvailable: true },
    { day: 'sat', startTime: '09:00', endTime: '13:00', isAvailable: true },
    { day: 'sun', startTime: '09:00', endTime: '17:00', isAvailable: false },
  ]
};

export default function AppointmentSettingsStep({ 
  selectedBranches, 
  appointmentSettings, 
  onUpdate, 
  error 
}: AppointmentSettingsStepProps) {
  const [selectedBranchId, setSelectedBranchId] = useState<string>(
    selectedBranches.length > 0 ? selectedBranches[0].id : ''
  );

  const currentSettings = appointmentSettings[selectedBranchId] || defaultAppointmentSettings;

  const updateSettings = (updates: Partial<AppointmentSettings>) => {
    onUpdate(selectedBranchId, { ...currentSettings, ...updates });
  };

  const updateTimeSlot = (day: string, updates: Partial<AppointmentSettings['timeSlots'][0]>) => {
    const newTimeSlots = currentSettings.timeSlots.map(slot =>
      slot.day === day ? { ...slot, ...updates } : slot
    );
    updateSettings({ timeSlots: newTimeSlots });
  };

  const copySettingsToAll = () => {
    selectedBranches.forEach(branch => {
      if (branch.id !== selectedBranchId) {
        onUpdate(branch.id, { ...currentSettings });
      }
    });
  };

  if (selectedBranches.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-text-500">Please select branches first before configuring appointment settings.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-text-900 mb-4">Appointment Settings</h2>
        <p className="text-text-500 mb-6">
          Configure how citizens can book appointments for this service at each branch.
        </p>
      </div>

      {error && (
        <div className="bg-error-100 border border-error-500 p-4 rounded-md">
          <p className="text-error-500 text-sm">{error}</p>
        </div>
      )}

      {/* Branch Selector */}
      <Card padding="md">
        <div className="flex items-center justify-between mb-4">
          <Select
            id="branchSelector"
            label="Configure settings for branch"
            value={selectedBranchId}
            onChange={setSelectedBranchId}
            options={selectedBranches.map(branch => ({
              value: branch.id,
              label: branch.name
            }))}
          />
          
          {selectedBranches.length > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={copySettingsToAll}
            >
              Copy to All Branches
            </Button>
          )}
        </div>

        {/* Settings completed indicator */}
        <div className="flex gap-2 flex-wrap">
          {selectedBranches.map(branch => (
            <span
              key={branch.id}
              className={`px-2 py-1 text-xs rounded-full ${
                appointmentSettings[branch.id]
                  ? 'bg-success-100 text-success-500'
                  : 'bg-warning-100 text-warning-500'
              }`}
            >
              {branch.name} {appointmentSettings[branch.id] ? '✓' : '!'}
            </span>
          ))}
        </div>
      </Card>

      {/* Appointment Settings Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Settings */}
        <Card padding="md">
          <h3 className="text-lg font-medium text-text-900 mb-4">Basic Settings</h3>
          
          <div className="space-y-4">
            <Checkbox
              id="isRequired"
              label="Appointment Required"
              checked={currentSettings.isRequired}
              onChange={(checked) => updateSettings({ isRequired: checked })}
            />

            <InputField
              id="duration"
              label="Appointment Duration (minutes)"
              type="number"
              value={currentSettings.duration.toString()}
              onChange={(e) => updateSettings({ duration: parseInt(e.target.value) || 30 })}
              placeholder="30"
            />

            <InputField
              id="maxPerSlot"
              label="Maximum People per Time Slot"
              type="number"
              value={currentSettings.maxPerSlot.toString()}
              onChange={(e) => updateSettings({ maxPerSlot: parseInt(e.target.value) || 1 })}
              placeholder="1"
            />

            <InputField
              id="bufferTime"
              label="Buffer Time Between Appointments (minutes)"
              type="number"
              value={currentSettings.bufferTime.toString()}
              onChange={(e) => updateSettings({ bufferTime: parseInt(e.target.value) || 0 })}
              placeholder="0"
            />

            <InputField
              id="advanceBookingDays"
              label="Advance Booking Days"
              type="number"
              value={currentSettings.advanceBookingDays.toString()}
              onChange={(e) => updateSettings({ advanceBookingDays: parseInt(e.target.value) || 30 })}
              placeholder="30"
            />
          </div>
        </Card>

        {/* Working Hours */}
        <Card padding="md">
          <h3 className="text-lg font-medium text-text-900 mb-4">Working Hours</h3>
          
          <div className="space-y-3">
            {daysOfWeek.map(({ value, label }) => {
              const timeSlot = currentSettings.timeSlots.find(slot => slot.day === value);
              return (
                <div key={value} className="grid grid-cols-4 gap-2 items-center">
                  <span className="text-sm font-medium text-text-700">{label}</span>
                  
                  <Checkbox
                    id={`available-${value}`}
                    label=""
                    checked={timeSlot?.isAvailable || false}
                    onChange={(checked) => updateTimeSlot(value, { isAvailable: checked })}
                  />
                  
                  <input
                    type="time"
                    value={timeSlot?.startTime || '09:00'}
                    onChange={(e) => updateTimeSlot(value, { startTime: e.target.value })}
                    disabled={!timeSlot?.isAvailable}
                    className="px-2 py-1 text-sm border border-border-200 rounded disabled:bg-gray-100"
                  />
                  
                  <input
                    type="time"
                    value={timeSlot?.endTime || '17:00'}
                    onChange={(e) => updateTimeSlot(value, { endTime: e.target.value })}
                    disabled={!timeSlot?.isAvailable}
                    className="px-2 py-1 text-sm border border-border-200 rounded disabled:bg-gray-100"
                  />
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 text-xs text-text-500">
            <p>Check the box to enable appointments for that day, then set the start and end times.</p>
          </div>
        </Card>
      </div>

      {/* Preview */}
      <Card padding="md" className="bg-primary-400">
        <h3 className="text-lg font-medium text-primary-600 mb-4">Settings Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Appointments:</strong> {currentSettings.isRequired ? 'Required' : 'Optional'}</p>
            <p><strong>Duration:</strong> {currentSettings.duration} minutes</p>
            <p><strong>Max per slot:</strong> {currentSettings.maxPerSlot} people</p>
            <p><strong>Buffer time:</strong> {currentSettings.bufferTime} minutes</p>
          </div>
          
          <div>
            <p><strong>Advance booking:</strong> {currentSettings.advanceBookingDays} days</p>
            <p><strong>Available days:</strong></p>
            <ul className="ml-4 list-disc">
              {currentSettings.timeSlots
                .filter(slot => slot.isAvailable)
                .map(slot => (
                  <li key={slot.day}>
                    {daysOfWeek.find(d => d.value === slot.day)?.label}: {slot.startTime} - {slot.endTime}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
