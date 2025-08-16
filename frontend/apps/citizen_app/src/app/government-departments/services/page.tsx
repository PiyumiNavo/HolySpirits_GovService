'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlurredDiv, ListItem, ReservationListItem, CitizenHeader } from "@myorg/ui";

export default function ServicesPage() {
  const [showAll, setShowAll] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<{ id: string; text: string; icon: React.ReactNode } | null>(null);

  const services = [
    {
      id: "1",
      text: "Sri Lanka Administrative Service",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.1 7 14 7.9 14 9S13.1 11 12 11 10 10.1 10 9 10.9 7 12 7M18 15C18 12.34 15.33 10.93 12 10.93S6 12.34 6 15V16H18V15Z"/>
        </svg>
      )
    },
    {
      id: "2", 
      text: "Sri Lanka Engineering Service",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
        </svg>
      )
    },
    {
      id: "3",
      text: "Sri Lanka Accountants' Service",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z"/>
        </svg>
      )
    },
    {
      id: "4",
      text: "Sri Lanka Planning Service",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17,10H19V17H15V19H19A2,2 0 0,0 21,17V10A2,2 0 0,0 19,8H17V10M11,19H5V21H11C12.11,21 13,20.11 13,19V15H11V19M5,3V5H11V3C11,1.89 10.11,1 9,1H7C5.89,1 5,1.89 5,3M13,9V15H15V13H17V11H15V9H13M9,5V13H11V9H13V7H11V5H9M3,17V15H1V17A2,2 0 0,0 3,19H5V17H3M1,7V9H3V11H5V9H7V7H5V5H3V7H1Z"/>
        </svg>
      )
    },
    {
      id: "5",
      text: "Sri Lanka Scientific Service",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5,2V4H6.5V8.5L10,12L6.5,15.5V20H5V22H19V20H17.5V15.5L14,12L17.5,8.5V4H19V2H5M8.5,4H15.5V8.5L12,12L8.5,8.5V4Z"/>
        </svg>
      )
    },
    {
      id: "6",
      text: "Sri Lanka Architectural Service",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21,8C21,6.89 20.11,6 19,6H17V4A2,2 0 0,0 15,2H9A2,2 0 0,0 7,4V6H5C3.89,6 3,6.89 3,8V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V8M9,4H15V6H9V4M19,19H5V8H19V19Z"/>
        </svg>
      )
    },
    {
      id: "7",
      text: "Sri Lanka Information & Communication Technology Service",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z"/>
        </svg>
      )
    },
    {
      id: "8",
      text: "Government Translators' Service",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07M18.5,10H16.5L12,22H14L15.12,19H19.87L21,22H23L18.5,10M15.88,17L17.5,12.67L19.12,17H15.88Z"/>
        </svg>
      )
    },
    {
      id: "9",
      text: "Sri Lanka Librarians' Service",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19,2L14,6.5V17.5L19,13V2M6.5,5C4.55,5 2.45,5.4 1,6.5V21.16C1,21.41 1.25,21.66 1.5,21.66C1.6,21.66 1.65,21.59 1.75,21.59C3.1,20.94 5.05,20.68 6.5,20.68C8.45,20.68 10.55,21.1 12,22C13.35,21.15 15.8,20.68 17.5,20.68C19.15,20.68 20.85,21.1 22.25,21.58C22.35,21.61 22.4,21.59 22.5,21.59C22.75,21.59 23,21.34 23,21.09V6.5C22.4,6.05 21.75,5.75 21,5.5V19.65C19.9,19.2 18.7,19 17.5,19C15.8,19 14.35,19.3 13,19.65V8.5L11,10.5V19.65C9.65,19.3 8.2,19 6.5,19C4.85,19 3.15,19.4 1.75,19.85V7.5C3.1,6.85 4.8,6.5 6.5,6.5C7.2,6.5 7.85,6.6 8.5,6.7V5.05C7.85,5.05 7.2,5 6.5,5Z"/>
        </svg>
      )
    },
    {
      id: "10",
      text: "Development Officers' Service",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5.26,7.5L12,10.85L18.74,7.5L12,4.15Z"/>
        </svg>
      )
    },
    {
      id: "11",
      text: "Management Service Officers' Service",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z"/>
        </svg>
      )
    },
    {
      id: "12",
      text: "Combined Drivers' Service",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.28 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01M6.5 16C5.67 16 5 15.33 5 14.5S5.67 13 6.5 13 8 13.67 8 14.5 7.33 16 6.5 16M17.5 16C16.67 16 16 15.33 16 14.5S16.67 13 17.5 13 19 13.67 19 14.5 18.33 16 17.5 16M5 11L6.5 6.5H17.5L19 11H5Z"/>
        </svg>
      )
    },
    {
      id: "13",
      text: "Office Employees' Service",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,7A8,8 0 0,1 20,15A8,8 0 0,1 12,23A8,8 0 0,1 4,15A8,8 0 0,1 12,7M12,9A6,6 0 0,0 6,15A6,6 0 0,0 12,21A6,6 0 0,0 18,15A6,6 0 0,0 12,9M16.5,3C18.11,3 19.32,4.3 18.9,5.88L18,9H6L5.1,5.88C4.68,4.3 5.89,3 7.5,3H16.5M12,16.5C13.38,16.5 14.5,15.38 14.5,14C14.5,12.62 13.38,11.5 12,11.5C10.62,11.5 9.5,12.62 9.5,14C9.5,15.38 10.62,16.5 12,16.5Z"/>
        </svg>
      )
    },
    {
      id: "14",
      text: "Sri Lanka Technological Service",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
        </svg>
      )
    }
  ];

  const displayedDepartments = showAll ? services : services.slice(0, 3);

  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  const handleDepartmentClick = (department: { id: string; text: string; icon: React.ReactNode }) => {
    setSelectedDepartment(department);
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
                overflowY: 'auto'
              }}
            >
              <div className="w-full max-w-md space-y-6">
                <h1 className="text-xl font-bold text-center text-white text-center max-w-sm pt-4">
                  Browse through Government Services
                </h1>
                
                <div 
                  className="space-y-3"
                  style={{
                    maxHeight: displayedDepartments.length > 5 ? '500px' : 'auto',
                    overflowY: displayedDepartments.length > 5 ? 'auto' : 'visible'
                  }}
                >
                  {displayedDepartments.map((services) => (
                    <div key={services.id}>
                      <ListItem
                        icon={services.icon}
                        text={services.text}
                        onClick={() => handleDepartmentClick(services)}
                      />
                    </div>
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
                  Browse through Government Services
                </h1>
                
                <div 
                  className="space-y-3"
                  style={{
                    maxHeight: displayedDepartments.length > 5 ? '400px' : 'auto',
                    overflowY: displayedDepartments.length > 5 ? 'auto' : 'visible'
                  }}
                >
                  {displayedDepartments.map((department) => (
                    <div key={department.id}>
                      <ListItem
                        icon={department.icon}
                        text={department.text}
                        onClick={() => handleDepartmentClick(department)}
                      />
                    </div>
                  ))}
                </div>

                {/* department buttons */}
                {services.length > 3 && (
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
