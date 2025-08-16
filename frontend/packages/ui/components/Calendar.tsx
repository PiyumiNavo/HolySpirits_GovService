"use client"

import React, { useState } from 'react';

interface CalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate?: Date;
  unavailableDates?: Date[];
  className?: string;
}

export default function Calendar({ 
  onDateSelect, 
  selectedDate, 
  unavailableDates = [], 
  className = '' 
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(unavailableDate => 
      unavailableDate.toDateString() === date.toDateString()
    );
  };
  
  const isDateSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };
  
  const isDateInPast = (date: Date) => {
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };
  
  const handleDateClick = (day: number) => {
    const date = new Date(year, month, day);
    if (!isDateInPast(date) && !isDateUnavailable(date)) {
      onDateSelect(date);
    }
  };
  
  // Generate calendar days
  const calendarDays: React.ReactElement[] = [];
  
  // Empty cells for days before the first day of month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(
      <div key={`empty-${i}`} className="h-6 sm:h-8 lg:h-10" />
    );
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isPast = isDateInPast(date);
    const isUnavailable = isDateUnavailable(date);
    const isSelected = isDateSelected(date);
    const isToday = date.toDateString() === today.toDateString();
    
    let dayClasses = "h-6 sm:h-8 lg:h-10 flex items-center justify-center text-xs sm:text-sm lg:text-base font-medium rounded sm:rounded-lg transition-colors duration-200 touch-manipulation ";
    
    if (isPast || isUnavailable) {
      dayClasses += "text-gray-300 cursor-not-allowed ";
    } else if (isSelected) {
      dayClasses += "bg-blue-500 text-white shadow-sm ";
    } else if (isToday) {
      dayClasses += "bg-orange-100 text-orange-600 cursor-pointer hover:bg-orange-200 relative ";
    } else {
      dayClasses += "text-gray-700 cursor-pointer hover:bg-gray-100 ";
    }
    
    calendarDays.push(
      <button
        key={day}
        onClick={() => handleDateClick(day)}
        disabled={isPast || isUnavailable}
        className={dayClasses}
      >
        {day}
        {/* Today indicator dot */}
        {isToday && !isSelected && (
          <div className="absolute bottom-0.5 sm:bottom-1 lg:bottom-1.5 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 sm:w-1 sm:h-1 lg:w-1.5 lg:h-1.5 bg-orange-500 rounded-full"></div>
        )}
      </button>
    );
  }
  
  return (
    <div className={`relative bg-white rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg border border-gray-100 max-w-md mx-auto ${className}`}>
      {/* Header */}
      <div className="relative flex items-center justify-between mb-2 sm:mb-4 lg:mb-6">
        <button
          onClick={goToPreviousMonth}
          className="p-1 sm:p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 touch-manipulation"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        
        <div className="text-center">
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">
            {monthNames[month]}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 leading-none">{year}</p>
        </div>
        
        <button
          onClick={goToNextMonth}
          className="p-1 sm:p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 touch-manipulation"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>
      
      {/* Day names */}
      <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1 sm:mb-2 lg:mb-4">
        {dayNames.map(day => (
          <div key={day} className="h-4 sm:h-6 lg:h-8 flex items-center justify-center text-xs sm:text-sm font-medium text-gray-500">
            <span className="block sm:hidden">{day.slice(0, 1)}</span>
            <span className="hidden sm:block">{day.slice(0, 3)}</span>
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
        {calendarDays}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-6 mt-2 sm:mt-4 lg:mt-6 text-xs sm:text-sm text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-blue-500 rounded-sm sm:rounded"></div>
          <span className="hidden sm:inline">Selected</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-orange-100 rounded-sm sm:rounded flex items-center justify-center">
            <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-orange-500 rounded-full"></div>
          </div>
          <span className="hidden sm:inline">Today</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-gray-100 rounded-sm sm:rounded"></div>
          <span className="hidden sm:inline">Unavailable</span>
        </div>
      </div>
    </div>
  );
}
