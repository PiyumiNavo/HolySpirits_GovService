"use client";

import React from "react";

interface ActivityItem {
  id: number;
  type: "application" | "approval" | "rejection" | "update";
  title: string;
  user: string;
  time: string;
  status: "success" | "warning" | "error" | "info";
}

const recentActivities: ActivityItem[] = [
  {
    id: 1,
    type: "application",
    title: "New driver license application submitted",
    user: "Kasun Perera",
    time: "2 minutes ago",
    status: "info"
  },
  {
    id: 2,
    type: "approval",
    title: "Vehicle registration approved",
    user: "Nimali Silva",
    time: "15 minutes ago",
    status: "success"
  },
  {
    id: 3,
    type: "rejection",
    title: "License renewal rejected - missing documents",
    user: "Amal Fernando",
    time: "32 minutes ago",
    status: "error"
  },
  {
    id: 4,
    type: "update",
    title: "Application status updated",
    user: "Sunil Jayawardena",
    time: "1 hour ago",
    status: "warning"
  },
  {
    id: 5,
    type: "application",
    title: "Three wheeler registration submitted",
    user: "Chamari Dissanayake",
    time: "2 hours ago",
    status: "info"
  }
];

export default function RecentActivityCard() {
  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "application":
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6A2 2 0 004 4V20A2 2 0 006 22H18A2 2 0 0020 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case "approval":
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case "rejection":
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case "update":
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4V10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23 20V14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14L18.36 18.36A9 9 0 013.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusColor = (status: ActivityItem["status"]) => {
    switch (status) {
      case "success":
        return "text-success-500 bg-success-100";
      case "warning":
        return "text-warning-500 bg-warning-100";
      case "error":
        return "text-error-500 bg-error-100";
      case "info":
        return "text-primary-600 bg-primary-400";
      default:
        return "text-text-700 bg-background-50";
    }
  };

  return (
    <div className="bg-primary-500 rounded-[20px] p-4 sm:p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-primary-600 mb-1">Recent Activity</h3>
        <p className="text-text-700 text-sm">Latest updates and actions in your department</p>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-[12px] bg-primary-400 hover:bg-white transition-colors duration-200">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(activity.status)}`}>
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary-600 mb-1">
                {activity.title}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-text-700">by {activity.user}</p>
                <span className="text-xs text-text-500">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-primary-400">
        <button className="text-sm text-primary-600 hover:text-primary-600 hover:underline font-medium transition-colors duration-200">
          View all activities →
        </button>
      </div>
    </div>
  );
}
