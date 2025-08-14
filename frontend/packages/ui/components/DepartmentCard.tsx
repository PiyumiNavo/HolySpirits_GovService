import React from "react";

interface MinistryCardProps {
  title: string;
  icon?: React.ReactNode;
  backgroundColor?: string;
  circleColor?: string;
  textColor?: string;
}

export default function MinistryCard({
  title = "Ministry of Public Administration, Provincial Councils",
  icon = <DefaultIcon />,
  backgroundColor = "#C0E2EC",
  circleColor = "#073348",
  textColor = "#073348",
}: MinistryCardProps) {
  return (
    <div 
      className="flex items-center gap-2 p-2 w-full rounded-[100px]"
      style={{ backgroundColor }}
    >
      {/* Circle with icon */}
      <div 
        className="flex-shrink-0 flex items-center justify-center w-[48px] h-[48px] rounded-full"
        style={{ backgroundColor: circleColor }}
      >
        <div className="text-white text-4xl">
          {icon}
        </div>
      </div>
      
      {/* Title */}
      <h2 
        className="flex-grow text-[16px] font-medium tracking-wider"
        style={{ color: textColor }}
      >
        {title}
      </h2>
    </div>
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