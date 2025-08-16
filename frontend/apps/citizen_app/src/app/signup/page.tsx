'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FormDiv, Button, InputField } from "@myorg/ui";

export default function SigninPage() {
  const [nic, setNic] = useState("");
  const [nicImage, setNicImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signin logic here
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signup:", { nic, nicImage, password });
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
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <FormDiv>
            <div className="w-full space-y-6">
              <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
                Sign Up
              </h1>
              
              <form onSubmit={handleSignin} className="space-y-4" suppressHydrationWarning={true}>
                {[
                  {
                    id: "nic",
                    label: "NIC number",
                    type: "text",
                    value: nic,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setNic(e.target.value),
                    placeholder: "Enter your NIC number",
                    required: true
                  },
                  {
                    id: "nicImage",
                    label: "Image of NIC",
                    type: "file",
                    value: nicImage,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setNicImage(e.target.value),
                    placeholder: "Upload your NIC image",
                    required: true
                  },
                  {
                    id: "password",
                    label: "Password",
                    type: "password",
                    value: password,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
                    placeholder: "Enter your password",
                    required: true
                  },
                  {
                    id: "confirmPassword",
                    label: "Confirm Password",
                    type: "password",
                    value: confirmPassword,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value),
                    placeholder: "Confirm your password",
                    required: true
                  }
                ].map((field) => (
                  <InputField
                    key={field.id}
                    id={field.id}
                    label={field.label}
                    type={field.type}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                ))}
                
                <div className="pt-4">
                  <Link href="/government-departments" passHref>
                    <Button className="w-full">
                      Sign Up
                    </Button>
                  </Link>
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
          </FormDiv>
        </div>
      </div>
    </div>
  );
}
