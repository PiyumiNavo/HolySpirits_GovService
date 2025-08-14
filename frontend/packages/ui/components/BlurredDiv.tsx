import React from "react";

export default function BlurredTopRoundedDiv({ children }: { children?: React.ReactNode }) {
  return (
    <div 
      className="w-full h-full p-3 inline-flex flex-col items-center gap-5"
      style={{
        background: 'rgba(192, 226, 236, 0.07)',
        borderRadius: '50px',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div 
        className="w-full h-full p-6 inline-flex flex-col items-center gap-5"
        style={{
          background: 'rgba(255, 255, 255, 1)',
          borderRadius: '50px',
        }}
      >
        {children}
      </div>
    </div>
  );
}