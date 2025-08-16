"use client";

import { useState, useEffect } from "react";
import { DepartmentHeader, Button, BranchCard } from "@myorg/ui";
import { useParams } from "next/navigation";
import { ObjectId, Types } from "mongoose";

// Define the Department type with _id as string
interface Department {
  _id: string;
  name: string;
  code: string;
  ministryName: string;
  description: string;
  address: string;
  district: string;
  province: string;
  contactInfo: {
    emails: string[];
    phones: string[];
    website: string;
  };
  registrationNumber: string;
  type: "Ministry" | "Provincial Council" | "Local Authority" | "Other";
  status: "Active" | "Inactive";
  logoUrl: string;
  createdBy: string;
  mainAdminUserId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Location (Branch) type with _id as string
interface Location {
  _id: string;
  name: string;
  address: string;
  departmentId: string;
  geoCoordinates: {
    lat: number;
    lng: number;
  };
  workingHours: Array<{
    day: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
    openingTime: string;
    closingTime: string;
    isClosed: boolean;
  }>;
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
}

// Mock function to simulate fetching department data
const fetchDepartmentById = async (id: string): Promise<Department | null> => {
  const mockDepartments: Record<string, Department> = {
    "1": {
      _id: "60d5f8b8e9f7b2001e4c3f2d",
      name: "Department of Motor Traffic",
      code: "DMT-001",
      ministryName: "Ministry of Transport",
      description: "Manages motor vehicle registration and licensing.",
      address: "No. 150, Galle Road, Colombo 03",
      district: "Colombo",
      province: "Western",
      contactInfo: {
        emails: ["info@dmt.gov.lk", "support@dmt.gov.lk"],
        phones: ["+94112345678", "+94112345679"],
        website: "https://dmt.gov.lk",
      },
      registrationNumber: "BRN-123456",
      type: "Ministry",
      status: "Active",
      logoUrl: "/logos/dmt-logo.png",
      createdBy: "user123",
      mainAdminUserId: "admin456",
      createdAt: new Date("2023-01-15T10:00:00Z"),
      updatedAt: new Date("2025-08-01T09:00:00Z"),
    },
    "2": {
      _id: "60d5f8b8e9f7b2001e4c3f2e",
      name: "Department of Health",
      code: "DOH-002",
      ministryName: "Ministry of Health",
      description: "Oversees public health services and hospitals.",
      address: "No. 200, Baseline Road, Colombo 09",
      district: "Colombo",
      province: "Western",
      contactInfo: {
        emails: ["health@health.gov.lk"],
        phones: ["+94119876543"],
        website: "https://health.gov.lk",
      },
      registrationNumber: "BRN-987654",
      type: "Ministry",
      status: "Active",
      logoUrl: "/logos/doh-logo.png",
      createdBy: "user789",
      mainAdminUserId: "admin101",
      createdAt: new Date("2023-02-10T12:00:00Z"),
      updatedAt: new Date("2025-07-15T14:00:00Z"),
    },
  };
  return mockDepartments[id] || null;
};

// Mock function to simulate fetching branch data
const fetchBranchesByDepartmentId = async (departmentId: string): Promise<Location[] | null> => {
  const mockBranches: Record<string, Location[]> = {
    "1": [
      {
        _id: "60d5f8b8e9f7b2001e4c3f2f",
        name: "Colombo Branch",
        address: "No. 150, Galle Road, Colombo 03",
        departmentId: "60d5f8b8e9f7b2001e4c3f2d",
        geoCoordinates: { lat: 6.9271, lng: 79.8612 },
        workingHours: [
          { day: "mon", openingTime: "09:00", closingTime: "17:00", isClosed: false },
          { day: "tue", openingTime: "09:00", closingTime: "17:00", isClosed: false },
          { day: "wed", openingTime: "09:00", closingTime: "17:00", isClosed: false },
          { day: "thu", openingTime: "09:00", closingTime: "17:00", isClosed: false },
          { day: "fri", openingTime: "09:00", closingTime: "17:00", isClosed: false },
          { day: "sat", openingTime: "09:00", closingTime: "13:00", isClosed: false },
          { day: "sun", openingTime: "", closingTime: "", isClosed: true },
        ],
        capacity: 50,
        createdAt: new Date("2023-03-01T08:00:00Z"),
        updatedAt: new Date("2025-08-10T10:00:00Z"),
      },
      {
        _id: "60d5f8b8e9f7b2001e4c3f30",
        name: "Kandy Branch",
        address: "No. 25, Dalada Veediya, Kandy",
        departmentId: "60d5f8b8e9f7b2001e4c3f2d",
        geoCoordinates: { lat: 7.2906, lng: 80.6337 },
        workingHours: [
          { day: "mon", openingTime: "08:30", closingTime: "16:30", isClosed: false },
          { day: "tue", openingTime: "08:30", closingTime: "16:30", isClosed: false },
          { day: "wed", openingTime: "08:30", closingTime: "16:30", isClosed: false },
          { day: "thu", openingTime: "08:30", closingTime: "16:30", isClosed: false },
          { day: "fri", openingTime: "08:30", closingTime: "16:30", isClosed: false },
          { day: "sat", openingTime: "", closingTime: "", isClosed: true },
          { day: "sun", openingTime: "", closingTime: "", isClosed: true },
        ],
        capacity: 30,
        createdAt: new Date("2023-04-15T09:00:00Z"),
        updatedAt: new Date("2025-08-05T12:00:00Z"),
      },
    ],
    "2": [
      {
        _id: "60d5f8b8e9f7b2001e4c3f31",
        name: "Colombo Health Branch",
        address: "No. 200, Baseline Road, Colombo 09",
        departmentId: "60d5f8b8e9f7b2001e4c3f2e",
        geoCoordinates: { lat: 6.9344, lng: 79.8428 },
        workingHours: [
          { day: "mon", openingTime: "08:00", closingTime: "18:00", isClosed: false },
          { day: "tue", openingTime: "08:00", closingTime: "18:00", isClosed: false },
          { day: "wed", openingTime: "08:00", closingTime: "18:00", isClosed: false },
          { day: "thu", openingTime: "08:00", closingTime: "18:00", isClosed: false },
          { day: "fri", openingTime: "08:00", closingTime: "18:00", isClosed: false },
          { day: "sat", openingTime: "", closingTime: "", isClosed: true },
          { day: "sun", openingTime: "", closingTime: "", isClosed: true },
        ],
        capacity: 100,
        createdAt: new Date("2023-05-20T07:00:00Z"),
        updatedAt: new Date("2025-08-12T15:00:00Z"),
      },
    ],
  };
  return mockBranches[departmentId] || null;
};

export default function DepartmentUnitPage() {
  const params = useParams();
  const { id } = params;

  const [department, setDepartment] = useState<Department | null>(null);
  const [branches, setBranches] = useState<Location[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const deptData = await fetchDepartmentById(id as string);
      const branchData = await fetchBranchesByDepartmentId(id as string);
      setDepartment(deptData);
      setBranches(branchData);
      setLoading(false);
    };
    loadData();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-text-700">Loading...</div>;
  }

