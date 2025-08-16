'use client';
import { use } from "react";
import { CitizenHeader, RoomSelector, GuestSelector } from "@myorg/ui";
import { useReservationState } from "./hooks/useReservationState";
import { 
  calculateTotalPrice, 
  isStepValid, 
  createReservationData, 
  getMockBungalowData, 
  getMockUnavailableDates 
} from "./utils/reservationUtils";
import {
  PropertyHeader,
  AvailabilityStep,
  ApplicantDetailsStep,
  ReservationSummaryStep,
  PaymentStep,
  SuccessStep,
  RatingStep,
  Sidebar,
  BottomActionBar
} from "./components";
import type { BungalowPageProps } from "./types";

export default function BungalowPage({ params }: BungalowPageProps) {
  const resolvedParams = use(params);
  const {
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
    setCheckInDate,
    setCheckOutDate,
    setApplicantDetails,
    setPaymentDetails,
    setReservationData,
    setRating,
    setReview,
    setRecommendation,
    setCurrentStep,

    // Actions
    goToNextStep,
    goToPreviousStep,
    resetForm,
    resetRating,
    handleRoomToggle,
    handleGuestCountChange,
  } = useReservationState();

  // Mock data
  const bungalow = getMockBungalowData(resolvedParams.id);
  const unavailableDates = getMockUnavailableDates();

  // Calculate total price
  const totalPrice = calculateTotalPrice(checkInDate, checkOutDate, selectedRooms, bungalow.rooms);

  // Check if current step is valid
  const stepValid = isStepValid(
    currentStep, 
    checkInDate, 
    checkOutDate, 
    selectedRooms, 
    applicantDetails, 
    guests, 
    paymentDetails
  );

  // Handle payment submission
  const handlePayment = () => {
    const newReservation = createReservationData(
      checkInDate, 
      checkOutDate, 
      guests, 
      selectedRooms, 
      totalPrice
    );
    setReservationData(newReservation);
    setCurrentStep('success');
  };

  // Handle date selection for calendar
  const handleDateSelect = (date: Date) => {
    if (!checkInDate) {
      setCheckInDate(date);
    } else {
      setCheckOutDate(date);
    }
  };

  // Handle feedback submission
  const handleSubmitFeedback = () => {
    alert('Thank you for your feedback!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      <CitizenHeader logoSrc="/logo.png" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PropertyHeader bungalow={bungalow} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-2.5 lg:p-3">
              
              {/* Availability Step */}
              {currentStep === 'availability' && (
                <AvailabilityStep
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  unavailableDates={unavailableDates}
                  onCheckInChange={setCheckInDate}
                  onCheckOutChange={setCheckOutDate}
                  onDateSelect={handleDateSelect}
                />
              )}

              {/* Room Selection Step */}
              {currentStep === 'rooms' && (
                <RoomSelector 
                  rooms={bungalow.rooms}
                  selectedRooms={selectedRooms}
                  onRoomToggle={handleRoomToggle}
                />
              )}

              {/* Applicant Details Step */}
              {currentStep === 'details' && (
                <ApplicantDetailsStep
                  applicantDetails={applicantDetails}
                  onDetailsChange={setApplicantDetails}
                />
              )}

              {/* Guest Details Step */}
              {currentStep === 'guests' && (
                <GuestSelector 
                  guests={guests}
                  onGuestCountChange={handleGuestCountChange}
                />
              )}

              {/* Reservation Summary Step */}
              {currentStep === 'summary' && (
                <ReservationSummaryStep
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  guests={guests}
                  selectedRooms={selectedRooms}
                  rooms={bungalow.rooms}
                  totalPrice={totalPrice}
                />
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <PaymentStep
                  bungalow={bungalow}
                  paymentDetails={paymentDetails}
                  totalPrice={totalPrice}
                  onPaymentDetailsChange={setPaymentDetails}
                />
              )}

              {/* Success Step */}
              {currentStep === 'success' && reservationData && (
                <SuccessStep
                  bungalow={bungalow}
                  reservationData={reservationData}
                  rooms={bungalow.rooms}
                />
              )}

              {/* Rating Step */}
              {currentStep === 'rating' && (
                <RatingStep
                  bungalow={bungalow}
                  rating={rating}
                  review={review}
                  recommendation={recommendation}
                  onRatingChange={setRating}
                  onReviewChange={setReview}
                  onRecommendationChange={setRecommendation}
                  onReset={resetRating}
                />
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <Sidebar currentStep={currentStep} />
        </div>

        {/* Bottom Action Bar */}
        <BottomActionBar
          currentStep={currentStep}
          totalPrice={totalPrice}
          isStepValid={stepValid}
          onPrevious={goToPreviousStep}
          onNext={goToNextStep}
          onReset={resetForm}
          onPayment={handlePayment}
          onRating={() => setCurrentStep('rating')}
          onSubmitFeedback={handleSubmitFeedback}
        />
      </div>
    </div>
  );
}
