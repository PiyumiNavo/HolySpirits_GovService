"use client"

import { useState } from "react";
import {Button, DepartmentCard, Header, SearchBar, BlurredDiv} from "@myorg/ui";

const userDepartmentName = "Department of Motor Traffic (DMT)";

const servicesData = [
    {
    id: 1,
    title: "Weight Certificates and Vehicle Inspections",
    icon: (
      <svg className="h-4 w-4 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    url: "/../../../public/bicycles.jpg"
    },
    {
    id: 2,
    title: "Registration of Motor Bikes",
    icon: (
      <svg className="h-4 w-4 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    url: "/../../../public/bicycles.jpg"
    },
    {
    id: 3,
    title: "Ownership Transfer of Motor Cars",
    icon: (
      <svg className="h-4 w-4 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    url: "/../../../public/bicycles.jpg"
    },
    {
    id: 4,
    title: "Ownership Transfer of Three Wheelers",
    icon: (
      <svg className="h-4 w-4 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    url: "/../../../public/bicycles.jpg"
    },
    {
    id: 5,
    title: "Ownership Transfer of Motor Bikes",
    icon: (
      <svg className="h-4 w-4 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    url: "/../../../public/bicycles.jpg"
    },
    {
    id: 6,
    title: "Technical Modification of Vehicles",
    icon: (
      <svg className="h-4 w-4 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    url: "/../../../public/bicycles.jpg"
    },
    {
    id: 7,
    title: "Pay Luxury Tax",
    icon: (
      <svg className="h-4 w-4 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    url: "/../../../public/bicycles.jpg"
    },
    {
    id: 8,
    title: "Number Plate Related Service",
    icon: (
      <svg className="h-4 w-4 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    url: "/../../../public/bicycles.jpg"
    },
    {
    id: 9,
    title: "Renewal of Drivers License - One Day Service",
    icon: (
      <svg className="h-4 w-4 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    url: "/../../../public/bicycles.jpg"
    },
    {
    id: 10,
    title: "Renewal of Drivers License - Normal Service",
    icon: (
      <svg className="h-4 w-4 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    url: "/../../../public/bicycles.jpg"
    },
    {
    id: 11,
    title: "Information Change of License",
    icon: (
      <svg className="h-4 w-4 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    url: "/../../../public/bicycles.jpg"
    },
    {
    id: 12,
    title: "Conversion of Old to New License",
    icon: (
      <svg className="h-4 w-4 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    url: "/../../../public/bicycles.jpg"
    },
    {
    id: 13,
    title: "Get Certified Copy of the Drivers License",
    icon: (
      <svg className="h-4 w-4 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    url: "/../../../public/bicycles.jpg"
    },
    {
    id: 14,
    title: "Extract of a Drivers License",
    icon: (
      <svg className="h-4 w-4 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    url: "/../../../public/bicycles.jpg"
    },
    {
    id: 15,
    title: "Service for Oversea Travellers",
    icon: (
      <svg className="h-4 w-4 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    url: "/../../../public/bicycles.jpg"
    }
];

export default function Services() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredServices = servicesData.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen gap-8">
        <Header departmentName={userDepartmentName}></Header>

        <main className="flex flex-col w-full gap-[32px] row-start-2 items-start sm:items-start p-12">

            <div className="flex flex-col gap-2 w-full">
            <SearchBar 
                placeholder="Search for services..."
                onSearch={setSearchQuery}
            >
            </SearchBar>
            </div>

            {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {filteredServices.map((service) => (
                        <DepartmentCard
                            key={service.id}
                            title={service.title}
                            icon={service.icon}
                            serviceID={service.id}
                            imageUrl={service.url}
                        />
                    ))}
                </div>
            ) : (
                <div className="w-full text-center py-8">
                    <p className="text-text-700">No items found matching "{searchQuery}"</p>
                </div>
            )}
            <Button>Add New Service</Button>

        </main>
        
        </div>
    );
}
