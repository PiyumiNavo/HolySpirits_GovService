import React, { useState, useEffect } from "react";
import { SearchBar, SelectableBranchCard } from "@myorg/ui";
import { Location } from "../../types/service-creation.types";

interface BranchSelectionStepProps {
  selectedBranches: Location[];
  onUpdate: (branches: Location[]) => void;
  error?: string;
}

// Mock data - in real implementation, this would come from an API
const mockBranches: Location[] = [
  {
    id: "1",
    name: "Colombo Central",
    address: "234 Union Place, Colombo 02",
    departmentId: "dept1",
    workingHours: [
      { day: "mon", openingTime: "08:00", closingTime: "16:00", isClosed: false },
      { day: "tue", openingTime: "08:00", closingTime: "16:00", isClosed: false },
      { day: "wed", openingTime: "08:00", closingTime: "16:00", isClosed: false },
      { day: "thu", openingTime: "08:00", closingTime: "16:00", isClosed: false },
      { day: "fri", openingTime: "08:00", closingTime: "16:00", isClosed: false },
      { day: "sat", openingTime: "08:00", closingTime: "12:00", isClosed: false },
      { day: "sun", openingTime: "", closingTime: "", isClosed: true },
    ],
    counterCount: 8,
    mainAssignee: "Nimal Perera",
    assigneeCount: 15
  },
  {
    id: "2",
    name: "Kandy City",
    address: "120 Temple Road, Kandy",
    departmentId: "dept1",
    workingHours: [
      { day: "mon", openingTime: "08:00", closingTime: "16:00", isClosed: false },
      { day: "tue", openingTime: "08:00", closingTime: "16:00", isClosed: false },
      { day: "wed", openingTime: "08:00", closingTime: "16:00", isClosed: false },
      { day: "thu", openingTime: "08:00", closingTime: "16:00", isClosed: false },
      { day: "fri", openingTime: "08:00", closingTime: "16:00", isClosed: false },
      { day: "sat", openingTime: "08:00", closingTime: "12:00", isClosed: false },
      { day: "sun", openingTime: "", closingTime: "", isClosed: true },
    ],
    counterCount: 6,
    mainAssignee: "Samantha Silva",
    assigneeCount: 12
  },
  {
    id: "3",
    name: "Galle Main",
    address: "45 Lighthouse Street, Galle",
    departmentId: "dept1",
    workingHours: [
      { day: "mon", openingTime: "08:00", closingTime: "16:00", isClosed: false },
      { day: "tue", openingTime: "08:00", closingTime: "16:00", isClosed: false },
      { day: "wed", openingTime: "08:00", closingTime: "16:00", isClosed: false },
      { day: "thu", openingTime: "08:00", closingTime: "16:00", isClosed: false },
      { day: "fri", openingTime: "08:00", closingTime: "16:00", isClosed: false },
      { day: "sat", openingTime: "", closingTime: "", isClosed: true },
      { day: "sun", openingTime: "", closingTime: "", isClosed: true },
    ],
    counterCount: 5,
    mainAssignee: "Rajiv Fernando",
    assigneeCount: 10
  },
  {
    id: "4",
    name: "Jaffna Central",
    address: "78 Temple Road, Jaffna",
    departmentId: "dept1",
    workingHours: [
      { day: "mon", openingTime: "08:00", closingTime: "16:00", isClosed: false },
      { day: "tue", openingTime: "08:00", closingTime: "16:00", isClosed: false },
      { day: "wed", openingTime: "08:00", closingTime: "16:00", isClosed: false },
      { day: "thu", openingTime: "08:00", closingTime: "16:00", isClosed: false },
      { day: "fri", openingTime: "08:00", closingTime: "16:00", isClosed: false },
      { day: "sat", openingTime: "", closingTime: "", isClosed: true },
      { day: "sun", openingTime: "", closingTime: "", isClosed: true },
    ],
    counterCount: 4,
    mainAssignee: "Anjali Pathmanathan",
    assigneeCount: 8
  }
];

export default function BranchSelectionStep({ selectedBranches, onUpdate, error }: BranchSelectionStepProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [branches, setBranches] = useState<Location[]>([]);

  useEffect(() => {
    // Mock API call - in real implementation, fetch from API
    setBranches(mockBranches);
  }, []);

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBranchSelect = (branch: Location, selected: boolean) => {
    if (selected) {
      onUpdate([...selectedBranches, branch]);
    } else {
      onUpdate(selectedBranches.filter(b => b.id !== branch.id));
    }
  };

  const selectAll = () => {
    onUpdate(filteredBranches);
  };

  const clearAll = () => {
    onUpdate([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-text-900 mb-4">Branch Selection</h2>
        <p className="text-text-500 mb-6">
          Choose which branches will offer this service. Citizens will be able to access this service at the selected locations.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1">
          <SearchBar 
            placeholder="Search branches by name or address..."
            onSearch={setSearchQuery}
          />
        </div>
        
        <div className="flex gap-2">
          <button
            type="button"
            onClick={selectAll}
            className="text-sm text-primary-600 hover:text-primary-hover font-medium"
          >
            Select All ({filteredBranches.length})
          </button>
          <span className="text-text-500">|</span>
          <button
            type="button"
            onClick={clearAll}
            className="text-sm text-text-500 hover:text-text-700 font-medium"
          >
            Clear All
          </button>
        </div>
      </div>

      {selectedBranches.length > 0 && (
        <div className="bg-primary-400 p-4 rounded-md">
          <p className="text-sm font-medium text-primary-600">
            {selectedBranches.length} branch{selectedBranches.length > 1 ? 'es' : ''} selected: {' '}
            {selectedBranches.map(b => b.name).join(', ')}
          </p>
        </div>
      )}

      {error && (
        <div className="bg-error-100 border border-error-500 p-4 rounded-md">
          <p className="text-error-500 text-sm">{error}</p>
        </div>
      )}

      {filteredBranches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBranches.map((branch) => (
            <SelectableBranchCard
              key={branch.id}
              branchName={branch.name}
              address={branch.address}
              counterCount={branch.counterCount || 0}
              mainAssignee={branch.mainAssignee || "Not Assigned"}
              assigneeCount={branch.assigneeCount || 0}
              selected={selectedBranches.some(b => b.id === branch.id)}
              onSelect={(selected) => handleBranchSelect(branch, selected)}
              selectable
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-text-500">No branches found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
