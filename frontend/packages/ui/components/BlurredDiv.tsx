import React from "react";

export default function BlurredDiv({ children }: { children?: React.ReactNode }) {
  return (
    <div 
      className="w-full p-3 inline-flex flex-col items-center gap-5 fixed bottom-0"
      style={{
        background: 'rgba(192, 226, 236, 0.07)',
        borderTopLeftRadius: '50px',
        borderTopRightRadius: '50px',
        backdropFilter: 'blur(10px)',
        maxHeight: '55vh',
        height: 'auto'
      }}
    >
      {children}
    </div>
  );
}