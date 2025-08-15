"use client"
import React, { ChangeEventHandler } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

export default function SearchBar({ 
  placeholder = "Search here...",
  onSearch
 }: SearchBarProps) {

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center bg-primary-400 rounded-full text-sm px-4 py-3 hover:bg-gray-200 focus-within:bg-gray-200 transition-colors duration-200">
        {/* Search Icon */}
        <svg 
            className="h-5 w-5 text-gray-500 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
        </svg>
        
        {/* Input Field */}
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleChange}
          className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-500 text-sm sm:text-sm"
        />
      </div>
      
      {/* Optional: Keyboard shortcut hint for larger screens */}
      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden md:flex items-center text-xs text-gray-400">
        <kbd className="ml-1 px-2 py-1 bg-gray-200 rounded-md">⌘K</kbd>
      </span>
    </div>
  );
}