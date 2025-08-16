"use client"

import { useState } from "react";
import { DepartmentBranchCard, Header, SearchBar, Button } from "@myorg/ui";

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

interface Branch {
  id: number;
  branchName: string;
  address: string;
  services: Service[];
  hours: {
    monday: DayHours;
    tuesday: DayHours;
    wednesday: DayHours;
    thursday: DayHours;
    friday: DayHours;
    saturday: DayHours;
    sunday: DayHours;
  };
}

const allAvailableServices = [
  { id: 1, name: "Driver's License Renewal" },
  { id: 2, name: "Vehicle Registration" },
  { id: 3, name: "International Driving Permit" },
  { id: 4, name: "Number Plate Issuance" },
  { id: 5, name: "Learner's Permit Test" },
  { id: 6, name: "Vehicle Transfer" },
  { id: 7, name: "Revenue License Renewal" },
  { id: 8, name: "Vehicle Fitness Test" },
  { id: 9, name: "Heavy Vehicle License" },
  { id: 10, name: "Temporary Permits" },
  { id: 11, name: "Special Number Plates" },
  { id: 12, name: "Duplicate Documents" }
];

const initialBranches: Branch[] = [
  {
    id: 1,
    branchName: "Colombo Main Branch",
    address: "Department of Motor Traffic, 234 Union Place, Colombo 02",
    services: [
      {
        id: 1,
        name: "Driver's License Renewal",
        assignees: [
          { id: 101, name: "Nimal Perera", email: "nimal@dmt.gov.lk", phone: "0771234567" },
          { id: 102, name: "Samantha Silva", email: "samantha@dmt.gov.lk", phone: "0717654321" }
        ]
      },
      {
        id: 2,
        name: "Vehicle Registration",
        assignees: [
          { id: 103, name: "Rajiv Fernando", email: "rajiv@dmt.gov.lk", phone: "0765432198" }
        ]
      }
    ],
    hours: {
      monday: { open: "08:00", close: "16:30" },
      tuesday: { open: "08:00", close: "16:30" },
      wednesday: { open: "08:00", close: "16:30" },
      thursday: { open: "08:00", close: "16:30" },
      friday: { open: "08:00", close: "16:00" },
      saturday: { open: "08:30", close: "13:00" },
      sunday: { open: "00:00", close: "00:00" }
    }
  },
  {
    id: 2,
    branchName: "Kandy Regional Branch",
    address: "DMT Office, 120 Temple Road, Kandy",
    services: [
      {
        id: 1,
        name: "Driver's License Renewal",
        assignees: [
          { id: 201, name: "Kamal Gamage", email: "kamal@dmt.gov.lk", phone: "0723456789" }
        ]
      },
      {
        id: 5,
        name: "Learner's Permit Test",
        assignees: [
          { id: 202, name: "Nayana Rathnayake", email: "nayana@dmt.gov.lk", phone: "0756789123" }
        ]
      }
    ],
    hours: {
      monday: { open: "08:30", close: "17:00" },
      tuesday: { open: "08:30", close: "17:00" },
      wednesday: { open: "08:30", close: "17:00" },
      thursday: { open: "08:30", close: "17:00" },
      friday: { open: "08:30", close: "16:30" },
      saturday: { open: "09:00", close: "13:30" },
      sunday: { open: "00:00", close: "00:00" }
    }
  },
  {
    id: 3,
    branchName: "Galle Southern Branch",
    address: "DMT Office, 45 Lighthouse Street, Galle Fort",
    services: [
      {
        id: 2,
        name: "Vehicle Registration",
        assignees: [
          { id: 301, name: "Sunil Jayasuriya", email: "sunil@dmt.gov.lk", phone: "0789123456" }
        ]
      },
      {
        id: 7,
        name: "Revenue License Renewal",
        assignees: [
          { id: 302, name: "Priyanka Bandara", email: "priyanka@dmt.gov.lk", phone: "0745678912" }
        ]
      }
    ],
    hours: {
      monday: { open: "09:00", close: "15:30" },
      tuesday: { open: "09:00", close: "15:30" },
      wednesday: { open: "09:00", close: "15:30" },
      thursday: { open: "09:00", close: "15:30" },
      friday: { open: "09:00", close: "15:00" },
      saturday: { open: "09:00", close: "12:00" },
      sunday: { open: "00:00", close: "00:00" }
    }
  },
  {
    id: 4,
    branchName: "Jaffna Northern Branch",
    address: "DMT Office, 78 Temple Road, Jaffna",
    services: [
      {
        id: 1,
        name: "Driver's License Renewal",
        assignees: [
          { id: 401, name: "Arun Vadivel", email: "arun@dmt.gov.lk", phone: "0212223344" }
        ]
      },
      {
        id: 9,
        name: "Heavy Vehicle License",
        assignees: [
          { id: 402, name: "Karthik Sivan", email: "karthik@dmt.gov.lk", phone: "0212233445" }
        ]
      }
    ],
    hours: {
      monday: { open: "08:00", close: "15:00" },
      tuesday: { open: "08:00", close: "15:00" },
      wednesday: { open: "08:00", close: "15:00" },
      thursday: { open: "08:00", close: "15:00" },
      friday: { open: "08:00", close: "14:30" },
      saturday: { open: "08:00", close: "12:00" },
      sunday: { open: "00:00", close: "00:00" }
    }
  },
  {
    id: 5,
    branchName: "Kurunegala Central Branch",
    address: "DMT Office, 123 Kandy Road, Kurunegala",
    services: [
      {
        id: 3,
        name: "International Driving Permit",
        assignees: [
          { id: 501, name: "Asanka Weerasinghe", email: "asanka@dmt.gov.lk", phone: "0372298765" }
        ]
      },
      {
        id: 11,
        name: "Special Number Plates",
        assignees: [
          { id: 502, name: "Dilani Perera", email: "dilani@dmt.gov.lk", phone: "0372298766" }
        ]
      }
    ],
    hours: {
      monday: { open: "08:00", close: "16:00" },
      tuesday: { open: "08:00", close: "16:00" },
      wednesday: { open: "08:00", close: "16:00" },
      thursday: { open: "08:00", close: "16:00" },
      friday: { open: "08:00", close: "15:30" },
      saturday: { open: "08:30", close: "12:30" },
      sunday: { open: "00:00", close: "00:00" }
    }
  }
];

