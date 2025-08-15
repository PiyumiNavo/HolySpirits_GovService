'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlurredDiv, ListItem } from "@myorg/ui";

export default function GovernmentDepartments() {
  const [nic, setNic] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login:", { nic, password });
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/img1.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <BlurredDiv>
            <div className="w-full space-y-6">
              <h1 className="text-xl font-bold text-center text-white text-center max-w-sm pt-4">
                Browse through Government Departments
              </h1>
              
              <div className="space-y-3">
                {[
                  {
                    id: "1",
                    text: "Ministry of Public Administration, Provincial Councils",
                    icon: (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.1 7 14 7.9 14 9S13.1 11 12 11 10 10.1 10 9 10.9 7 12 7M18 15C18 12.34 15.33 10.93 12 10.93S6 12.34 6 15V16H18V15Z"/>
                      </svg>
                    )
                  },
                  {
                    id: "2", 
                    text: "Ministry of Education",
                    icon: (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,3L1,9L12,15L21,11V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
                      </svg>
                    )
                  },
                  {
                    id: "3",
                    text: "Ministry of Health",
                    icon: (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    )
                  },
                  {
                    id: "4",
                    text: "Ministry of Health",
                    icon: (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    )
                  }
                ].map((department) => (
                  <ListItem
                    key={department.id}
                    icon={department.icon}
                    text={department.text}
                    onClick={() => console.log(`Clicked on ${department.text}`)}
                  />
                ))}
              </div>
              
              <div className="text-center py-4">
                {/* show more text with icon to down to view more items maximum it shows 3 items the rest from the button */}
              </div>
            </div>
          </BlurredDiv>
        </div>
      </div>
    </div>
  );
}
