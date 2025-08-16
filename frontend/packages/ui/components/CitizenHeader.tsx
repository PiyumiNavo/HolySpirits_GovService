'use client';
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DropDown from "./DropDown";

interface CitizenHeaderProps {
  logoSrc?: string;
  brandName?: string;
}

export default function CitizenHeader({ 
  logoSrc = "/logo.png", 
//   brandName = "BUNGALOW BOOK" 
}: CitizenHeaderProps) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <header className="px-6 py-10">
      <div className="flex items-center justify-end">
        {/* Action Icons */}
        <div className="flex items-center gap-4 p-3"
            style={{
              background: 'rgba(192, 226, 236, 0.07)',
              borderRadius: '50px',
              backdropFilter: 'blur(10px)'
            }}
        >
          {/* Notification Icon */}
          <div className="relative">
            <button 
              onClick={toggleNotificationDropdown}
              className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"/>
              </svg>
            </button>
            
            <DropDown 
              items={[]} 
              isVisible={showNotificationDropdown} 
              onClose={() => setShowNotificationDropdown(false)} 
            />
          </div>

          {/* Profile Icon with Dropdown */}
          <div className="relative">
            <button 
              onClick={toggleDropdown}
              className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
              </svg>
            </button>
            
            {showDropdown && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.89 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3M19 19H5V8H19V19Z"/>
                  </svg>
                  <span className="text-sm font-medium">My Reservations</span>
                </button>
                
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z"/>
                  </svg>
                  <span className="text-sm font-medium">My Saves</span>
                </button>
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors text-red-500"
                >
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 17V14H9V10H16V7L21 12L16 17M14 2C15.11 2 16 2.89 16 4V6H14V4H5V20H14V18H16V20C16 21.11 15.11 22 14 22H5C3.9 22 3 21.11 3 20V4C3 2.89 3.9 2 5 2H14Z"/>
                  </svg>
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
