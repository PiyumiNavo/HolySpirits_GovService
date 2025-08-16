"use client"

import { useState } from "react";
import {Button, DepartmentCard, Header, SearchBar, BlurredDiv, BranchCard} from "@myorg/ui";
import Image from "next/image"

const userDepartmentName = "Department of Motor Traffic (DMT)";

interface Assignee {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface Branch {
  id: number;
  branchName: string;
  address: string;
  counterCount: number;
  mainAssignee: string;
  assigneeCount: number;
  assignees: Assignee[];
}

const initbranches = [
  {
    id: 1,
    branchName: "Colombo Central",
    address: "234 Union Place, Colombo 02",
    counterCount: 8,
    mainAssignee: "Nimal Perera",
    assigneeCount: 15,
    assignees: [
      { id: 1, name: "Nimal Perera", email: "nimal@dmt.gov.lk", phone: "0771234567" },
      { id: 2, name: "Samantha Silva", email: "samantha@dmt.gov.lk", phone: "0717654321" }
    ]
  },
  {
    id: 2,
    branchName: "Kandy City",
    address: "120 Temple Road, Kandy",
    counterCount: 6,
    mainAssignee: "Samantha Silva",
    assigneeCount: 12,
    assignees: [
      { id: 1, name: "Samantha Silva", email: "samantha@dmt.gov.lk", phone: "0717654321" },
      { id: 2, name: "Rajiv Fernando", email: "rajiv@dmt.gov.lk", phone: "0765432198" }
    ]
  },
  {
    id: 3,
    branchName: "Galle Main",
    address: "45 Lighthouse Street, Galle",
    counterCount: 5,
    mainAssignee: "Rajiv Fernando",
    assigneeCount: 10,
    assignees: [
      { id: 1, name: "Nimal Perera", email: "nimal@dmt.gov.lk", phone: "0771234567" },
      { id: 2, name: "Samantha Silva", email: "samantha@dmt.gov.lk", phone: "0717654321" }
    ]
  },
  {
    id: 4,
    branchName: "Jaffna Central",
    address: "78 Temple Road, Jaffna",
    counterCount: 4,
    mainAssignee: "Anjali Pathmanathan",
    assigneeCount: 8,
    assignees: [
      { id: 1, name: "Samantha Silva", email: "samantha@dmt.gov.lk", phone: "0717654321" },
      { id: 2, name: "Rajiv Fernando", email: "rajiv@dmt.gov.lk", phone: "0765432198" }
    ]
  },
  {
    id: 5,
    branchName: "Negombo Branch",
    address: "112 Beach Road, Negombo",
    counterCount: 7,
    mainAssignee: "Dinesh Perera",
    assigneeCount: 14,
    assignees: [
      { id: 1, name: "Nimal Perera", email: "nimal@dmt.gov.lk", phone: "0771234567" },
      { id: 2, name: "Samantha Silva", email: "samantha@dmt.gov.lk", phone: "0717654321" }
    ]
  }
];
interface ServicePageProps {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
}

export default function ServicePage({ 
    id,
    title = "Registration of Motor Bikes",
    description,
    imageUrl="/bicycle.jpg",
 }: ServicePageProps) {

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [isAddingAssignee, setIsAddingAssignee] = useState(false);
  const [newAssignee, setNewAssignee] = useState<Omit<Assignee, 'id'>>({ 
    name: "", 
    email: "", 
    phone: "" 
  });
  
  const filteredBranches = initbranches.filter(branch =>
      branch.branchName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBranchClick = (branchId: number) => {
    const branch = initbranches.find(b => b.id === branchId);
    setSelectedBranch(branch ?? null);
  };

  const handleAddAssignee = () => {
    if (newAssignee.name && newAssignee.email && selectedBranch) {
      const newAssigneeWithId = {
        ...newAssignee,
        id: Date.now()
      };

      const updatedBranch = {
        ...selectedBranch,
        assignees: [...selectedBranch.assignees, newAssigneeWithId]
      };
      setSelectedBranch(updatedBranch);
      setNewAssignee({ name: "", email: "", phone: "" });
      setIsAddingAssignee(false);
    }
  };

  const removeAssignee = (assigneeId: number) => {
    if (!selectedBranch) {
      return; 
    }
    const updatedBranch = {
      ...selectedBranch,
      assignees: selectedBranch.assignees.filter(a => a.id !== assigneeId)
    };
    setSelectedBranch(updatedBranch);
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen gap-8">
            <Header departmentName={userDepartmentName}></Header>
    
            <main className="flex flex-col w-full gap-[32px] row-start-2 items-start sm:items-start p-12">
              
                <div className="w-full h-64 sm:h-72 relative rounded-lg overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      className="object-cover"
                      priority
                    />
                    
                    <div 
                      className="absolute flex justify-between items-center bottom-0 bg-primary-500/70 left-0 right-0 p-6 backdrop-blur-md"
                    >
                      <h1 className="text-base sm:text-2xl font-semibold text-primary-600 w-full">{title}</h1>
                      <div className="w-2/5">
                        <Button>Expand to Another Branch</Button>
                      </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <SearchBar 
                      placeholder="Search for branches..."
                      onSearch={setSearchQuery}
                  >
                  </SearchBar>
                </div>

                {filteredBranches.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {filteredBranches.map((branch) => (
                      <BranchCard
                        key={branch.id}
                        id={branch.id}
                        branchName={branch.branchName}
                        address={branch.address}
                        counterCount={branch.counterCount}
                        assigneeCount={branch.assigneeCount}
                        onClick={handleBranchClick}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full text-center py-8">
                    <p className="text-text-700">No items found matching "{searchQuery}"</p>
                  </div>
                )}
                
            </main>

            {/* Branch Details Modal */}
            {selectedBranch && (
              <div className="fixed inset-0 bg-white/40 flex items-center justify-center z-50 p-4 backdrop-blur-xl">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  {/* Modal Header */}
                  <div className="bg-primary-600 p-4 sticky top-0 z-10">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-white">{selectedBranch.branchName}</h2>
                      <button 
                        onClick={() => {
                          setSelectedBranch(null);
                          setIsAddingAssignee(false);
                        }}
                        className="text-white hover:text-gray-200"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* Modal Content */}
                  <div className="p-6">
                    {/* Branch Info */}
                    <div className="mb-8">
                      <div className="flex items-center mb-4">
                        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-gray-600">{selectedBranch.address}</p>
                      </div>

                      <div className="flex gap-8 mb-4">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <span className="font-medium">{selectedBranch.counterCount} Counters</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          <span className="font-medium">{selectedBranch.assignees.length} Assignees</span>
                        </div>
                      </div>
                    </div>

                    {/* Assignees Section */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Assignees</h3>
                        <div onClick={() => setIsAddingAssignee(true)}>
                          <Button >
                            Add New Assignee
                          </Button>
                        </div>
                        
                      </div>

                      {/* Add Assignee Form */}
                      {isAddingAssignee && (
                        <div className="bg-primary-400 p-4 rounded-lg mb-6">
                          <h4 className="font-medium mb-3">New Assignee Details</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <input
                              type="text"
                              placeholder="Full Name"
                              className="p-2 border rounded w-full"
                              value={newAssignee.name}
                              onChange={(e) => setNewAssignee({...newAssignee, name: e.target.value})}
                            />
                            <input
                              type="email"
                              placeholder="Email"
                              className="p-2 border rounded w-full"
                              value={newAssignee.email}
                              onChange={(e) => setNewAssignee({...newAssignee, email: e.target.value})}
                            />
                            <input
                              type="tel"
                              placeholder="Phone Number"
                              className="p-2 border rounded w-full"
                              value={newAssignee.phone}
                              onChange={(e) => setNewAssignee({...newAssignee, phone: e.target.value})}
                            />
                          </div>
                          <div className="flex gap-4 items-center justify-end w-full">
                            <div 
                              className="font-text-500"
                              onClick={() => {
                                  setIsAddingAssignee(false);
                                  setNewAssignee({ name: "", email: "", phone: "" });
                                }}
                            >
                              <button>
                                Cancel
                              </button>
                            </div>
                            <div onClick={handleAddAssignee}>
                              <Button>Save</Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Assignees List */}
                      <div className="space-y-3">
                        {selectedBranch.assignees.map((assignee) => (
                          <div key={assignee.id} className="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{assignee.name}</p>
                              <p className="text-sm text-gray-600">{assignee.email}</p>
                              <p className="text-sm text-gray-600">{assignee.phone}</p>
                            </div>
                            <button
                              onClick={() => removeAssignee(assignee.id)}
                              className="text-red-600 hover:text-red-800 p-2"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
    </div>
  );
}