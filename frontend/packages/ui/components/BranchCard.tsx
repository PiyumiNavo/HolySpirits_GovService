"use client";

import { useRouter } from "next/navigation";

interface BranchCardProps {
  id: number;
  branchName: string;
  address: string;
  counterCount: number;
  assigneeCount: number;
  onClick?: (id: number) => void;
  onViewSubmissions?: (id: number) => void;
}

export default function BranchCard({
  id,
  branchName = "Main Branch",
  address = "123 Government St, Colombo",
  counterCount = 5,
  assigneeCount = 12,
  onClick,
  onViewSubmissions,
}: BranchCardProps) {
  
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const handleViewSubmissions = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (onViewSubmissions) {
      onViewSubmissions(id);
    }
  };
  
  return (
    <div
      onClick={handleClick}
      className="w-full bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      {/* Header */}
      <div className="bg-primary-600 p-4">
        <h2 className="text-sm sm:text-base font-semibold text-white">{branchName}</h2>
      </div>
      
      {/* Content */}
      <div className="p-5 space-y-2">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-text-500 text-sm">{address}</p>
        </div>
        
        {/* Stats Row */}
        <div className="flex justify-between">
          {/* Counters */}
          <div className="flex items-center">
            <svg className="w-5 h-5 text-primary-600 mr-2" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="font-medium text-sm sm:text-base">{counterCount} Counters</span>
          </div>
          
          {/* Assignees */}
          <div className="flex items-center">
            <svg className="w-5 h-5 text-primary-600 mr-2" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="font-medium text-sm sm:text-base">{assigneeCount} Assignees</span>
          </div>
        </div>
        
        {/* Action Button */}
        {onViewSubmissions && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <button
              onClick={handleViewSubmissions}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
            >
              View Submissions
            </button>
          </div>
        )}
      </div>
    </div>
  );
}