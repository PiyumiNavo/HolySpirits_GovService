import React from "react";

interface ReservationListItemProps {
  title: string;
  startDate: string;
  endDate: string;
  dueDate: string;
  guests: number;
  nights: number;
  onClick?: () => void;
}

export default function ReservationListItem({ 
  title, 
  startDate, 
  endDate, 
  dueDate,
  guests, 
  nights, 
  onClick 
}: ReservationListItemProps) {
  return (
    <div 
      className="bg-white rounded-2xl px-7 py-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 rounded-full mx-4"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-lg mb-2">
            {title}
          </h3>
          
          <div className="flex items-center gap-2 text-gray-600 mb-3">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.89 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3M19 19H5V8H19V19Z"/>
            </svg>
            <span className="text-sm font-medium">
              {startDate} - {endDate}
            </span>
          </div>
          
          <div className="flex gap-3">
            <div className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-medium">
              {guests} guests
            </div>
            <div className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-medium">
              {nights} nights
            </div>
          </div>
        </div>
        
        <div className="bg-green-400 text-white px-5 py-4 rounded-full font-semibold text-sm">
          {dueDate}
        </div>
      </div>
    </div>
  );
}
