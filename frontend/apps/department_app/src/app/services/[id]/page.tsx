"use client"

import { useState } from "react";
import {Button, DepartmentCard, Header, SearchBar, BlurredDiv, BranchCard} from "@myorg/ui";
import Image from "next/image"

const userDepartmentName = "Department of Motor Traffic (DMT)";

const branches = [
  {
    id: 1,
    branchName: "Colombo Central",
    address: "234 Union Place, Colombo 02",
    counterCount: 8,
    mainAssignee: "Nimal Perera",
    assigneeCount: 15
  },
  {
    id: 2,
    branchName: "Kandy City",
    address: "120 Temple Road, Kandy",
    counterCount: 6,
    mainAssignee: "Samantha Silva",
    assigneeCount: 12
  },
  {
    id: 3,
    branchName: "Galle Main",
    address: "45 Lighthouse Street, Galle",
    counterCount: 5,
    mainAssignee: "Rajiv Fernando",
    assigneeCount: 10
  },
  {
    id: 4,
    branchName: "Jaffna Central",
    address: "78 Temple Road, Jaffna",
    counterCount: 4,
    mainAssignee: "Anjali Pathmanathan",
    assigneeCount: 8
  },
  {
    id: 5,
    branchName: "Negombo Branch",
    address: "112 Beach Road, Negombo",
    counterCount: 7,
    mainAssignee: "Dinesh Perera",
    assigneeCount: 14
  }
];
interface ServicePageProps {
  id: Number;
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

  const filteredBranches = branches.filter(branch =>
        branch.branchName.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                      className="absolute flex justify-content-between items-center bottom-0 bg-primary-500/70 left-0 right-0 p-6 backdrop-blur-md"
                    >
                      <h1 className="text-base sm:text-2xl font-semibold text-primary-600 w-full">{title}</h1>
                      <div className="w-2/5">
                        <Button>Expand to Another Branch</Button>
                      </div>
                    </div>
                </div>

                {/* Service Details */}
                {/* <div className="max-w-4xl w-full mx-auto">
                  <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-lg p-6 shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Service Details</h2>
                    <p className="text-gray-700">{description}</p>
                  </div>
                </div> */}

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
                        branchName={branch.branchName}
                        address={branch.address}
                        counterCount={branch.counterCount}
                        mainAssignee={branch.mainAssignee}
                        assigneeCount={branch.assigneeCount}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full text-center py-8">
                    <p className="text-text-700">No items found matching "{searchQuery}"</p>
                  </div>
                )}
                
            </main>
    </div>
  );
}