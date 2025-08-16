'use client';
import { useState } from "react";
import Image from "next/image";
import { SearchBar, CitizenHeader } from "@myorg/ui";

export default function BungalowsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const bungalows = [
    {
      id: "1",
      name: "Nuwara Eliya - New(A1)",
      location: "Central province",
      price: "LKR 8,600/night",
      staffNote: "for staff",
      image: "/nuwara-eliya.jpg",
    },
    {
      id: "2", 
      name: "Elle rest house",
      location: "Central province",
      price: "LKR 11,500/night",
      staffNote: "for staff",
      image: "/ella.jpg",
    },
    {
      id: "3",
      name: "Kandy rest house",
      location: "Central province",
      price: "LKR 8600/night",
      staffNote: "for staff", 
      image: "/kandy.jpg",
    },
    {
      id: "4",
      name: "Nuwara Eliya - New(A1)",
      location: "Central province",
      price: "LKR 8,600/night",
      staffNote: "for staff",
      image: "/nuwara-eliya.jpg",
    },
    {
      id: "5",
      name: "Elle rest house",
      location: "Central province",
      price: "LKR 11,500/night",
      staffNote: "for staff",
      image: "/ella.jpg",
    },
    {
      id: "6",
      name: "Kandy rest house",
      location: "Central province",
      price: "LKR 8600/night",
      staffNote: "for staff", 
      image: "/kandy.jpg",
    },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      {/* Header */}
      <CitizenHeader logoSrc="/logo.png" />
      
      <div className="px-4 pt-6">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="flex items-center bg-white rounded-full shadow-lg p-3">
              <svg className="w-6 h-6 text-gray-400 ml-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input
                type="text"
                placeholder="Search a bungalow..."
                className="flex-1 px-4 py-2 text-gray-700 bg-transparent outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="flex gap-2">
                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
                  </svg>
                </button>
                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Department Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Ministry of Public Administration,<br />Provincial Councils
          </h1>
        </div>

        {/* Bungalows Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 max-w-4xl mx-auto pb-4">
          {bungalows.map((bungalow) => (
            <div key={bungalow.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              {/* Image Section */}
              <div className="relative h-32">
                <Image
                  src={bungalow.image}
                  alt={bungalow.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Content Section */}
              <div className="p-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                <div className="text-xs text-gray-300 mb-1">{bungalow.location}</div>
                <h3 className="font-bold text-sm mb-1">{bungalow.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">{bungalow.price}</span>
                  <span className="text-xs text-gray-300">{bungalow.staffNote}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
