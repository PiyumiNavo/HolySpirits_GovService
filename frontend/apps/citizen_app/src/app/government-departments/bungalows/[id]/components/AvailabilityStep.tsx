import { Heading, Calendar } from "@myorg/ui";

interface AvailabilityStepProps {
  checkInDate: Date | undefined;
  checkOutDate: Date | undefined;
  unavailableDates: Date[];
  onCheckInChange: (date: Date | undefined) => void;
  onCheckOutChange: (date: Date | undefined) => void;
  onDateSelect: (date: Date) => void;
}

export function AvailabilityStep({
  checkInDate,
  checkOutDate,
  unavailableDates,
  onCheckInChange,
  onCheckOutChange,
  onDateSelect
}: AvailabilityStepProps) {
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    return Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-3">
      <div>
        <Heading level={2} size="md" className="mb-1">Check Availability</Heading>
        <p className="text-gray-600 text-sm">Please select your arrival and check-out date</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Check-in date</label>
          <input
            type="date"
            value={checkInDate ? checkInDate.toISOString().split('T')[0] : ''}
            onChange={(e) => onCheckInChange(e.target.value ? new Date(e.target.value) : undefined)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Check-out Date</label>
          <input
            type="date"
            value={checkOutDate ? checkOutDate.toISOString().split('T')[0] : ''}
            onChange={(e) => onCheckOutChange(e.target.value ? new Date(e.target.value) : undefined)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      <Calendar 
        onDateSelect={onDateSelect}
        selectedDate={checkInDate}
        unavailableDates={unavailableDates}
        className="mt-2"
      />

      {checkInDate && checkOutDate && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p className="text-green-800 font-semibold text-sm">
                Number of nights selected: {calculateNights()}
              </p>
              <p className="text-green-600 text-xs">Dates available for booking</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