  if (!department || !branches) {
    return <div className="container mx-auto px-4 py-8 text-text-700">Department or branches not found</div>;
  }

  const handleAddBranch = () => {
    console.log("Add new branch clicked - implement form or API call here for department ID:", id);
    // In a real app, this would open a form or send a request to add a branch
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16">
      <DepartmentHeader departmentName={department.name} />

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start container mx-auto px-4">
        {/* Head Office Section - Row-wise layout */}
        <div className="w-full bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-primary-600 mb-4">Head Office</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                <span className="font-medium text-primary-600">Location:</span> {department.address}
                </div>
                <div>
                <span className="font-medium text-primary-600">District:</span> {department.district}
                </div>
                <div>
                <span className="font-medium text-primary-600">Province:</span> {department.province}
                </div>
                <div>
                <span className="font-medium text-primary-600">Registration Number:</span> {department.registrationNumber}
                </div>
                <div>
                <span className="font-medium text-primary-600">Type:</span> {department.type}
                </div>
                <div>
                <span className="font-medium text-primary-600">Status:</span> {department.status}
                </div>
                <div>
                <span className="font-medium text-primary-600">Created:</span> {new Date(department.createdAt).toLocaleDateString()}
                </div>
                <div>
                <span className="font-medium text-primary-600">Last Updated:</span> {new Date(department.updatedAt).toLocaleDateString()}
                </div>
                <div className="col-span-full mt-4">
                <h3 className="text-md font-medium text-primary-600 mb-2">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                    <span className="font-medium text-primary-600">Emails:</span> {department.contactInfo.emails.join(", ")}
                    </div>
                    <div>
                    <span className="font-medium text-primary-600">Phones:</span> {department.contactInfo.phones.join(", ")}
                    </div>
                    <div>
                    <span className="font-medium text-primary-600">Website:</span>{" "}
                    <a href={department.contactInfo.website} className="text-primary-600 hover:underline">
                        {department.contactInfo.website}
                    </a>
                    </div>
                </div>
                </div>
            </div>
        </div>

        {/* Branches List */}
        <div className="w-full">
          <h2 className="text-lg font-semibold text-primary-600 mb-4">Branches</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {branches.map((branch) => (
              <BranchCard
                key={branch._id}
                id={parseInt(branch._id)} // Convert string to number
                branchName={branch.name}
                address={branch.address}
                counterCount={branch.capacity}
                assigneeCount={10} // Placeholder
              />
            ))}
          </div>
        </div>

        {/* Add New Branch Button */}
        <Button variant="primary" size="md" onClick={handleAddBranch}>
          Add New Branch
        </Button>
      </main>
    </div>
  );
}