
"use client";
import React from "react";
import { DepartmentFormSection, InputField, ArrayInputField, Button } from "@myorg/ui";

interface AddDepartmentFormProps {
  formData: any;
  errors: Record<string, string>;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleTextareaChange: (name: string, value: string) => void;
  handleArrayChange: (field: string, index: number, value: string) => void;
  addArrayField: (field: string) => void;
  removeArrayField: (field: string, index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function AddDepartmentForm({
  formData,
  errors,
  isSubmitting,
  handleChange,
  handleSelectChange,
  handleTextareaChange,
  handleArrayChange,
  addArrayField,
  removeArrayField,
  onSubmit,
  onCancel,
}: AddDepartmentFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DepartmentFormSection title="Basic Information">
          <InputField
            id="name"
            label="Department Name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Department of Motor Traffic"
            required
            error={errors.name}
          />
          
          <InputField
            id="code"
            label="Department Code"
            type="text"
            value={formData.code}
            onChange={handleChange}
            placeholder="e.g. DMT"
            required
            error={errors.code}
          />
          
          <InputField
            id="ministryName"
            label="Ministry (if applicable)"
            type="text"
            value={formData.ministryName}
            onChange={handleChange}
            placeholder="e.g. Ministry of Transport"
          />
          
          <InputField
            id="registrationNumber"
            label="Registration Number"
            type="text"
            value={formData.registrationNumber}
            onChange={handleChange}
            placeholder="e.g. BRN123456"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-700 mb-2">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={(e) => handleSelectChange("type", e.target.value)}
                className="w-full px-3 py-2 border border-border-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="Ministry">Ministry</option>
                <option value="Provincial Council">Provincial Council</option>
                <option value="Local Authority">Local Authority</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={(e) => handleSelectChange("status", e.target.value)}
                className="w-full px-3 py-2 border border-border-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </DepartmentFormSection>
        
        <DepartmentFormSection title="Location Information">
          <InputField
            id="address"
            label="Address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            placeholder="e.g. 123 Government Street"
            required
            error={errors.address}
          />
          
          <InputField
            id="district"
            label="District"
            type="text"
            value={formData.district}
            onChange={handleChange}
            placeholder="e.g. Colombo"
          />
          
          <InputField
            id="province"
            label="Province"
            type="text"
            value={formData.province}
            onChange={handleChange}
            placeholder="e.g. Western"
          />
          
          <InputField
            id="logoUrl"
            label="Logo URL"
            type="text"
            value={formData.logoUrl}
            onChange={handleChange}
            placeholder="https://example.com/logo.png"
          />
        </DepartmentFormSection>
      </div>
      
      <DepartmentFormSection title="Contact Information">
        <ArrayInputField
          id="emails"
          label="Email Addresses"
          values={formData.emails}
          onChange={(index, value) => handleArrayChange("emails", index, value)}
          onAdd={() => addArrayField("emails")}
          onRemove={(index) => removeArrayField("emails", index)}
          type="email"
          placeholder="e.g. info@department.gov.lk"
          errors={errors}
        />
        
        <ArrayInputField
          id="phones"
          label="Phone Numbers"
          values={formData.phones}
          onChange={(index, value) => handleArrayChange("phones", index, value)}
          onAdd={() => addArrayField("phones")}
          onRemove={(index) => removeArrayField("phones", index)}
          type="tel"
          placeholder="e.g. +94 11 2345678"
        />
        
        <InputField
          id="website"
          label="Website"
          type="url"
          value={formData.website}
          onChange={handleChange}
          placeholder="e.g. https://department.gov.lk"
        />
      </DepartmentFormSection>
      
      <DepartmentFormSection title="Description">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-text-700 mb-2">
            Department Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={(e) => handleTextareaChange("description", e.target.value)}
            className="w-full px-3 py-2 border border-border-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[120px]"
            placeholder="Brief description about the department's functions and responsibilities..."
          />
        </div>
      </DepartmentFormSection>
      
      <div className="flex justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Department"}
        </Button>
      </div>
    </form>
  );
}