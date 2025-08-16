'use client';
import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { CitizenHeader, Heading, Button } from "@myorg/ui";

interface MakeReservationProps {
  params: Promise<{
    id: string;
  }>;
}

export default function MakeReservationPage({ params }: MakeReservationProps) {
  const resolvedParams = use(params);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  // Mock data - in real app this would be fetched based on resolvedParams.id
  const bungalow = {
    id: resolvedParams.id,
    name: "Nuwaraeliya - New (A1)",
    address: "No 60, Halpe Rd, Ella 90090",
    image: "/nuwara-eliya.jpg"
  };

  const handleContinue = () => {
    if (checkInDate && checkOutDate) {
      console.log("Checking availability:", { 
        bungalowId: resolvedParams.id, 
        checkIn: checkInDate, 
        checkOut: checkOutDate 
      });
      // Navigate to next step or show availability results
    }
  };

  const handleReset = () => {
    setCheckInDate("");
    setCheckOutDate("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-300">
      {/* Header */}
      <CitizenHeader logoSrc="/logo.png" />
      
      <div className="px-4 pt-8 max-w-2xl mx-auto">
        {/* Bungalow Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
              <Image
                src={bungalow.image}
                alt={bungalow.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">
                Ministry of Public Administration, Provincial<br />Councils
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {bungalow.name}
              </h1>
              <p className="text-gray-600 text-sm">
                {bungalow.address}
              </p>
            </div>
          </div>
        </div>

        {/* Check Availability Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Check Availability
          </h2>
          <p className="text-gray-700 text-lg">
            Please select your check-in date and<br />check-out data
          </p>
        </div>

        {/* Date Selection Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-8">
          <div className="space-y-6">
            {/* Check-in Date */}
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-3">
                Check-in Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="w-full px-4 py-4 bg-blue-50/50 border-0 rounded-2xl text-gray-700 text-lg focus:ring-2 focus:ring-blue-400 focus:bg-blue-50"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Check-out Date */}
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-3">
                Check-out Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="w-full px-4 py-4 bg-blue-50/50 border-0 rounded-2xl text-gray-700 text-lg focus:ring-2 focus:ring-blue-400 focus:bg-blue-50"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 pb-8">
          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="text-gray-600 text-lg font-medium hover:text-gray-800 transition-colors"
          >
            Reset
          </button>

          {/* Continue Button */}
          <Button 
            onClick={handleContinue}
            className="w-full py-4 text-xl font-semibold bg-gray-800 hover:bg-gray-900 text-white rounded-2xl"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
