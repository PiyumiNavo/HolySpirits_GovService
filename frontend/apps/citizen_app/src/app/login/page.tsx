'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlurredDiv, Button, InputFields } from "@myorg/ui";

export default function LoginPage() {
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
          src="/img1.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <BlurredDiv>
            <div className="w-full space-y-6">
              <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
                Login
              </h1>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <InputFields
                  fields={[
                    {
                      id: "nic",
                      label: "NIC",
                      type: "text",
                      value: nic,
                      onChange: (e) => setNic(e.target.value),
                      placeholder: "Enter your NIC",
                      required: true
                    },
                    {
                      id: "password",
                      label: "Password",
                      type: "password",
                      value: password,
                      onChange: (e) => setPassword(e.target.value),
                      placeholder: "Enter your password",
                      required: true
                    }
                  ]}
                />
                
                <div className="pt-4">
                  <Button>
                    Login
                  </Button>
                </div>
              </form>
              
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/signin" className="text-blue-600 hover:text-blue-800 font-medium">
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
