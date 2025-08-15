import React from "react";

interface ListItemProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

export default function ListItem({ icon, text, onClick }: ListItemProps) {
  return (
    <div 
      className="flex items-center gap-3 p-4 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
      onClick={onClick}
    >
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-600">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-800 flex-1">
        {text}
      </span>
    </div>
  );
}
