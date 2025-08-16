'use client';
import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { CitizenHeader, Heading, Button } from "@myorg/ui";

interface BungalowPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function BungalowPage({ params }: BungalowPageProps) {
  const resolvedParams = use(params);
  const [selectedDate, setSelectedDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(1);

  // Mock data - in real app this would be fetched based on resolvedParams.id
  const bungalow = {
    id: resolvedParams.id,
    name: "Nuwara Eliya - New(A1)",
    location: "Central Province, Sri Lanka",
    price: "LKR 8,600",
    priceUnit: "per night",
    staffNote: "Special rates for government staff",
    images: ["/nuwara-eliya.jpg", "/ella.jpg", "/kandy.jpg"],
    description: "A beautiful government rest house located in the heart of Nuwara Eliya. Perfect for family getaways and official retreats. The property offers stunning mountain views and modern amenities.",
    features: [
      "Air Conditioning",
      "Hot Water",
      "Room Service", 
      "Restaurant",
      "Conference Room",
      "24/7 Security"
    ],
    capacity: "Up to 8 guests",
    rooms: "4 Bedrooms, 3 Bathrooms"
  };

  const handleBooking = () => {
    // Handle booking logic
    console.log("Booking:", { 
      bungalowId: resolvedParams.id, 
      date: selectedDate, 
      guests, 
      nights 
    });
  };

  const totalPrice = parseInt(bungalow.price.replace(/[^\d]/g, '')) * nights;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      {/* Header */}
      <CitizenHeader logoSrc="/logo.png" />
      
      <div className="px-4 pt-6 max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-80">
                <Image
                  src={bungalow.images[0]}
                  alt={bungalow.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="p-4 flex gap-2 overflow-x-auto">
                {bungalow.images.map((image, index) => (
                  <div key={index} className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${bungalow.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bungalow Details */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-2">{bungalow.location}</div>
                <Heading level={1} size="2xl" className="mb-2">
                  {bungalow.name}
                </Heading>
                <div className="flex items-center gap-4 text-gray-600">
                  <span>{bungalow.capacity}</span>
                  <span>•</span>
                  <span>{bungalow.rooms}</span>
                </div>
              </div>

              <div className="mb-6">
                <Heading level={3} size="lg" className="mb-3">
                  Description
                </Heading>
                <p className="text-gray-700 leading-relaxed">
                  {bungalow.description}
                </p>
              </div>

              <div className="mb-6">
                <Heading level={3} size="lg" className="mb-3">
                  Features & Amenities
                </Heading>
                <div className="grid grid-cols-2 gap-3">
                  {bungalow.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-6">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">{bungalow.price}</span>
                  <span className="text-gray-600">{bungalow.priceUnit}</span>
                </div>
                <p className="text-sm text-blue-600">{bungalow.staffNote}</p>
              </div>

              <div className="space-y-4 mb-6">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                {/* Nights */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nights
                  </label>
                  <select
                    value={nights}
                    onChange={(e) => setNights(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[1,2,3,4,5,6,7].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Night' : 'Nights'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Summary */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{bungalow.price} x {nights} night{nights > 1 ? 's' : ''}</span>
                  <span>LKR {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>LKR {totalPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Book Button */}
              <Link href={`/government-departments/bungalows/${bungalow.id}/make-reservation`}>
                <Button className="w-full">
                  Reserve Now
                </Button>
              </Link>
              
              <p className="text-xs text-gray-500 text-center mt-2">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
