"use client";
import React from "react";
import Link from "next/link";

interface DepartmentCardProps {
  title: string;
  icon?: React.ReactNode;
  serviceID?: Number;
}

export default function DepartmentCard({
  title = "Government Department",
  icon = <DefaultIcon />,
  serviceID,
  }: DepartmentCardProps) {

    return (
      <Link 
        href={`services/${serviceID}`} 
        className="block w-full hover:no-underline"
      >
        <div className="flex items-center bg-primary-500 gap-2 p-2 w-full rounded-[100px]">
          {/* Circle with icon */}
          <div 
            className="flex-shrink-0 flex items-center justify-center w-[48px] h-[48px] rounded-full bg-primary-600"
          >
            <div className="text-white text-4xl">
              {icon}
            </div>
          </div>
          
          {/* Title */}
          <h2 
            className="flex-grow text-sm font-medium text-primary-600 tracking-wider md:text-sm lg:text-base"
          >
            {title}
          </h2>
        </div>
      </Link>
    );
}

// Default icon component (replace with your actual icon)
function DefaultIcon() {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect 
        x="4" 
        y="4" 
        width="16" 
        height="16" 
        rx="2" 
        fill="#E3E3E3"
      />
    </svg>
  );
}