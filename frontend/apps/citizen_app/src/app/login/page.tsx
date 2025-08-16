'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FormDiv, Button, InputField, Heading } from "@myorg/ui";

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
              <Heading 
                level={1}
                color="gray"
                size="2xl"
                align="center"
                className="mb-8"
              >
                Login
              </Heading>
              
              <form onSubmit={handleLogin} className="space-y-4" suppressHydrationWarning={true}>
                {[
                  {
                    id: "nic",
                    label: "NIC",
                    type: "text",
                    value: nic,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setNic(e.target.value),
                    placeholder: "Enter your NIC",
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
                    <Button>
                      Login
                    </Button>
                  </Link>
                </div>
              </form>
              
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                    Sign up
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
