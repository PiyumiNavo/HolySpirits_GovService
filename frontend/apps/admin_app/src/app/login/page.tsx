// src/app/admin/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { InputField, Button, Card } from "@myorg/ui";
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function AdminLoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    form: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      form: "",
    };
    let isValid = true;

    if (!credentials.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!credentials.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (credentials.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    router.push("/departments");
    
    // try {
    //   const response = await fetch("/api/admin/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(credentials),
    //   });

    //   if (response.ok) {
    //     router.push("/departments");
    //   } else {
    //     const errorData = await response.json();
    //     setErrors(prev => ({
    //       ...prev,
    //       form: errorData.message || "Login failed. Please try again.",
    //     }));
    //   }
    // } catch (error) {
    //   setErrors(prev => ({
    //     ...prev,
    //     form: "Network error. Please try again.",
    //   }));
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-50 p-4">
      <Card padding="lg" shadow="md" className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text-900 mb-2">
            Admin Portal
          </h1>
          <p className="text-text-500">
            Sign in to access the administration dashboard
          </p>
        </div>

        {errors.form && (
          <div className="mb-4 p-3 bg-error-100 text-error-500 rounded-md text-sm">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-2 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="admin@example.com"
                  required
                  // error={errors.email}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-full relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
            </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-6"
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Card>
    </div>
  );
}