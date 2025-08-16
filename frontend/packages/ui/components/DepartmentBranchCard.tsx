"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PencilIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon, PlusIcon } from "@heroicons/react/24/outline";

interface Assignee {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface Service {
  id: number;
  name: string;
  assignees: Assignee[];
}

interface DayHours {
  open: string;
  close: string;
}

interface DailyHours {
  [key: string]: DayHours;
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

interface BranchCardProps {
  id: number;
  branchName: string;
  address: string;
  services: Service[];
  hours: DailyHours;
  onRemove: (id: number) => void;
  onHoursUpdate: (id: number, hours: DailyHours) => void;
  onAddService: (id: number, service: Service) => void;
  availableServices: { id: number; name: string }[];
}

const daysOfWeek = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" }
];

export default function BranchCard({
  id,
  branchName = "Main Branch",
  address = "123 Government St, Colombo",
  services = [],
  hours,
  onRemove,
  onHoursUpdate,
  onAddService,
  availableServices
}: BranchCardProps) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [editingHours, setEditingHours] = useState(false);
  const [tempHours, setTempHours] = useState<DailyHours>(hours);
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState<{
    serviceId: string;
    assignees: Omit<Assignee, 'id'>[];
  }>({
    serviceId: "",
    assignees: [{ name: "", email: "", phone: "" }]
  });

  const handleServiceClick = (serviceId: number) => {
    router.push(`/services/${serviceId}`);
  };

  const handleHoursSave = () => {
    onHoursUpdate(id, tempHours);
    setEditingHours(false);
  };

  const formatHours = (day: string) => {
    const dayHours = hours[day as keyof DailyHours];
    return dayHours.open === "00:00" && dayHours.close === "00:00" 
      ? "Closed" 
      : `${dayHours.open} - ${dayHours.close}`;
  };

  const handleAddService = () => {
    const selectedService = availableServices.find(
      service => service.id === parseInt(newService.serviceId)
    );
    
    if (selectedService) {
      onAddService(id, {
        id: selectedService.id,
        name: selectedService.name,
        assignees: newService.assignees
          .filter(a => a.name && a.email)
          .map(a => ({
            ...a,
            id: Date.now() + Math.random()
          }))
      });
      setShowAddService(false);
      setNewService({
        serviceId: "",
        assignees: [{ name: "", email: "", phone: "" }]
      });
    }
  };

  const handleAddAssignee = () => {
    setNewService(prev => ({
      ...prev,
      assignees: [...prev.assignees, { name: "", email: "", phone: "" }]
    }));
  };

  const handleAssigneeChange = (index: number, field: keyof Assignee, value: string) => {
    const updatedAssignees = [...newService.assignees];
    updatedAssignees[index] = {
      ...updatedAssignees[index],
      [field]: value
    };
    setNewService({ ...newService, assignees: updatedAssignees });
  };

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md">
      {/* Card Header */}
      <div 
        className="flex justify-between items-center p-4 bg-primary-600 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <h2 className="text-sm sm:text-base font-semibold text-white">{branchName}</h2>
          <p className="text-xs text-primary-400">{address}</p>
        </div>
        <div className="text-white">
          {expanded ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </div>
      </div>
      
      {/* Collapsible Content */}
      {expanded && (
        <div className="p-4 space-y-4">
          {/* Branch Hours */}
          <div className="border-b pb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Operating Hours</h3>
              {editingHours ? (
                <div className="flex gap-2">
                  <button 
                    onClick={handleHoursSave}
                    className="text-xs bg-primary-600 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                  <button 
                    onClick={() => {
                      setEditingHours(false);
                      setTempHours(hours);
                    }}
                    className="text-xs bg-gray-200 px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setEditingHours(true)}
                  className="text-gray-500 hover:text-primary-600"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {editingHours ? (
              <div className="space-y-3">
                {daysOfWeek.map(day => (
                  <div key={day.key} className="grid grid-cols-3 items-center gap-2">
                    <label className="text-sm">{day.label}</label>
                    <input
                      type="time"
                      value={tempHours[day.key as keyof DailyHours].open}
                      onChange={(e) => setTempHours({
                        ...tempHours,
                        [day.key]: {
                          ...tempHours[day.key as keyof DailyHours],
                          open: e.target.value
                        }
                      })}
                      className="border rounded p-1 text-sm"
                    />
                    <input
                      type="time"
                      value={tempHours[day.key as keyof DailyHours].close}
                      onChange={(e) => setTempHours({
                        ...tempHours,
                        [day.key]: {
                          ...tempHours[day.key as keyof DailyHours],
                          close: e.target.value
                        }
                      })}
                      className="border rounded p-1 text-sm"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {daysOfWeek.map(day => (
                  <div key={day.key} className="flex justify-between text-sm">
                    <span>{day.label}</span>
                    <span>{formatHours(day.key)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Available Services */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Available Services</h3>
              <button
                onClick={() => setShowAddService(true)}
                className="text-primary-600 hover:text-primary-800 text-sm flex items-center gap-1"
              >
                <PlusIcon className="h-4 w-4" />
                Add Service
              </button>
            </div>
            {services.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceClick(service.id)}
                    className="p-2 border rounded bg-primary-500 hover:bg-primary-50 hover:border-primary-300 cursor-pointer transition-colors"
                  >
                    <p className="text-sm font-medium">{service.name}</p>
                    {service.assignees.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        {service.assignees.length} assignee{service.assignees.length !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No services available</p>
            )}
          </div>
          
          {/* Remove Button */}
          <div className="pt-4 border-t">
            <button
              onClick={() => onRemove(id)}
              className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
            >
              <TrashIcon className="h-4 w-4" />
              Remove Branch
            </button>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {showAddService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Service to {branchName}</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Service</label>
              <select
                value={newService.serviceId}
                onChange={(e) => setNewService({...newService, serviceId: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="">Select a service</option>
                {availableServices
                  .filter(service => !services.some(s => s.id === service.id))
                  .map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Assignees</label>
              {newService.assignees.map((assignee, index) => (
                <div key={index} className="mb-3 p-3 border rounded">
                  <div className="mb-2">
                    <label className="block text-xs text-gray-500 mb-1">Name</label>
                    <input
                      type="text"
                      value={assignee.name}
                      onChange={(e) => handleAssigneeChange(index, 'name', e.target.value)}
                      className="w-full p-2 border rounded text-sm"
                      placeholder="Full name"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-xs text-gray-500 mb-1">Email</label>
                    <input
                      type="email"
                      value={assignee.email}
                      onChange={(e) => handleAssigneeChange(index, 'email', e.target.value)}
                      className="w-full p-2 border rounded text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={assignee.phone}
                      onChange={(e) => handleAssigneeChange(index, 'phone', e.target.value)}
                      className="w-full p-2 border rounded text-sm"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={handleAddAssignee}
                className="text-sm text-primary-600 hover:text-primary-800"
              >
                + Add Another Assignee
              </button>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowAddService(false);
                  setNewService({
                    serviceId: "",
                    assignees: [{ name: "", email: "", phone: "" }]
                  });
                }}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddService}
                disabled={!newService.serviceId || !newService.assignees.some(a => a.name && a.email)}
                className="px-4 py-2 bg-primary-600 text-white rounded disabled:bg-gray-300"
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}