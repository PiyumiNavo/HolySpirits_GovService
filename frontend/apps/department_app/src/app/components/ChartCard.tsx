"use client";

import React from "react";

interface ChartCardProps {
  title: string;
  subtitle: string;
  type: "line" | "donut";
}

// Service categories with their usage data
const serviceDistributionData = [
  { name: "License Renewal", value: 85, color: "rgb(7, 51, 72)", applications: 1245 },
  { name: "Vehicle Registration", value: 72, color: "rgb(192, 226, 236)", applications: 1056 },
  { name: "Ownership Transfer", value: 58, color: "rgb(66, 165, 245)", applications: 850 },
  { name: "Technical Inspection", value: 41, color: "rgb(129, 199, 132)", applications: 602 },
  { name: "Number Plate Service", value: 33, color: "rgb(255, 167, 38)", applications: 485 }
];

export default function ChartCard({ title, subtitle, type }: ChartCardProps) {
  return (
    <div className="bg-primary-500 rounded-[20px] p-4 sm:p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-primary-600 mb-1">{title}</h3>
        <p className="text-text-700 text-sm">{subtitle}</p>
      </div>
      
      <div className="h-48 sm:h-64 flex items-center justify-center bg-primary-400 rounded-[12px]">
        {type === "line" ? (
          <div className="w-full h-full flex items-end justify-center space-x-2 p-4">
            {/* Mock Line Chart Bars */}
            {[65, 80, 75, 90, 85, 95, 70].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-primary-600 rounded-t-sm transition-all duration-500 ease-in-out hover:bg-primary-600/80"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-text-700 mt-1">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full p-4">
            {/* Horizontal Bar Chart */}
            <div className="space-y-4 h-full flex flex-col justify-center">
              {serviceDistributionData.map((service, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-text-700">{service.name}</span>
                    <span className="text-xs text-text-500">{service.applications}</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-50 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${service.value}%`, 
                        backgroundColor: service.color 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
     
    </div>
  );
}
