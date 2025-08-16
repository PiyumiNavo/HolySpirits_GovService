// src/app/departments/add/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DepartmentHeader, Card, AddDepartmentForm } from "@myorg/ui";
import { useAuth } from "../../hooks/useAuth";
import departmentService from "../../services/department.service";
import ProtectedRoute from "../../components/ProtectedRoute";
import type { ApiError } from "../../types/api.types";

export default function AddDepartmentPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    ministryName: "",
    description: "",
    address: "",
    district: "",
    province: "",
    emails: [""],
    phones: [""],
    website: "",
    registrationNumber: "",
    type: "Ministry",
    status: "Active",
    logoUrl: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTextareaChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => {
      const newArray = [...(prev[field as keyof typeof prev] as string[])];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayField = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as string[]), ""]
    }));
  };

  const removeArrayField = (field: string, index: number) => {
    setFormData(prev => {
      const newArray = [...(prev[field as keyof typeof prev] as string[])];
      newArray.splice(index, 1);
      return { ...prev, [field]: newArray };
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Department name is required";
    if (!formData.code.trim()) newErrors.code = "Department code is required";
    if (!formData.ministryName.trim()) newErrors.ministryName = "Ministry name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.district.trim()) newErrors.district = "District is required";
    if (!formData.province.trim()) newErrors.province = "Province is required";
    
    // Validate emails
    formData.emails.forEach((email, index) => {
      if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors[`emails-${index}`] = "Invalid email format";
      }
    });
    
    // Ensure at least one email is provided
    const validEmails = formData.emails.filter(email => email.trim());
    if (validEmails.length === 0) {
      newErrors.emails = "At least one email is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({}); // Clear previous errors
    
    try {
      // Prepare the request data according to the API structure
      const departmentData = {
        name: formData.name.trim(),
        code: formData.code.trim(),
        ministryName: formData.ministryName.trim(),
        description: formData.description.trim(),
        address: formData.address.trim(),
        district: formData.district.trim(),
        province: formData.province.trim(),
        contactInfo: {
          emails: formData.emails.filter(email => email.trim()),
          phones: formData.phones.filter(phone => phone.trim()),
          website: formData.website.trim(),
        },
        registrationNumber: formData.registrationNumber.trim(),
        type: formData.type,
        status: formData.status,
        logoUrl: formData.logoUrl.trim(),
        mainAdminUserId: user?._id, // Use the current user's ID
      };
      
      // Create the department using the service
      const newDepartment = await departmentService.createDepartment(departmentData);
      
      console.log('Department created successfully:', newDepartment);
      
      // Redirect to departments page on success
      router.push("/departments");
      
    } catch (error) {
      console.error('Error creating department:', error);
      const apiError = error as ApiError;
      
      // Handle different error types
      if (apiError.status === 400) {
        setErrors(prev => ({
          ...prev,
          form: "Invalid data provided. Please check all fields and try again.",
        }));
      } else if (apiError.status === 401) {
        setErrors(prev => ({
          ...prev,
          form: "You are not authorized. Please log in again.",
        }));
      } else if (apiError.status === 403) {
        setErrors(prev => ({
          ...prev,
          form: "You don't have permission to create departments.",
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          form: apiError.message || "Failed to create department. Please try again.",
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16">
        <DepartmentHeader departmentName="Add New Department" />

        <main className="w-full row-start-2 container mx-auto px-4">
          <Card padding="lg" shadow="md" className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-text-900 mb-6">Add New Government Department</h1>
            
            {/* Display form-level errors */}
            {errors.form && (
              <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-md">
                <p className="text-error-600 text-sm">{errors.form}</p>
              </div>
            )}
            
            <AddDepartmentForm
              formData={formData}
              errors={errors}
              isSubmitting={isSubmitting}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              handleTextareaChange={handleTextareaChange}
              handleArrayChange={handleArrayChange}
              addArrayField={addArrayField}
              removeArrayField={removeArrayField}
              onSubmit={handleSubmit}
              onCancel={() => router.push("/departments")}
            />
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
}