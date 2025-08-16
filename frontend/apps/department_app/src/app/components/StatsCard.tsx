"use client";

import React from "react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  icon: React.ReactNode;
}

export default function StatsCard({ title, value, change, trend, icon }: StatsCardProps) {
  return (
    <div className="bg-primary-500 rounded-[20px] p-4 sm:p-6 hover:bg-primary-400 transition-colors duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-text-700 text-sm font-medium mb-1">{title}</h3>
          <p className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">{value}</p>
          {change && trend && (
            <div className="flex items-center">
              <span className={`text-sm font-medium flex items-center ${
                trend === "up" ? "text-success-500" : "text-error-500"
              }`}>
                {trend === "up" ? (
                  <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {change}
              </span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary-600">
          <div className="text-white">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}
