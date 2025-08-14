'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlurredDiv, Button } from "@myorg/ui";

export default function SigninPage() {
  const [nic, setNic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signin logic here
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signin:", { nic, password });
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
                Sign Up
              </h1>
              
              <form onSubmit={handleSignin} className="space-y-4">
                <div>
                  <label htmlFor="nic" className="block text-sm font-medium text-gray-700 mb-2">
                    NIC
                  </label>
                  <input
                    type="text"
                    id="nic"
                    value={nic}
                    onChange={(e) => setNic(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your NIC"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
                
                <div className="pt-4">
                  <Button>
                    Sign Up
                  </Button>
                </div>
              </form>
              
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                    Login
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
