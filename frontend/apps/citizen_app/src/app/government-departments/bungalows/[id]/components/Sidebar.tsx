import { Heading } from "@myorg/ui";
import type { ReservationStep } from "../types";

interface SidebarProps {
  currentStep: ReservationStep;
}

export function Sidebar({ currentStep }: SidebarProps) {
  const steps = [
    { 
      step: 'availability' as const, 
      label: 'Check Availability', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
      )
    },
    { 
      step: 'rooms' as const, 
      label: 'Select Rooms', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 12V6L21 12v8h-2v-6l-9-4.5V12c0 .55-.45 1-1 1s-1-.45-1-1zm-1 4H7v4H5v-4H3v-2h6v2zm-6-6h2V8h2v2h2V8h2v2h2V6H3v4z"/>
          <path d="M21 2H3c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H3V4h18v16z"/>
        </svg>
      )
    },
    { 
      step: 'details' as const, 
      label: 'Your Details', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      )
    },
    { 
      step: 'guests' as const, 
      label: 'Guest Info', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 7H17c-.8 0-1.54.37-2.01 1l-2.41 3.22A1 1 0 0 0 13 12.5v.5h2v6h5zm-7.5-10.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6C6.33 6 7 5.33 7 4.5S6.33 3 5.5 3 4 3.67 4 4.5 4.67 6 5.5 6zm2.5 16v-6H6V9.5L3.46 7.37A1 1 0 0 0 2 8.09V16h1v6h5zm5-6.5H11V9.5L8.46 7.37A1 1 0 0 0 7 8.09V16h1v6h5v-6.5z"/>
        </svg>
      )
    },
    { 
      step: 'summary' as const, 
      label: 'Review & Pay', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V8h16v10zm-10-7h2v2h-2zm4 0h2v2h-2z"/>
        </svg>
      )
    },
  ];

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-md p-2.5 lg:p-3">
        <Heading size="sm" className="mb-2">Quick Info</Heading>
        
        {/* Progress Indicator */}
        <div className="mb-6">
          <h3 className="font-semibold text-base text-gray-900 mb-3">Booking Progress</h3>
          <div className="space-y-2">
            {steps.map(({ step, label, icon }) => (
              <div key={step} className={`flex items-center p-2 rounded-lg ${
                currentStep === step 
                  ? 'bg-blue-50 border border-blue-200' 
                  : 'bg-gray-50'
              }`}>
                <div className={`mr-2 ${
                  currentStep === step ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {icon}
                </div>
                <span className={`font-medium text-sm ${
                  currentStep === step ? 'text-blue-900' : 'text-gray-600'
                }`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Info */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4">
          <h3 className="font-semibold text-base text-gray-900 mb-3">Property Features</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
              <span>Free WiFi</span>
            </div>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
              <span>Air Conditioning</span>
            </div>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
              <span>Free Parking</span>
            </div>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
              <span>Garden View</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
