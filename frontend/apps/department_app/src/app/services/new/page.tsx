"use client";

import React, { useState } from "react";
import { Header, Stepper, Card, Button } from "@myorg/ui";
import ServiceDetailsStep from "./components/steps/ServiceDetailsStep";
import BranchSelectionStep from "./components/steps/BranchSelectionStep";
import FormBuilderStep from "./components/steps/FormBuilderStep";
import AppointmentSettingsStep from "./components/steps/AppointmentSettingsStep";
import ReviewStep from "./components/steps/ReviewStep";
import { ServiceCreationState, FormField, Location, AppointmentSettings } from "./types/service-creation.types";

const userDepartmentName = "Department of Motor Traffic (DMT)";

const steps = [
  { label: "Service Details", description: "Basic information" },
  { label: "Branch Selection", description: "Choose locations" },
  { label: "Form Builder", description: "Create application form" },
  { label: "Appointment Settings", description: "Configure bookings" },
  { label: "Review", description: "Confirm and create" }
];

export default function CreateServicePage() {
  const [state, setState] = useState<ServiceCreationState>({
    currentStep: 0,
    serviceDetails: {
      name: "",
      description: "",
      type: "single-location"
    },
    selectedBranches: [],
    formFields: [],
    appointmentSettingsByBranch: {},
    isLoading: false,
    errors: {}
  });

  const updateServiceDetails = (details: Partial<typeof state.serviceDetails>) => {
    setState(prev => ({
      ...prev,
      serviceDetails: { ...prev.serviceDetails, ...details },
      errors: { ...prev.errors, serviceDetails: "" }
    }));
  };

  const updateSelectedBranches = (branches: Location[]) => {
    setState(prev => ({
      ...prev,
      selectedBranches: branches,
      errors: { ...prev.errors, branches: "" }
    }));
  };

  const updateFormFields = (fields: FormField[]) => {
    setState(prev => ({
      ...prev,
      formFields: fields,
      errors: { ...prev.errors, formFields: "" }
    }));
  };

  const updateAppointmentSettings = (branchId: string, settings: AppointmentSettings) => {
    setState(prev => ({
      ...prev,
      appointmentSettingsByBranch: {
        ...prev.appointmentSettingsByBranch,
        [branchId]: settings
      }
    }));
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    }
  };

  const prevStep = () => {
    setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
  };

  const validateCurrentStep = (): boolean => {
    const errors: Record<string, string> = {};

    switch (state.currentStep) {
      case 0: // Service Details
        if (!state.serviceDetails.name.trim()) {
          errors.serviceDetails = "Service name is required";
        }
        break;
      case 1: // Branch Selection
        if (state.selectedBranches.length === 0) {
          errors.branches = "At least one branch must be selected";
        }
        break;
      case 2: // Form Fields
        if (state.formFields.length === 0) {
          errors.formFields = "At least one form field must be added";
        }
        break;
      case 3: // Appointment Settings
        const missingSettings = state.selectedBranches.filter(
          branch => !state.appointmentSettingsByBranch[branch.id]
        );
        if (missingSettings.length > 0) {
          errors.appointmentSettings = "Appointment settings required for all selected branches";
        }
        break;
    }

    setState(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleCreateService = async () => {
    if (!validateCurrentStep()) return;

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      // TODO: Implement API call to create service
      const serviceData = {
        name: state.serviceDetails.name,
        description: state.serviceDetails.description,
        type: state.serviceDetails.type,
        locationIds: state.selectedBranches.map(b => b.id),
        formFields: state.formFields,
        appointmentSettingsByLocation: state.appointmentSettingsByBranch
      };

      console.log("Creating service:", serviceData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Navigate to success page or service list
      alert("Service created successfully!");
      
    } catch (error) {
      console.error("Error creating service:", error);
      setState(prev => ({ 
        ...prev, 
        errors: { submit: "Failed to create service. Please try again." }
      }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 0:
        return (
          <ServiceDetailsStep
            serviceDetails={state.serviceDetails}
            onUpdate={updateServiceDetails}
            error={state.errors.serviceDetails}
          />
        );
      case 1:
        return (
          <BranchSelectionStep
            selectedBranches={state.selectedBranches}
            onUpdate={updateSelectedBranches}
            error={state.errors.branches}
          />
        );
      case 2:
        return (
          <FormBuilderStep
            formFields={state.formFields}
            onUpdate={updateFormFields}
            error={state.errors.formFields}
          />
        );
      case 3:
        return (
          <AppointmentSettingsStep
            selectedBranches={state.selectedBranches}
            appointmentSettings={state.appointmentSettingsByBranch}
            onUpdate={updateAppointmentSettings}
            error={state.errors.appointmentSettings}
          />
        );
      case 4:
        return (
          <ReviewStep
            serviceDetails={state.serviceDetails}
            selectedBranches={state.selectedBranches}
            formFields={state.formFields}
            appointmentSettings={state.appointmentSettingsByBranch}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background-50">
      <Header departmentName={userDepartmentName} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-900 mb-2">Create New Service</h1>
          <p className="text-text-500">Set up a new government service for citizens to access</p>
        </div>

        <Card className="mb-8" padding="lg">
          <Stepper steps={steps} currentStep={state.currentStep} />
        </Card>

        <Card padding="lg">
          {renderCurrentStep()}
          
          {state.errors.submit && (
            <div className="mt-4 p-4 bg-error-100 border border-error-500 rounded-md">
              <p className="text-error-500">{state.errors.submit}</p>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-border-200">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={state.currentStep === 0}
            >
              Previous
            </Button>

            {state.currentStep === steps.length - 1 ? (
              <Button
                onClick={handleCreateService}
                loading={state.isLoading}
                disabled={state.isLoading}
              >
                Create Service
              </Button>
            ) : (
              <Button onClick={nextStep}>
                Next
              </Button>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
