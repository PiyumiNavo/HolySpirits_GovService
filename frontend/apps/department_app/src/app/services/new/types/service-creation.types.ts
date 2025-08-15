export interface FormField {
  id: string;
  fieldType: 'text' | 'number' | 'date' | 'time' | 'select' | 'radio' | 'checkbox' | 'textarea' | 'file';
  label: string;
  key: string;
  required: boolean;
  options?: Array<{
    label: string;
    value: string;
  }>;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    minValue?: number;
    maxValue?: number;
  };
  placeholder?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  departmentId: string;
  geoCoordinates?: {
    lat: number;
    lng: number;
  };
  workingHours: Array<{
    day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
    openingTime: string;
    closingTime: string;
    isClosed: boolean;
  }>;
  capacity?: number;
  counterCount?: number;
  mainAssignee?: string;
  assigneeCount?: number;
}

export interface AppointmentSettings {
  isRequired: boolean;
  duration: number; // Minutes
  maxPerSlot: number;
  bufferTime: number; // Minutes between appointments
  advanceBookingDays: number;
  blackoutDates: Date[];
  timeSlots: Array<{
    day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }>;
}

export interface ServiceDetails {
  name: string;
  description: string;
  type: 'single-location' | 'multi-location-preselect' | 'multi-location-inform';
}

export interface ServiceCreationState {
  currentStep: number;
  serviceDetails: ServiceDetails;
  selectedBranches: Location[];
  formFields: FormField[];
  appointmentSettingsByBranch: Record<string, AppointmentSettings>;
  isLoading: boolean;
  errors: Record<string, string>;
}

export interface CreateServiceRequest {
  name: string;
  description: string;
  type: string;
  locationIds: string[];
  formFields: FormField[];
  appointmentSettingsByLocation: Record<string, AppointmentSettings>;
}
