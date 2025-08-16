'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlurredDiv, ListItem, ReservationListItem, CitizenHeader } from "@myorg/ui";

export default function GovernmentDepartments() {
  const [showAll, setShowAll] = useState(false);

  const departments = [
    {
      id: "1",
      text: "Ministry of Public Administration, Provincial Councils",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.1 7 14 7.9 14 9S13.1 11 12 11 10 10.1 10 9 10.9 7 12 7M18 15C18 12.34 15.33 10.93 12 10.93S6 12.34 6 15V16H18V15Z"/>
        </svg>
      )
    },
    {
      id: "2", 
      text: "Ministry of Education",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,3L1,9L12,15L21,11V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
        </svg>
      )
    },
    {
      id: "3",
      text: "Ministry of Health",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      )
    },
    {
      id: "4",
      text: "Ministry of Finance",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M11,7V9H8V11H11V13H8V15H11V17H13V15H16V13H13V11H16V9H13V7H11Z"/>
        </svg>
      )
    },
    {
      id: "5",
      text: "Ministry of Transport",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.28 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01M6.5 16C5.67 16 5 15.33 5 14.5S5.67 13 6.5 13 8 13.67 8 14.5 7.33 16 6.5 16M17.5 16C16.67 16 16 15.33 16 14.5S16.67 13 17.5 13 19 13.67 19 14.5 18.33 16 17.5 16M5 11L6.5 6.5H17.5L19 11H5Z"/>
        </svg>
      )
    }
  ];

  const displayedDepartments = showAll ? departments : departments.slice(0, 3);

  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/img1.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="relative min-h-screen flex flex-col">
        {/* Header */}
        <CitizenHeader logoSrc="/logo.png" />
        
        <div className="flex-1 flex items-start justify-center pt-8">
          <div className="w-full max-w-md">
            {/* Reservation Item - Only show when not showing all departments */}
            {!showAll && (
              <ReservationListItem
                title="Nuwara Eliya Rest House"
                startDate="12 , Aug, 2025"
                endDate="14, Aug, 2025"
                dueDate="In 3 days"
                guests={6}
                nights={2}
                onClick={() => console.log("Reservation clicked")}
              />
            )}
          
          {/* Custom BlurredDiv for expanded view */}
          {showAll ? (
            <div 
              className="w-full p-3 inline-flex flex-col items-center gap-5 fixed left-0 right-0"
              style={{
                background: 'rgba(192, 226, 236, 0.07)',
                borderTopLeftRadius: '50px',
                borderTopRightRadius: '50px',
                backdropFilter: 'blur(10px)',
                height: 'calc(100vh - 80px)',
                marginTop: '80px',
                overflowY: 'auto'
              }}
            >
              <div className="w-full max-w-md space-y-6">
                <h1 className="text-xl font-bold text-center text-white text-center max-w-sm pt-4">
                  Browse through Government Departments
                </h1>
                
                <div className="space-y-3">
                  {displayedDepartments.map((department) => (
                    <ListItem
                      key={department.id}
                      icon={department.icon}
                      text={department.text}
                      onClick={() => console.log(`Clicked on ${department.text}`)}
                    />
                  ))}
                </div>
                
                <div className="flex justify-center py-4">
                  <button 
                    onClick={handleShowMore}
                    className="flex flex-col items-center  gap-0.5 text-white hover:text-gray-200 transition-colors"
                  >
                    <span className="text-sm font-medium">Show Less</span>
                    <svg 
                      className="w-6 h-6 transition-transform rotate-180" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 10l5 5 5-5H7z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <BlurredDiv>
              <div className="w-full space-y-6">
                <h1 className="text-xl font-bold text-center text-white text-center max-w-sm pt-4">
                  Browse through Government Departments
                </h1>
                
                <div className="space-y-3">
                  {displayedDepartments.map((department) => (
                    <ListItem
                      key={department.id}
                      icon={department.icon}
                      text={department.text}
                      onClick={() => console.log(`Clicked on ${department.text}`)}
                    />
                  ))}
                </div>
                
                {departments.length > 3 && (
                  <div className="flex justify-center py-4">
                    <button 
                      onClick={handleShowMore}
                      className="flex flex-col items-center gap-0.5 text-white hover:text-gray-200 transition-colors"
                    >
                      <span className="text-sm font-medium">View All</span>
                      <svg 
                        className="w-6 h-6 transition-transform" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M7 10l5 5 5-5H7z"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </BlurredDiv>
          )}
        </div>
      </div>
    </div>
  </div>
  );
}
