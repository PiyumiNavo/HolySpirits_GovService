
import React from "react";

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="
        px-4 py-4
        sm:px-6 sm:py-4
        md:px-8 md:py-4  
        text-sm sm:text-base
        rounded-4xl 
        bg-primary-600 
        text-primary-400 
        font-medium 
        hover:bg-primary-600 
        focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 
        transition-colors duration-200
        w-full"
    >
      {children}
    </button>
  );
}
