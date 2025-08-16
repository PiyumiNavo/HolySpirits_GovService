import { Button } from "@myorg/ui";
import type { ReservationStep } from "../types";

interface BottomActionBarProps {
  currentStep: ReservationStep;
  totalPrice: number;
  isStepValid: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onReset: () => void;
  onPayment: () => void;
  onRating: () => void;
  onSubmitFeedback: () => void;
}

export function BottomActionBar({
  currentStep,
  totalPrice,
  isStepValid,
  onPrevious,
  onNext,
  onReset,
  onPayment,
  onRating,
  onSubmitFeedback
}: BottomActionBarProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-3 mt-3 mb-4">
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
        <div className="text-center sm:text-left">
          {(currentStep === 'summary' || currentStep === 'payment') && (
            <div>
              <p className="text-lg font-bold text-gray-900">LKR {totalPrice.toFixed(2)}</p>
              <p className="text-gray-600 text-sm">Total Amount</p>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          {/* Back Button */}
          {currentStep !== 'availability' && currentStep !== 'success' && currentStep !== 'rating' && (
            <Button 
              variant="outline" 
              onClick={onPrevious}
              className="flex-1 sm:flex-none px-4 py-1.5 text-sm"
            >
              {currentStep === 'payment' ? 'Go back' : 'Back'}
            </Button>
          )}
          
          {/* Reset Button for Availability */}
          {currentStep === 'availability' && (
            <Button 
              variant="outline" 
              onClick={onReset}
              className="flex-1 sm:flex-none px-4 py-1.5 text-sm"
            >
              Reset
            </Button>
          )}
          
          {/* Continue Button for Availability to Guests */}
          {['availability', 'rooms', 'details', 'guests'].includes(currentStep) && (
            <Button 
              variant="primary"
              onClick={onNext}
              disabled={!isStepValid}
              className="flex-1 sm:flex-none px-4 py-1.5 text-sm"
            >
              Continue
            </Button>
          )}

          {/* Proceed to Payment Button */}
          {currentStep === 'summary' && (
            <Button 
              variant="primary"
              onClick={onNext}
              disabled={!isStepValid}
              className="flex-1 sm:flex-none px-4 py-1.5 text-sm"
            >
              Proceed to Payment
            </Button>
          )}

          {/* Payment Submit Button */}
          {currentStep === 'payment' && (
            <Button 
              variant="primary"
              onClick={onPayment}
              disabled={!isStepValid}
              className="flex-1 sm:flex-none px-4 py-1.5 text-sm"
            >
              Proceed to Payment
            </Button>
          )}

          {/* Success Page - Back to Home */}
          {currentStep === 'success' && (
            <Button 
              variant="primary"
              onClick={onRating}
              className="flex-1 sm:flex-none px-4 py-1.5 text-sm"
            >
              Back to Home
            </Button>
          )}

          {/* Rating Submit Button */}
          {currentStep === 'rating' && (
            <Button 
              variant="primary"
              onClick={onSubmitFeedback}
              className="flex-1 sm:flex-none px-4 py-1.5 text-sm"
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
