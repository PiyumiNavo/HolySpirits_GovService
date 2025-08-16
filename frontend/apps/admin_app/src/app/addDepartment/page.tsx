// src/app/departments/add/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DepartmentHeader, Card, AddDepartmentForm } from "@myorg/ui";

export default function AddDepartmentPage() {
  const router = useRouter();
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
    if (!formData.address.trim()) newErrors.address = "Address is required";
    
    formData.emails.forEach((email, index) => {
      if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors[`emails-${index}`] = "Invalid email format";
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          contactInfo: {
            emails: formData.emails.filter(email => email.trim()),
            phones: formData.phones.filter(phone => phone.trim()),
            website: formData.website,
          },
        }),
      });
      
      if (response.ok) {
        router.push("/departments");
      } else {
        const errorData = await response.json();
        setErrors(prev => ({
          ...prev,
          form: errorData.message || "Failed to create department",
        }));
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        form: "Network error. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16">
      <DepartmentHeader departmentName="Add New Department" />

      <main className="w-full row-start-2 container mx-auto px-4">
        <Card padding="lg" shadow="md" className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-text-900 mb-6">Add New Government Department</h1>
          
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
  );
}