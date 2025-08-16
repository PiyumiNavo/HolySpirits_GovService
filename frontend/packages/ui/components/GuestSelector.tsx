import React from 'react';

interface Guest {
  id: string;
  label: string;
  ageGroup: string;
  count: number;
}

interface GuestSelectorProps {
  guests: Guest[];
  onGuestCountChange: (guestId: string, count: number) => void;
  className?: string;
}

export default function GuestSelector({ 
  guests, 
  onGuestCountChange, 
  className = '' 
}: GuestSelectorProps) {
  const handleIncrement = (guestId: string, currentCount: number) => {
    onGuestCountChange(guestId, currentCount + 1);
  };

  const handleDecrement = (guestId: string, currentCount: number) => {
    if (currentCount > 0) {
      onGuestCountChange(guestId, currentCount - 1);
    }
  };

  const totalGuests = guests.reduce((sum, guest) => sum + guest.count, 0);
  const hasValidGuests = totalGuests > 0;

  return (
    <div className={`bg-white rounded-lg p-3 ${className}`}>
      <div className="mb-3">
        <h3 className="text-base font-semibold text-gray-900 mb-1">
          Guests Details
        </h3>
        <p className="text-xs text-gray-600">
          Please provide us the details about guests
        </p>
      </div>

      {/* Guest Selection */}
      <div className="space-y-3 mb-3">
        {guests.map((guest) => (
          <div key={guest.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <div>
              <div className="font-medium text-gray-900 text-xs mb-0.5">
                {guest.label}*
              </div>
              <div className="text-xs text-gray-500">
                {guest.ageGroup}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDecrement(guest.id, guest.count)}
                disabled={guest.count <= 0}
                className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <span className="w-8 text-center font-medium text-gray-900 text-sm">
                {guest.count}
              </span>
              
              <button
                onClick={() => handleIncrement(guest.id, guest.count)}
                className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition-colors touch-manipulation"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Validation Message */}
      {!hasValidGuests && (
        <div className="bg-red-50 border border-red-200 rounded p-2 mb-2">
          <p className="text-red-800 text-xs">
            Please add the guest count
          </p>
        </div>
      )}

      {/* Total Count */}
      {hasValidGuests && (
        <div className="bg-blue-50 border border-blue-200 rounded p-2">
          <p className="text-blue-900 text-xs font-medium">
            Total Guests: {totalGuests}
          </p>
        </div>
      )}
    </div>
  );
}