export default function DepartmentBranches() {
  const [searchQuery, setSearchQuery] = useState("");
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [currentBranchId, setCurrentBranchId] = useState<number | null>(null);
  const [newService, setNewService] = useState({
    serviceId: "",
    assignees: [{ name: "", email: "", phone: "" }]
  });

  const filteredBranches = branches.filter(branch =>
    branch.branchName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveBranch = (id: number) => {
    if (confirm("Are you sure you want to remove this branch?")) {
      setBranches(branches.filter(branch => branch.id !== id));
    }
  };

  const handleHoursUpdate = (id: number, updatedHours: Branch['hours']) => {
    setBranches(branches.map(branch => 
      branch.id === id ? { ...branch, hours: updatedHours } : branch
    ));
  };

  const handleAddBranch = () => {
    const newId = Math.max(...branches.map(b => b.id), 0) + 1;
    const newBranch: Branch = {
      id: newId,
      branchName: "New Branch",
      address: "Enter address",
      services: [],
      hours: {
        monday: { open: "08:00", close: "16:30" },
        tuesday: { open: "08:00", close: "16:30" },
        wednesday: { open: "08:00", close: "16:30" },
        thursday: { open: "08:00", close: "16:30" },
        friday: { open: "08:00", close: "16:00" },
        saturday: { open: "08:30", close: "13:00" },
        sunday: { open: "00:00", close: "00:00" }
      }
    };
    setBranches([...branches, newBranch]);
  };

  const handleAddServiceClick = (branchId: number) => {
    setCurrentBranchId(branchId);
    setShowServiceModal(true);
  };

  const handleRemoveService = (branchId: number, serviceId: number) => {
    setBranches(prevBranches => 
      prevBranches.map(branch => 
        branch.id === branchId
          ? { 
              ...branch, 
              services: branch.services.filter(service => service.id !== serviceId) 
            }
          : branch
      )
    );
  };

  const handleServiceSubmit = () => {
    if (!currentBranchId || !newService.serviceId) return;

    const selectedService = allAvailableServices.find(
      s => s.id === parseInt(newService.serviceId)
    );

    if (!selectedService) return;

    const newServiceWithAssignees: Service = {
      id: selectedService.id,
      name: selectedService.name,
      assignees: newService.assignees
        .filter(a => a.name && a.email)
        .map(a => ({
          ...a,
          id: Date.now() + Math.random()
        }))
    };

    setBranches(branches.map(branch => 
      branch.id === currentBranchId
        ? {
            ...branch,
            services: [...branch.services, newServiceWithAssignees]
          }
        : branch
    ));

    setShowServiceModal(false);
    setNewService({
      serviceId: "",
      assignees: [{ name: "", email: "", phone: "" }]
    });
  };

  const handleAddAssignee = () => {
    setNewService(prev => ({
      ...prev,
      assignees: [...prev.assignees, { name: "", email: "", phone: "" }]
    }));
  };

  const handleAssigneeChange = (index: number, field: string, value: string) => {
    const updatedAssignees = [...newService.assignees];
    updatedAssignees[index] = {
      ...updatedAssignees[index],
      [field]: value
    };
    setNewService({ ...newService, assignees: updatedAssignees });
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen gap-8">
      <Header departmentName="Department of Motor Traffic (DMT)" />

      <main className="flex flex-col w-full gap-[32px] row-start-2 items-start sm:items-start p-12">
        <div className="flex justify-between items-center space-x-4 w-full">
          <SearchBar 
            placeholder="Search for branches..."
            onSearch={setSearchQuery}
          />
          <div className="w-full" onClick={handleAddBranch}>
            <Button>
              Add New Branch
            </Button>
          </div>
            
        </div>

        {filteredBranches.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 w-full">
            {filteredBranches.map((branch) => (
              <DepartmentBranchCard
                key={branch.id}
                id={branch.id}
                branchName={branch.branchName}
                address={branch.address}
                services={branch.services}
                hours={branch.hours}
                onRemove={handleRemoveBranch}
                onHoursUpdate={handleHoursUpdate}
                onAddService={() => handleAddServiceClick(branch.id)}
                onRemoveService={(branchId, serviceId) => handleRemoveService(branchId, serviceId)}
                availableServices={allAvailableServices.filter(service => 
                  !branch.services.some(s => s.id === service.id)
                )}
              />
            ))}
          </div>
        ) : (
          <div className="w-full text-center py-8">
            <p className="text-text-700">
              {searchQuery 
                ? `No branches found matching "${searchQuery}"`
                : "No branches available"}
            </p>
          </div>
        )}

        {/* Add Service Modal */}
        {showServiceModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New Service</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Service</label>
                <select
                  value={newService.serviceId}
                  onChange={(e) => setNewService({...newService, serviceId: e.target.value})}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select a service</option>
                  {allAvailableServices
                    .filter(service => 
                      !branches.find(b => b.id === currentBranchId)?.services.some(s => s.id === service.id)
                    )
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
                    setShowServiceModal(false);
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
                  onClick={handleServiceSubmit}
                  disabled={!newService.serviceId || !newService.assignees.some(a => a.name && a.email)}
                  className="px-4 py-2 bg-primary-600 text-white rounded disabled:bg-gray-300"
                >
                  Add Service
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}