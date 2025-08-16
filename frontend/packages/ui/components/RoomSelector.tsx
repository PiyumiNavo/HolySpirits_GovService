import React from 'react';

interface Room {
  id: string;
  name: string;
  maxOccupancy: number;
  price: number;
  currency: string;
  isAvailable: boolean;
}

interface RoomSelectorProps {
  rooms: Room[];
  selectedRooms: string[];
  onRoomToggle: (roomId: string) => void;
  className?: string;
}

export default function RoomSelector({ 
  rooms, 
  selectedRooms, 
  onRoomToggle, 
  className = '' 
}: RoomSelectorProps) {
  const calculateTotalGuests = () => {
    return selectedRooms.reduce((total, roomId) => {
      const room = rooms.find(r => r.id === roomId);
      return total + (room?.maxOccupancy || 0);
    }, 0);
  };

  const calculateTotalPrice = () => {
    return selectedRooms.reduce((total, roomId) => {
      const room = rooms.find(r => r.id === roomId);
      return total + (room?.price || 0);
    }, 0);
  };

  return (
    <div className={`bg-white rounded-lg p-3 ${className}`}>
      <div className="mb-3">
        <h3 className="text-base font-semibold text-gray-900 mb-1">
          Make Reservation
        </h3>
        <p className="text-xs text-gray-600">
          Please select the rooms as your preference
        </p>
      </div>

      {/* Room Type Headers */}
      <div className="grid grid-cols-3 gap-2 mb-2 pb-1.5 border-b border-gray-200">
        <div className="text-xs font-medium text-gray-700">Room Type</div>
        <div className="text-xs font-medium text-gray-700 text-center">Max Occupancy</div>
        <div className="text-xs font-medium text-gray-700 text-right">Department</div>
      </div>

      {/* Unavailable Message */}
      {!rooms.some(room => room.isAvailable) && (
        <div className="bg-orange-50 border border-orange-200 rounded p-2 mb-3">
          <p className="text-orange-800 text-xs font-medium">
            Entire bungalow is not available
          </p>
        </div>
      )}

      {/* Room List */}
      <div className="space-y-2 mb-3">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`
              grid grid-cols-3 gap-2 p-2.5 rounded border transition-all duration-200
              ${!room.isAvailable 
                ? 'bg-gray-50 border-gray-200 opacity-50' 
                : selectedRooms.includes(room.id)
                  ? 'bg-blue-50 border-blue-300'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <div className="flex items-center">
              <button
                onClick={() => room.isAvailable && onRoomToggle(room.id)}
                disabled={!room.isAvailable}
                className={`
                  w-4 h-4 rounded border-2 mr-2 flex items-center justify-center transition-colors touch-manipulation
                  ${!room.isAvailable
                    ? 'border-gray-300 bg-gray-100'
                    : selectedRooms.includes(room.id)
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300 hover:border-blue-400'
                  }
                `}
              >
                {selectedRooms.includes(room.id) && (
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                )}
              </button>
              <span className={`text-xs font-medium ${!room.isAvailable ? 'text-gray-500' : 'text-gray-900'}`}>
                {room.name}
              </span>
            </div>
            
            <div className="text-center">
              <span className={`text-xs ${!room.isAvailable ? 'text-gray-500' : 'text-gray-700'}`}>
                {room.maxOccupancy.toString().padStart(2, '0')}
              </span>
            </div>
            
            <div className="text-right">
              <span className={`text-xs font-medium ${!room.isAvailable ? 'text-gray-500' : 'text-gray-900'}`}>
                {room.currency} {room.price.toFixed(2).replace(/\.00$/, '')}.00{room.maxOccupancy}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Selection Summary */}
      {selectedRooms.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-3">
          <p className="text-blue-900 text-xs font-medium mb-0.5">
            '{selectedRooms.map(id => rooms.find(r => r.id === id)?.name).join("' and '")}"' rooms are selected.
          </p>
          <p className="text-blue-700 text-xs">
            This space is for {calculateTotalGuests()} adults
          </p>
        </div>
      )}

      {/* Total Price */}
      {selectedRooms.length > 0 && (
        <div className="border-t pt-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Total Bill</span>
            <span className="text-base font-bold text-gray-900">
              {rooms[0]?.currency || 'LKR'} {calculateTotalPrice().toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
