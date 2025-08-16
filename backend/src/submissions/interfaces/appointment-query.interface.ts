/**
 * Interface for appointment query conditions
 */
export interface AppointmentQueryConditions {
  'appointment.date': Date;
  'appointment.startTime': string;
  'appointment.endTime': string;
  'appointment.locationId': string | import('mongoose').Types.ObjectId;
}
