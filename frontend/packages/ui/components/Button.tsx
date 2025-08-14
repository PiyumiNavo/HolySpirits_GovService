
import React from "react";

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="px-4 py-2 rounded-md bg-primary-500 text-white font-semibold hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 transition-colors duration-200"
    >
      {children}
    </button>
  );
}
