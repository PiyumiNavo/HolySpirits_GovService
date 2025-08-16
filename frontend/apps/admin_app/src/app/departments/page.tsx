"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { DepartmentHeader, SearchBar, Button, DepartmentList, LoadingSkeleton, Card, PlatformHeader } from "@myorg/ui";
import { useAuth } from "../../hooks/useAuth";
import { useDepartments } from "../../hooks/useDepartments";
import ProtectedRoute from "../../components/ProtectedRoute";
import type { DepartmentListItem } from "../../types/department.types";

export default function DepartmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { user, logout } = useAuth();
  const { departments, loading, error, refetch } = useDepartments();

  // Transform backend departments to the format expected by DepartmentList component
  const transformedDepartments: DepartmentListItem[] = useMemo(() => {
    return departments.map((dept, index) => ({
      id: index + 1, // Use index as number ID for the UI component
      title: dept.name,
      customUrl: `/departments/${dept._id}`,
      description: dept.description,
      status: dept.status,
      logoUrl: dept.logoUrl,
    }));
  }, [departments]);

  // Filter departments based on search query
  const filteredDepartments = useMemo(() => {
    return transformedDepartments.filter((dept) =>
      dept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dept.description && dept.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [transformedDepartments, searchQuery]);

  const handleLogout = () => {
    logout();
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleAddDepartment = () => {
    router.push('/addDepartment');
  };

  return (
    <ProtectedRoute>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16">
        <div className="w-full">
          <PlatformHeader departmentName={`Welcome, ${user?.name || 'Admin'}`} />
          <div className="flex justify-end px-4 mt-2">
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start container mx-auto px-4">
          <div className="flex flex-col gap-2 w-full">
            <SearchBar
              placeholder="Search for departments..."
              onSearch={(query) => {
                setSearchQuery(query);
              }}
            />
          </div>

          <div className="flex gap-4">
            <Button variant="primary" size="md" onClick={handleAddDepartment}>
              Add New Department
            </Button>
            <Button variant="outline" size="md" onClick={handleRefresh} disabled={loading}>
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>

          {/* Error State */}
          {error && (
            <Card className="w-full p-4 bg-error-50 border-error-200">
              <div className="text-error-600 text-center">
                <p className="font-medium">Error loading departments</p>
                <p className="text-sm mt-1">{error}</p>
                <Button variant="outline" size="sm" onClick={handleRefresh} className="mt-2">
                  Try Again
                </Button>
              </div>
            </Card>
          )}

          {/* Loading State */}
          {loading && !error && (
            <div className="w-full space-y-4">
              <LoadingSkeleton className="h-20" />
              <LoadingSkeleton className="h-20" />
              <LoadingSkeleton className="h-20" />
            </div>
          )}

          {/* Departments List */}
          {!loading && !error && (
            <>
              {filteredDepartments.length > 0 ? (
                <DepartmentList departments={filteredDepartments} />
              ) : (
                <Card className="w-full p-8 text-center">
                  <p className="text-text-600">
                    {searchQuery 
                      ? `No departments found matching "${searchQuery}"` 
                      : "No departments found"
                    }
                  </p>
                  {searchQuery && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSearchQuery("")} 
                      className="mt-2"
                    >
                      Clear Search
                    </Button>
                  )}
                </Card>
              )}
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}