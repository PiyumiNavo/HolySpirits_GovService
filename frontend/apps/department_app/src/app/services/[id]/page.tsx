"use client"

import { useState } from "react";
import {Button, DepartmentCard, Header, SearchBar, BlurredDiv} from "@myorg/ui";
import Image from "next/image"

const userDepartmentName = "Department of Motor Traffic (DMT)";
interface ServicePageProps {
  id: Number;
  title: string;
  description: string;
  imageUrl?: string;
}

export default function ServicePage({ 
    id,
    title = "Service",
    description,
    imageUrl="/../../../public/bicycles.jpg",
 }: ServicePageProps) {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen gap-8">
            <Header departmentName={userDepartmentName}></Header>
    
            <main className="flex flex-col w-full gap-[32px] row-start-2 items-start sm:items-start p-12">
                <h1>Department Admin View of Service</h1>

                <div className="w-full h-64 sm:h-96 relative mb-8">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </main>
    </div>
  );
}