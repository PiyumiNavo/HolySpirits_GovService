import React from "react";
import DepartmentCard from "./DepartmentCard"; 

interface DepartmentListProps {
  departments: Array<{
    id: number;
    title: string;
    icon?: React.ReactNode;
    customUrl?: string;
  }>;
}

export default function DepartmentList({ departments }: DepartmentListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {departments.length > 0 ? (
        departments.map((dept) => (
          <DepartmentCard
            key={dept.id}
            title={dept.title}
            customUrl={dept.customUrl}
          />
        ))
      ) : (
        <p className="text-text-700 text-sm col-span-full text-center">
          No departments found matching your search.
        </p>
      )}
    </div>
  );
}