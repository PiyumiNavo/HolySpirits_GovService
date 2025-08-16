"use client"

import { useState } from "react";
import { Button, DepartmentCard, Header, SearchBar, BlurredDiv } from "@myorg/ui";
import StatsCard from "./components/StatsCard";
import ChartCard from "./components/ChartCard";
import { CheckCircle, AlertCircle, TrendingUp, Clock, UserX, Calendar, Monitor, Settings } from 'lucide-react';

const userDepartmentName = "Department of Motor Traffic";

const statsData = [
  {
    title: "Total Appointments",
    value: "156",
    change: "+12%",
    icon: <CheckCircle className="h-6 w-6 text-success-500" />
  },
  {
    title: "Pending Applications",
    value: "23",
    change: "-5%",
    icon: <AlertCircle className="h-6 w-6 text-warning-500" />
  },
  {
    title: "Completed Services",
    value: "89",
    change: "+18%",
    icon: <TrendingUp className="h-6 w-6 text-white" />
  },
  {
    title: "Average Wait Time",
    value: "15 mins",
    change: "-8%",
    icon: <Clock className="h-6 w-6 text-secondary-500" />
  },
  {
    title: "No Show Rate",
    value: "12.4%",
    icon: <UserX className="h-6 w-6 text-error-500" />
  },
  {
    title: "Peak Booking Hours",
    value: "10AM-2PM",
    icon: <Calendar className="h-6 w-6 text-secondary-500" />
  },
  {
    title: "Counters Open",
    value: "6/8",
    icon: <Monitor className="h-6 w-6 text-primary-500" />
  },
  {
    title: "Services Available",
    value: "12",
    icon: <Settings className="h-6 w-6 text-success-500" />
  }
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen gap-8">
      <Header departmentName={userDepartmentName} />

      <main className="flex flex-col w-full gap-[32px] row-start-2 items-start sm:items-start p-4 sm:p-6 lg:p-12">
        
        {/* Welcome Section */}
        <div className="w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">
            Department Analytics
          </h1>
          <p className="text-text-700 text-sm sm:text-base">
            Welcome to {userDepartmentName} management dashboard
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="w-full">
          <h2 className="text-xl font-semibold text-primary-600 mb-4">Key Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {statsData.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-primary-600">Analytics Overview</h2>
            <Button>Generate Report</Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="Application Trends"
              subtitle="Weekly application processing overview"
              type="line"
            />
            <ChartCard
              title="Service Distribution"
              subtitle="Most popular services this month"
              type="donut"
            />
          </div>
        </div>

      </main>
    </div>
  );
}
