// Types for the reservation flow
export type ReservationStep = 'availability' | 'rooms' | 'details' | 'guests' | 'summary' | 'payment' | 'success' | 'rating';

export interface Guest {
  id: string;
  label: string;
  ageGroup: string;
  count: number;
}

export interface Room {
  id: string;
  name: string;
  maxOccupancy: number;
  price: number;
  currency: string;
  isAvailable: boolean;
}

export interface ApplicantDetails {
  category: string;
  eppOrPensionNo: string;
  name: string;
  contactNo: string;
  email: string;
}

export interface PaymentDetails {
  method: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

export interface ReservationData {
  reservationId: string;
  checkIn: string;
  checkOut: string;
  guests: Guest[];
  rooms: string[];
  totalAmount: number;
}

export interface Bungalow {
  id: string;
  name: string;
  location: string;
  department: string;
  image: string;
  rooms: Room[];
}

export interface BungalowPageProps {
  params: Promise<{
    id: string;
  }>;
}
