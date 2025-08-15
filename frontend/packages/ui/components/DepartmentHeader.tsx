"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

interface HeaderProps {
  departmentName: string;
}

const navItems = [
  { path: '/', name: 'Home' },
  { path: '/services', name: 'Services' },
  { path: '/branches', name: 'Branches' }
];

export default function DepartmentHeader({ departmentName }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => 
    path === '/' ? pathname === path : pathname.startsWith(path);

  const navigateTo = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary-600 bg-primary-600 backdrop-blur-lg">
      <div className="relative container mx-auto flex h-16 items-center justify-between px-4 sm:px-4">
        {/* Left - Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push('/')} 
            className="flex items-center space-x-2">
            <svg
              className="h-4 w-4 text-primary-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 12H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => router.push('/')}
            className="text-sm font-medium text-white hover:text-primary-500 transition-colors max-w-[300px]"
          >
            {departmentName}
          </button>
        </div>

        {/* Center - Navigation (Desktop) */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigateTo(item.path)}
              className={`text-sm font-medium ${
              isActive(item.path) ? 'text-primary-500 underline' : 'text-white'
            } hover:text-primary-500 transition-colors`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Right - Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full text-white hover:bg-primary-500 hover:text-primary-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <button className="p-2 rounded-full text-white hover:bg-primary-500 hover:text-primary-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-full text-primary-500 hover:bg-primary-500 hover:text-primary-600 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-primary-600 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="flex flex-col px-2 p-4 space-y-4 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}className={`text-sm font-medium ${
              isActive(item.path) ? 'text-primary-500 underline' : 'text-white'
            } hover:text-primary-500 transition-colors`}
              onClick={toggleMenu}
            >
              {item.name}
            </Link>
          ))}
          
        </div>
      </div>
    </header>
  );
}