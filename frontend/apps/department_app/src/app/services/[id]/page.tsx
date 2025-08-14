// app/services/[id]/page.tsx
import React from 'react';

interface ServicePageProps {
  id: Number;
  title: string;
  description: string;
}

export default function ServicePage({ 
    id,
    title = "Service",
    description,
 }: ServicePageProps) {
  // In a real app, you would fetch service data based on params.id
  // For now, we'll just display the ID
  return (
    <div className="p-8">
      <h1>Department Admin View of Service</h1>
    </div>
  );
}