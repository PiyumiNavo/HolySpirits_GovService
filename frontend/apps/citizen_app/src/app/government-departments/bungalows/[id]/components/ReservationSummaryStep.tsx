import { Heading } from "@myorg/ui";
import type { Guest, Room } from "../types";

interface ReservationSummaryStepProps {
  checkInDate: Date | undefined;
  checkOutDate: Date | undefined;
  guests: Guest[];
  selectedRooms: string[];
  rooms: Room[];
  totalPrice: number;
}

export function ReservationSummaryStep({
  checkInDate,
  checkOutDate,
  guests,
  selectedRooms,
  rooms,
  totalPrice
}: ReservationSummaryStepProps) {
  return (
    <div className="space-y-3">
      <div>
        <Heading level={2} size="md" className="mb-1">Reservation Summary</Heading>
        <p className="text-gray-600 text-sm">Your request has been recorded</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
          <h3 className="font-semibold text-sm text-gray-900 mb-2">Booking Details</h3>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-gray-600 text-xs">Check-in:</span>
              <span className="font-medium text-xs">{checkInDate?.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-xs">Check-out:</span>
              <span className="font-medium text-xs">{checkOutDate?.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-xs">Guest Category:</span>
              <span className="font-medium text-xs">Public</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-xs">Adults:</span>
              <span className="font-medium text-xs">{guests.find(g => g.id === 'adults')?.count}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-xs">Children:</span>
              <span className="font-medium text-xs">{guests.find(g => g.id === 'children')?.count}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-xs">Infants:</span>
              <span className="font-medium text-xs">{guests.find(g => g.id === 'infants')?.count}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <h3 className="font-semibold text-sm text-blue-900 mb-2">Price Breakdown</h3>
          {selectedRooms.map(roomId => {
            const room = rooms.find(r => r.id === roomId);
            return room ? (
              <div key={roomId} className="flex justify-between items-center text-xs mb-1.5">
                <span>{room.name} Room</span>
                <span className="font-medium">LKR {room.price.toFixed(2)}</span>
              </div>
            ) : null;
          })}
          <div className="border-t border-blue-200 pt-2 mt-2">
            <div className="flex justify-between items-center font-bold text-sm text-blue-900">
              <span>Total Bill</span>
              <span>LKR {totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
