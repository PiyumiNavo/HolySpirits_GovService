// src/components/DepartmentFormSection.tsx
"use client";
import React from "react";

interface DepartmentFormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function DepartmentFormSection({
  title,
  children,
  className = "",
}: DepartmentFormSectionProps) {
  return (
    <div className={className}>
      <h2 className="text-lg font-semibold text-text-700 border-b border-border-200 pb-2 mb-4">
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}