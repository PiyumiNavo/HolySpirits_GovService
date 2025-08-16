import Image from "next/image";
import { Heading } from "@myorg/ui";
import type { ReservationData, Bungalow, Room } from "../types";

interface SuccessStepProps {
  bungalow: Bungalow;
  reservationData: ReservationData;
  rooms: Room[];
}

export function SuccessStep({ bungalow, reservationData, rooms }: SuccessStepProps) {
  return (
    <div className="space-y-3 text-center">
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

      <div className="space-y-3">
        <Heading level={2} size="md" className="mb-1">Payment Successful!</Heading>
        <p className="text-gray-600 text-sm">Your reservation was added successfully</p>

        {/* Booking Details */}
        <div className="bg-white rounded-lg p-3 border border-gray-200 text-left space-y-1.5">
          <div className="flex justify-between">
            <span className="text-gray-600 text-xs">Check-in:</span>
            <span className="font-medium text-xs">{reservationData.checkIn}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 text-xs">Check-out:</span>
            <span className="font-medium text-xs">{reservationData.checkOut}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 text-xs">Guest Category:</span>
            <span className="font-medium text-xs">Public</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 text-xs">Adults:</span>
            <span className="font-medium text-xs">{reservationData.guests.find(g => g.id === 'adults')?.count}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 text-xs">Children:</span>
            <span className="font-medium text-xs">{reservationData.guests.find(g => g.id === 'children')?.count}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 text-xs">Infants:</span>
            <span className="font-medium text-xs">{reservationData.guests.find(g => g.id === 'infants')?.count}</span>
          </div>
        </div>

        {/* Room Details */}
        <div className="bg-white rounded-lg p-3 border border-gray-200 text-left space-y-1.5">
          {reservationData.rooms.map(roomId => {
            const room = rooms.find(r => r.id === roomId);
            return room ? (
              <div key={roomId} className="flex justify-between">
                <span className="text-gray-600 text-xs">'{room.name}' Room</span>
                <span className="font-medium text-xs">LKR {room.price.toFixed(2)}</span>
              </div>
            ) : null;
          })}
          <div className="border-t pt-1.5 mt-1.5">
            <div className="flex justify-between font-bold text-sm">
              <span>Total Bill</span>
              <span>LKR {reservationData.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Reservation ID */}
        <div className="text-center py-2">
          <p className="text-gray-600 text-xs mb-1">Reservation ID:</p>
          <p className="text-lg font-bold text-blue-600">{reservationData.reservationId}</p>
        </div>
      </div>
    </div>
  );
}
