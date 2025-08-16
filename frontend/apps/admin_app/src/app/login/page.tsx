// src/app/admin/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { InputField, Button, Card } from "@myorg/ui";
import { useAuth } from "../../hooks/useAuth";
import type { ApiError } from "../../types/api.types";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isLoading: authLoading } = useAuth();
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
    
    try {
      await login(credentials.email, credentials.password);
      // Successful login will be handled by the auth context
      router.push("/departments");
    } catch (error) {
      const apiError = error as ApiError;
      setErrors(prev => ({
        ...prev,
        form: apiError.message || "Login failed. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
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
          <InputField
            id="email"
            label="Email Address"
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="admin@example.com"
            required
            error={errors.email}
          />

          <InputField
            id="password"
            label="Password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            error={errors.password}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-6"
            loading={isLoading || authLoading}
            disabled={isLoading || authLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Card>
    </div>
  );
}