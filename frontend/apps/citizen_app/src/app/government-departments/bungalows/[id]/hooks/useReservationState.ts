import { useState } from "react";
import type { 
  ReservationStep, 
  Guest, 
  ApplicantDetails, 
  PaymentDetails, 
  ReservationData 
} from "../types";

export function useReservationState() {
  // State management
  const [currentStep, setCurrentStep] = useState<ReservationStep>('availability');
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [guests, setGuests] = useState<Guest[]>([
    { id: 'adults', label: 'Adults', ageGroup: 'Age 13 or above', count: 2 },
    { id: 'children', label: 'Children', ageGroup: 'Age 2-12', count: 0 },
    { id: 'infants', label: 'Infants', ageGroup: 'Under age 2', count: 0 },
  ]);
  const [applicantDetails, setApplicantDetails] = useState<ApplicantDetails>({
    category: '',
    eppOrPensionNo: '',
    name: '',
    contactNo: '',
    email: ''
  });
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    method: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });
  const [reservationData, setReservationData] = useState<ReservationData | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [recommendation, setRecommendation] = useState<string>('');

  // Navigation functions
  const goToNextStep = () => {
    const steps: ReservationStep[] = ['availability', 'rooms', 'details', 'guests', 'summary', 'payment', 'success', 'rating'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    const steps: ReservationStep[] = ['availability', 'rooms', 'details', 'guests', 'summary', 'payment', 'success', 'rating'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const resetForm = () => {
    setCheckInDate(undefined);
    setCheckOutDate(undefined);
    setSelectedRooms([]);
    setGuests([
      { id: 'adults', label: 'Adults', ageGroup: 'Age 13 or above', count: 2 },
      { id: 'children', label: 'Children', ageGroup: 'Age 2-12', count: 0 },
      { id: 'infants', label: 'Infants', ageGroup: 'Under age 2', count: 0 },
    ]);
    setApplicantDetails({
      category: '',
      eppOrPensionNo: '',
      name: '',
      contactNo: '',
      email: ''
    });
  };

  const resetRating = () => {
    setRating(0);
    setReview('');
    setRecommendation('');
  };

  // Handler functions
  const handleRoomToggle = (roomId: string) => {
    setSelectedRooms(prev => 
      prev.includes(roomId) 
        ? prev.filter(id => id !== roomId)
        : [...prev, roomId]
    );
  };

  const handleGuestCountChange = (guestId: string, count: number) => {
    setGuests(prev => prev.map(guest => 
      guest.id === guestId ? { ...guest, count } : guest
    ));
  };

  return {
    // State
    currentStep,
    checkInDate,
    checkOutDate,
    selectedRooms,
    guests,
    applicantDetails,
    paymentDetails,
    reservationData,
    rating,
    review,
    recommendation,

    // Setters
    setCurrentStep,
    setCheckInDate,
    setCheckOutDate,
    setSelectedRooms,
    setGuests,
    setApplicantDetails,
    setPaymentDetails,
    setReservationData,
    setRating,
    setReview,
    setRecommendation,

    // Actions
    goToNextStep,
    goToPreviousStep,
    resetForm,
    resetRating,
    handleRoomToggle,
    handleGuestCountChange,
  };
}
