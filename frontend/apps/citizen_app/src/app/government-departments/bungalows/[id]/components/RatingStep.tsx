import Image from "next/image";
import { Heading } from "@myorg/ui";
import type { Bungalow } from "../types";

interface RatingStepProps {
  bungalow: Bungalow;
  rating: number;
  review: string;
  recommendation: string;
  onRatingChange: (rating: number) => void;
  onReviewChange: (review: string) => void;
  onRecommendationChange: (recommendation: string) => void;
  onReset: () => void;
}

export function RatingStep({
  bungalow,
  rating,
  review,
  recommendation,
  onRatingChange,
  onReviewChange,
  onRecommendationChange,
  onReset
}: RatingStepProps) {
  const getRatingText = (rating: number) => {
    switch (rating) {
      case 0: return 'Click to rate';
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Click to rate';
    }
  };

  return (
    <div className="space-y-3">
      {/* Property Header */}
      <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-3 mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
            <Image
              src={bungalow.image}
              alt={bungalow.name}
              width={40}
              height={40}
              className="rounded object-cover"
            />
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-600">{bungalow.department}</p>
            <h3 className="text-sm font-semibold text-gray-900">{bungalow.name}</h3>
            <p className="text-xs text-gray-600">{bungalow.location}</p>
          </div>
        </div>
      </div>

      <div className="text-center space-y-3">
        <div>
          <Heading level={2} size="md" className="mb-1">How was your experience?</Heading>
          <p className="text-gray-600 text-xs">Reviews are public</p>
        </div>

        {/* Rating Section */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-3">
          <div className="text-center">
            <p className="text-gray-600 text-xs mb-2">Rate this bungalow:</p>
            <div className="flex justify-center space-x-1 text-2xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => onRatingChange(star)}
                  className={`transition-colors ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300'
                  } hover:text-yellow-400`}
                >
                  ★
                </button>
              ))}
            </div>
            <p className="text-gray-600 text-xs mt-1">
              {getRatingText(rating)}
            </p>
          </div>

          {/* Review Input */}
          <div className="space-y-2">
            <div>
              <label className="block text-left text-gray-700 font-medium text-xs mb-1">
                Describe your experience
              </label>
              <textarea
                value={review}
                onChange={(e) => onReviewChange(e.target.value)}
                placeholder="eg: would stay again"
                className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-left text-gray-700 font-medium text-xs mb-1">
                Tell us more (optional)
              </label>
              <textarea
                value={recommendation}
                onChange={(e) => onRecommendationChange(e.target.value)}
                placeholder="Would you recommend this bungalow to others?"
                className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            {/* Recommendation Buttons */}
            <div className="flex justify-center space-x-2">
              <button 
                onClick={() => onRecommendationChange('No')}
                className={`px-3 py-1 rounded-full border transition-colors text-xs ${
                  recommendation === 'No' 
                    ? 'bg-red-100 border-red-300 text-red-700' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                No
              </button>
              <button 
                onClick={() => onRecommendationChange('Not sure')}
                className={`px-3 py-1 rounded-full border transition-colors text-xs ${
                  recommendation === 'Not sure' 
                    ? 'bg-yellow-100 border-yellow-300 text-yellow-700' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Not sure
              </button>
              <button 
                onClick={() => onRecommendationChange('Yes')}
                className={`px-3 py-1 rounded-full border transition-colors text-xs ${
                  recommendation === 'Yes' 
                    ? 'bg-green-100 border-green-300 text-green-700' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Yes
              </button>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <button 
          onClick={onReset}
          className="text-blue-600 hover:text-blue-800 transition-colors text-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
