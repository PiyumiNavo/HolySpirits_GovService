import type { 
  ReservationStep, 
  ApplicantDetails, 
  PaymentDetails, 
  Guest, 
  ReservationData, 
  Room 
} from "../types";

export function calculateTotalPrice(
  checkInDate: Date | undefined,
  checkOutDate: Date | undefined,
  selectedRooms: string[],
  rooms: Room[]
): number {
  if (!checkInDate || !checkOutDate || selectedRooms.length === 0) return 0;
  
  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  const roomTotal = selectedRooms.reduce((total, roomId) => {
    const room = rooms.find(r => r.id === roomId);
    return total + (room?.price || 0);
  }, 0);
  
  return roomTotal * nights;
}

export function isStepValid(
  currentStep: ReservationStep,
  checkInDate: Date | undefined,
  checkOutDate: Date | undefined,
  selectedRooms: string[],
  applicantDetails: ApplicantDetails,
  guests: Guest[],
  paymentDetails: PaymentDetails
): boolean {
  switch (currentStep) {
    case 'availability':
      return !!(checkInDate && checkOutDate);
    case 'rooms':
      return selectedRooms.length > 0;
    case 'details':
      return !!(applicantDetails.category && applicantDetails.name && applicantDetails.contactNo && applicantDetails.email);
    case 'guests':
      return guests.some(guest => guest.count > 0);
    case 'payment':
      return !!(paymentDetails.method && paymentDetails.cardName && paymentDetails.cardNumber && paymentDetails.expiry && paymentDetails.cvc);
    default:
      return true;
  }
}

export function createReservationData(
  checkInDate: Date | undefined,
  checkOutDate: Date | undefined,
  guests: Guest[],
  selectedRooms: string[],
  totalAmount: number
): ReservationData {
  return {
    reservationId: '#NE23345',
    checkIn: checkInDate?.toLocaleDateString() || '',
    checkOut: checkOutDate?.toLocaleDateString() || '',
    guests: guests,
    rooms: selectedRooms,
    totalAmount: totalAmount
  };
}

export function getMockBungalowData(id: string) {
  return {
    id: id,
    name: "Nuwara Eliya - New (A1)",
    location: "No 60, Hatpe Rd, Ella 90090",
    department: "Ministry of Public Administration, Provincial Councils",
    image: "/nuwara-eliya.jpg",
    rooms: [
      { id: 'vip-large', name: 'VIP Large 01', maxOccupancy: 2, price: 4400, currency: 'LKR', isAvailable: false },
      { id: 'ac-01', name: 'AC 01', maxOccupancy: 2, price: 2000, currency: 'LKR', isAvailable: true },
      { id: 'ac-02', name: 'AC 02', maxOccupancy: 3, price: 2500, currency: 'LKR', isAvailable: true },
      { id: 'ac-03', name: 'AC 03', maxOccupancy: 3, price: 2500, currency: 'LKR', isAvailable: true },
    ] as Room[]
  };
}

export function getMockUnavailableDates(): Date[] {
  return [
    new Date(2025, 7, 20), // Aug 20, 2025
    new Date(2025, 7, 21), // Aug 21, 2025
    new Date(2025, 7, 25), // Aug 25, 2025
  ];
}
