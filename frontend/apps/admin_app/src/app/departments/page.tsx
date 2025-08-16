"use client";
import { useState } from "react";
import { DepartmentHeader, SearchBar, Button, DepartmentList, PlatformHeader } from "@myorg/ui";

// Mock data for departments. In real app, fetch from API.
const departments = [
  {
    id: 1,
    title: "Department of Motor Traffic",
    customUrl: "/departments/motor-traffic",
  },
  {
    id: 2,
    title: "Department of Health",
    customUrl: "/departments/health",
  },
  {
    id: 3,
    title: "Department of Education",
    customUrl: "/departments/education",
  },
  {
    id: 4,
    title: "Department of Finance",
    customUrl: "/departments/finance",
  },
];

export default function DepartmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter departments based on search query
  const filteredDepartments = departments.filter((dept) =>
    dept.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16">
      <PlatformHeader departmentName="Government Departments" />

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start container mx-auto px-4">
        <div className="flex flex-col gap-2 w-full">
          <SearchBar
            placeholder="Search for departments..."
            onSearch={(query) => {
              setSearchQuery(query);
            }}
          />
        </div>

        <Button variant="primary" size="md">
          Add New Department
        </Button>

        <DepartmentList departments={filteredDepartments} />
      </main>
    </div>
  );
}