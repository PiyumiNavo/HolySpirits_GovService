"use client";

import React from "react";

interface DropDownItem {
  label: string;
  icon: React.ReactNode;
  isLogout?: boolean;
  onClick?: () => void;
}

interface DropDownProps {
  items: DropDownItem[];
  isVisible: boolean;
  onClose: () => void;
}

export default function DropDown({ items, isVisible, onClose }: DropDownProps) {
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="dropdown-container absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
      {items.length === 0 ? (
        <div className="w-full flex items-center gap-3 px-4 py-3 text-gray-500">
          <div className="text-gray-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <span className="text-sm font-medium">No Notifications</span>
        </div>
      ) : (
        items.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              item.onClick?.();
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
              item.isLogout ? 'text-red-500' : 'text-gray-700'
            }`}
          >
            <div className={item.isLogout ? 'text-red-500' : 'text-gray-500'}>
              {item.icon}
            </div>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))
      )}
    </div>
  );
}
