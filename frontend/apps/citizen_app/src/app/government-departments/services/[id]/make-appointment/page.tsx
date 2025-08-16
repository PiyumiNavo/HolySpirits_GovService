'use client';
import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { CitizenHeader, Heading, Button } from "@myorg/ui";

interface MakeAppointmentProps {
  params: Promise<{
    id: string;
  }>;
}

interface TimeSlot {
  time: string;
  appointments: Array<{
    userId: string;
    userName: string;
  }>;
  available: number;
}

interface AppointmentBooking {
  date: string;
  time: string;
  userId: string;
  userName: string;
}

export default function MakeAppointmentPage({ params }: MakeAppointmentProps) {
  const resolvedParams = use(params);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);
  const [bookingData, setBookingData] = useState({
    userName: "",
    userId: "",
    contactNumber: "",
    purpose: ""
  });

  // Mock service data
  const getServiceData = (id: string) => {
    const services = {
      "1": { name: "Sri Lanka Administrative Service", workingHours: "8:30 AM - 4:15 PM" },
      "2": { name: "Sri Lanka Engineering Service", workingHours: "8:30 AM - 4:15 PM" },
      "3": { name: "Sri Lanka Accountants' Service", workingHours: "8:30 AM - 4:15 PM" },
      "default": { name: "Government Service", workingHours: "8:30 AM - 4:15 PM" }
    };
    return services[id as keyof typeof services] || services["default"];
  };

  const service = getServiceData(resolvedParams.id);

  // Generate time slots in 15-minute intervals
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startHour = 8;
    const startMinute = 30;
    const endHour = 16;
    const endMinute = 15;

    let currentHour = startHour;
    let currentMinute = startMinute;

    while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
      const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
      
      // Mock existing appointments for demonstration
      const mockAppointments = Math.random() < 0.3 ? [
        { userId: "U001", userName: "John Doe" },
        ...(Math.random() < 0.5 ? [{ userId: "U002", userName: "Jane Smith" }] : [])
      ] : [];

      slots.push({
        time: timeString,
        appointments: mockAppointments,
        available: 3 - mockAppointments.length
      });

      currentMinute += 15;
      if (currentMinute >= 60) {
        currentMinute = 0;
        currentHour += 1;
      }
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateString = date.toISOString().split('T')[0];
      const isPastDate = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      days.push({
        day,
        dateString,
        isPastDate,
        isToday: day === today.getDate()
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const currentMonth = monthNames[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  const handleDateSelect = (dateString: string) => {
    setSelectedDate(dateString);
    setSelectedTimeSlot("");
    setShowBookingForm(false);
  };

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTimeSlot(time);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const booking: AppointmentBooking = {
      date: selectedDate,
      time: selectedTimeSlot,
      userId: bookingData.userId,
      userName: bookingData.userName
    };
    
    console.log("Appointment booked:", booking);
    console.log("Uploaded documents:", uploadedDocuments.map(file => file.name));
    setShowSuccessMessage(true);
    
    // Reset form
    setBookingData({
      userName: "",
      userId: "",
      contactNumber: "",
      purpose: ""
    });
    setUploadedDocuments([]);
    setShowBookingForm(false);
    setSelectedTimeSlot("");
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedDocuments(prev => [...prev, ...newFiles]);
    }
  };

  const removeDocument = (index: number) => {
    setUploadedDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime12Hour = (time24: string) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      {/* Header */}
      <CitizenHeader logoSrc="/logo.png" />
      
      <div className="px-4 pt-6 max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-8">
          <Heading level={1} size="2xl" className="mb-2">
            Book Appointment
          </Heading>
          <p className="text-gray-600 text-lg">{service.name}</p>
          <div className="mt-2 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <span className="text-sm font-medium text-gray-700">Working Hours: {service.workingHours}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Calendar Section */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="mb-6">
                <Heading level={2} size="xl" className="text-center">
                  {currentMonth} {currentYear}
                </Heading>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => day && !day.isPastDate && handleDateSelect(day.dateString)}
                    disabled={!day || day.isPastDate}
                    className={`
                      h-12 rounded-lg text-sm font-medium transition-all duration-200
                      ${!day ? 'invisible' : ''}
                      ${day && day.isPastDate 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'hover:bg-blue-50 cursor-pointer'
                      }
                      ${day && day.isToday ? 'bg-blue-100 text-blue-800' : ''}
                      ${day && selectedDate === day.dateString 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'text-gray-700'
                      }
                    `}
                  >
                    {day?.day}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Time Slots Section */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <Heading level={2} size="xl" className="mb-4">
                Available Time Slots
              </Heading>

              {!selectedDate ? (
                <div className="text-center py-8">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                  <p className="text-gray-500">Please select a date to view available time slots</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Selected Date: {new Date(selectedDate).toLocaleDateString()}
                  </p>
                  
                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {timeSlots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => slot.available > 0 && handleTimeSlotSelect(slot.time)}
                        disabled={slot.available === 0}
                        className={`
                          w-full p-3 rounded-lg border text-left transition-all duration-200
                          ${slot.available === 0 
                            ? 'bg-gray-100 border-gray-200 cursor-not-allowed' 
                            : 'hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
                          }
                          ${selectedTimeSlot === slot.time 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200'
                          }
                        `}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900">
                            {formatTime12Hour(slot.time)}
                          </span>
                          <span className={`
                            text-xs px-2 py-1 rounded-full
                            ${slot.available === 0 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                            }
                          `}>
                            {slot.available === 0 ? 'Full' : `${slot.available} available`}
                          </span>
                        </div>
                        
                        {slot.appointments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {slot.appointments.map((appointment, idx) => (
                              <div key={idx} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                                {appointment.userId} - {appointment.userName}
                              </div>
                            ))}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <div className="mb-4">
                <Heading level={3} size="lg">
                  Book Appointment
                </Heading>
              </div>

              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}<br />
                  <strong>Time:</strong> {formatTime12Hour(selectedTimeSlot)}
                </p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={bookingData.userName}
                    onChange={(e) => setBookingData({...bookingData, userName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    value={bookingData.contactNumber}
                    onChange={(e) => setBookingData({...bookingData, contactNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Purpose of Visit
                  </label>
                  <textarea
                    value={bookingData.purpose}
                    onChange={(e) => setBookingData({...bookingData, purpose: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20 resize-none"
                    placeholder="Brief description of your visit purpose..."
                  />
                </div>

                {/* Additional Documents Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Documents
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
                    <div className="text-center">
                      <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                      </svg>
                      <p className="text-sm text-gray-600 mb-2">
                        Drag and drop files here, or 
                        <label className="text-blue-600 hover:text-blue-800 cursor-pointer ml-1">
                          browse
                          <input
                            type="file"
                            multiple
                            onChange={handleDocumentUpload}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                          />
                        </label>
                      </p>
                      <p className="text-xs text-gray-500">
                        Supported formats: PDF, DOC, DOCX, JPG, PNG, TXT (Max 10MB each)
                      </p>
                    </div>
                  </div>

                  {/* Uploaded Documents List */}
                  {uploadedDocuments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-medium text-gray-700">Uploaded Documents:</p>
                      {uploadedDocuments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-blue-50 p-2 rounded-lg">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                            </svg>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{file.name}</p>
                              <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeDocument(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Additional documents upload section */}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <Button type="submit" className="flex-1">
                    Confirm Appointment
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Success Message Modal */}
        {showSuccessMessage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-lg flex items-center justify-center z-50 p-4"
            suppressHydrationWarning={true}
          >
            <div className="bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
              {/* Success Icon */}
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <Heading level={2} size="xl" className="text-green-700 mb-2">
                  Appointment Confirmed!
                </Heading>
                <p className="text-gray-700 mb-4">
                  Your appointment has been successfully booked.
                </p>
              </div>

              {/* Appointment Details */}
              <div className="bg-white bg-opacity-30 rounded-lg p-4 mb-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium text-gray-800">{service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium text-gray-800">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium text-gray-800">{formatTime12Hour(selectedTimeSlot)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium text-gray-800">{bookingData.userName}</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="text-center">
                <Button 
                  onClick={() => {
                    setShowSuccessMessage(false);
                    setSelectedDate("");
                  }}
                  className="w-full"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
