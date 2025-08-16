import React from 'react';

export default function SubmissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background-50">
      {children}
    </div>
  );
}
