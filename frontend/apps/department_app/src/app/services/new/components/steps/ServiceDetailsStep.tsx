import React from "react";
import { InputField, TextArea, Select } from "@myorg/ui";
import { ServiceDetails } from "../../types/service-creation.types";

interface ServiceDetailsStepProps {
  serviceDetails: ServiceDetails;
  onUpdate: (details: Partial<ServiceDetails>) => void;
  error?: string;
}

const serviceTypeOptions = [
  { value: "single-location", label: "Single Location - Service available at one fixed location" },
  { value: "multi-location-preselect", label: "Multi-location with Selection - Citizens choose their preferred location" },
  { value: "multi-location-inform", label: "Multi-location Informational - Display all available locations" }
];

export default function ServiceDetailsStep({ serviceDetails, onUpdate, error }: ServiceDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-text-900 mb-4">Service Details</h2>
        <p className="text-text-500 mb-6">Provide basic information about the service you want to create.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <InputField
          id="serviceName"
          label="Service Name"
          type="text"
          value={serviceDetails.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Enter the name of the service"
          required
          error={error}
        />

        <TextArea
          id="serviceDescription"
          label="Service Description"
          value={serviceDetails.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Provide a detailed description of what this service offers and any requirements"
          rows={4}
        />

        <Select
          id="serviceType"
          label="Service Type"
          value={serviceDetails.type}
          onChange={(value) => onUpdate({ type: value as ServiceDetails['type'] })}
          options={serviceTypeOptions}
          required
        />

        <div className="bg-primary-400 p-4 rounded-md">
          <h3 className="font-medium text-primary-600 mb-2">Service Type Explanation:</h3>
          <div className="text-sm text-text-700 space-y-2">
            <p><strong>Single Location:</strong> Service is only available at one location. Citizens don't need to choose.</p>
            <p><strong>Multi-location with Selection:</strong> Service is available at multiple locations, and citizens must select their preferred location when booking.</p>
            <p><strong>Multi-location Informational:</strong> Service is available at multiple locations, but citizens don't need to select one specifically during booking.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
