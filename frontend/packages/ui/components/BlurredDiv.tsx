import React from "react";

export default function BlurredTopRoundedDiv({ children }: { children?: React.ReactNode }) {
  return (
    <div 
      className="w-full h-full pt-[38px] px-6 inline-flex flex-col items-center gap-5"
      style={{
        background: 'rgba(192, 226, 236, 0.20)',
        borderTopLeftRadius: '100px',
        borderTopRightRadius: '100px',
        backdropFilter: 'blur(50px)'
      }}
    >
      {children}
    </div>
  );
}