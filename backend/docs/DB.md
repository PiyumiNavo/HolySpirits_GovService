```javascript
// User Schema
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['system_admin', 'dept_admin', 'dept_staff', 'citizen'],
    },
    verificationDocuments: [
      {
        documentType: {
          type: String,
          required: true,
          enum: ['id', 'address_proof', 'certificate'],
        },
        documentNumber: { type: String },
        issuedBy: { type: String },
        issuedDate: { type: Date },
        expiryDate: { type: Date },
        verified: { type: Boolean, default: false },
        verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        verificationDate: { type: Date },
        documentUrl: { type: String },
      },
    ],
    isVerified: { type: Boolean, default: false },
    verificationDate: { type: Date },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: function () {
        return this.role !== 'citizen';
      },
    },
    assignedServices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
      },
    ],
    notificationPreferences: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
    },
  },
  { timestamps: true },
);

// Department Schema
const DepartmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // Official department name
    code: { type: String, unique: true }, // Official department code
    ministryName: { type: String }, // Parent ministry if applicable
    description: { type: String },
    address: { type: String },
    district: { type: String },
    province: { type: String },
    contactInfo: {
      emails: [{ type: String }], // Official email addresses
      phones: [{ type: String }], // Official phone numbers
      website: { type: String },
    },
    registrationNumber: { type: String }, // BRN number
    type: {
      type: String,
      enum: ['Ministry', 'Provincial Council', 'Local Authority', 'Other'],
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    logoUrl: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    mainAdminUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

// Location Schema
const LocationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    geoCoordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    workingHours: [
      {
        day: {
          type: String,
          enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
        },
        openingTime: { type: String }, // "09:00"
        closingTime: { type: String },
        isClosed: { type: Boolean, default: false },
      },
    ],
    capacity: { type: Number }, // For appointment scheduling
  },
  { timestamps: true },
);

// Service Schema with Form Field Validation
const FormFieldSchema = new mongoose.Schema(
  {
    fieldType: {
      type: String,
      required: true,
      enum: [
        'text',
        'number',
        'date',
        'time',
        'select',
        'radio',
        'checkbox',
        'textarea',
        'file',
      ],
    },
    label: { type: String, required: true },
    key: { type: String, required: true }, // Unique identifier for the field
    required: { type: Boolean, default: false },
    options: [
      {
        // For select, radio, checkbox
        label: String,
        value: String,
      },
    ],
    validation: {
      minLength: { type: Number },
      maxLength: { type: Number },
      pattern: { type: String }, // Regex pattern
      minValue: { type: Number },
      maxValue: { type: Number },
    },
    placeholder: { type: String },
  },
  { _id: false },
);

const AppointmentSettingsSchema = new mongoose.Schema(
  {
    isRequired: { type: Boolean, default: false },
    duration: { type: Number, default: 30 }, // Minutes
    maxPerSlot: { type: Number, default: 1 },
    bufferTime: { type: Number, default: 0 }, // Minutes between appointments
    advanceBookingDays: { type: Number, default: 30 },
    blackoutDates: [{ type: Date }],
    timeSlots: [
      {
        day: {
          type: String,
          enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
        },
        startTime: { type: String },
        endTime: { type: String },
        isAvailable: { type: Boolean, default: true },
      },
    ],
  },
  { _id: false },
);

const ServiceSchema = new mongoose.Schema(
  {
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    type: {
      type: String,
      required: true,
      enum: [
        'single-location', // User doesn’t need to choose a location — it’s already fixed.
        'multi-location-preselect', // The system must show a list of locations and let the user select one during booking.
        'multi-location-inform', // No location selection step; just display available locations.
      ],
    },
    locationIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
      },
    ],
    formFields: [FormFieldSchema],
    appointmentSettings: AppointmentSettingsSchema,
    autoAcceptAppointments: { type: Boolean, default: false },
    createdBy: {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublished: { type: Boolean, default: false },
    processingTime: { type: Number }, // In days
  },
  { timestamps: true },
  }
);

// Submission Schema with Appointment Conflict Handling
const SubmissionSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    citizenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    formData: { type: Map, of: mongoose.Schema.Types.Mixed },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'],
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    appointment: {
      date: { type: Date },
      startTime: { type: String },
      endTime: { type: String },
      locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
      tokenNumber: { type: String },
    },
    notes: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    documents: [
      {
        name: { type: String },
        url: { type: String },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

// Appointment Conflict Prevention Index
SubmissionSchema.index(
  {
    'appointment.date': 1,
    'appointment.startTime': 1,
    'appointment.endTime': 1,
    'appointment.locationId': 1,
  },
  {
    unique: true,
    partialFilterExpression: { 'appointment.date': { $exists: true } },
  },
);

// Notification Schema
const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: [
        'status_update',
        'appointment_reminder',
        'system',
        'form_submission',
      ],
    },
    relatedEntity: {
      type: { type: String, enum: ['submission', 'service', 'department'] },
      id: { type: mongoose.Schema.Types.ObjectId },
    },
    isRead: { type: Boolean, default: false },
    readAt: { type: Date },
  },
  { timestamps: true },
);

module.exports = {
  User: mongoose.model('User', UserSchema),
  Department: mongoose.model('Department', DepartmentSchema),
  Location: mongoose.model('Location', LocationSchema),
  Service: mongoose.model('Service', ServiceSchema),
  Submission: mongoose.model('Submission', SubmissionSchema),
  Notification: mongoose.model('Notification', NotificationSchema),
};
```
