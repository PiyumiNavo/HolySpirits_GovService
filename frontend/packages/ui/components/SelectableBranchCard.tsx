"use client";

interface SelectableBranchCardProps {
  branchName: string;
  address: string;
  counterCount: number;
  mainAssignee: string;
  assigneeCount: number;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  selectable?: boolean;
}

export default function SelectableBranchCard({
  branchName = "Main Branch",
  address = "123 Government St, Colombo",
  counterCount = 5,
  mainAssignee = "John Doe",
  assigneeCount = 12,
  selected = false,
  onSelect,
  selectable = false
}: SelectableBranchCardProps) {
  const handleClick = () => {
    if (selectable && onSelect) {
      onSelect(!selected);
    }
  };

  return (
    <div 
      className={`
        w-full bg-text-white rounded-xl shadow-sm overflow-hidden transition-all duration-300
        ${selectable ? 'cursor-pointer hover:shadow-lg' : ''}
        ${selected ? 'ring-2 ring-primary-600 shadow-lg' : 'hover:shadow-lg'}
      `}
      onClick={handleClick}
    >
      {/* Header */}
      <div className={`p-4 ${selected ? 'bg-primary-600' : 'bg-primary-600'}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-semibold text-text-white">{branchName}</h2>
          {selectable && (
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selected}
                onChange={(e) => {
                  e.stopPropagation();
                  onSelect?.(e.target.checked);
                }}
                className="h-4 w-4 rounded border-border-200 text-primary-600 focus:ring-primary-500"
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 space-y-2">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-text-500 mt-0.5 mr-2 flex-shrink-0" 
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
        
        {/* Main Assignees */}
        <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-primary-400 text-primary-600 text-sm font-medium px-3.5 py-1.5 rounded">
                Main Assignee: {mainAssignee}
            </span>
        </div>
      </div>
    </div>
  );
}
