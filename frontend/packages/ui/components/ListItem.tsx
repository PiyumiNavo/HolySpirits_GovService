import React from "react";

interface ListItemProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

export default function ListItem({ icon, text, onClick }: ListItemProps) {
  return (
    <div 
      className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 w-full max-w-full overflow-hidden"
      onClick={onClick}
    >
      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-blue-500 rounded-full text-white">
        <div className="text-xs sm:text-sm">
          {icon}
        </div>
      </div>
      <span className="text-xs sm:text-sm font-medium text-gray-800 flex-1 truncate pr-2">
        {text}
      </span>
    </div>
  );
}
