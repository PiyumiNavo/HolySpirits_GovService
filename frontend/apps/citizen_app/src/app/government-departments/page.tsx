'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlurredDiv, ListItem } from "@myorg/ui";
// import { School } from "@mui/icons-material"; 

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
                        <path d="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M17,11.5L16,11L13,14L11,12L7.5,15.5L16.5,15.5L17,11.5M20.5,4C21.3,4 22,4.7 22,5.5V18.5C22,19.3 21.3,20 20.5,20H3.5C2.7,20 2,19.3 2,18.5V5.5C2,4.7 2.7,4 3.5,4H20.5Z"/>
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
              
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </BlurredDiv>
        </div>
      </div>
    </div>
  );
}
