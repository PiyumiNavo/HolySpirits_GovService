"use client";

import { useState, useEffect } from "react";
import { Button } from "@myorg/ui";
import { useParams } from "next/navigation";
import { Types } from "mongoose";

// Define the Location (Branch) type for form input
interface Location {
  name: string;
  address: string;
  departmentId: string;
  geoCoordinates: {
    lat: number;
    lng: number;
  };
  workingHours: Array<{
    day: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
    openingTime: string;
    closingTime: string;
    isClosed: boolean;
  }>;
  capacity: number;
}

// Define the working hours fields for type safety
type WorkingHourFields = "openingTime" | "closingTime" | "isClosed";

export default function AddBranchPage() {
  const params = useParams();
  const { id: departmentId } = params;

  const [formData, setFormData] = useState<Location>({
    name: "",
    address: "",
    departmentId: departmentId as string,
    geoCoordinates: { lat: 0, lng: 0 },
    workingHours: [
      { day: "mon", openingTime: "", closingTime: "", isClosed: false },
      { day: "tue", openingTime: "", closingTime: "", isClosed: false },
      { day: "wed", openingTime: "", closingTime: "", isClosed: false },
      { day: "thu", openingTime: "", closingTime: "", isClosed: false },
      { day: "fri", openingTime: "", closingTime: "", isClosed: false },
      { day: "sat", openingTime: "", closingTime: "", isClosed: false },
      { day: "sun", openingTime: "", closingTime: "", isClosed: false },
    ],
    capacity: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, departmentId: departmentId as string }));
  }, [departmentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement | HTMLSelectElement;

    if (name.startsWith("geoCoordinates.")) {
      const field = name.split(".")[1] as "lat" | "lng";
      setFormData((prev) => ({
        ...prev,
        geoCoordinates: { ...prev.geoCoordinates, [field]: Number(value) || 0 },
      }));
    } else if (name.startsWith("workingHours[")) {
      const [_, index, field] = name.match(/workingHours\[(\d+)\]\.(.+)/) || [];
      const idx = parseInt(index);
      if (field && ["openingTime", "closingTime", "isClosed"].includes(field)) {
        const newWorkingHours = [...formData.workingHours];
        newWorkingHours[idx] = {
          ...newWorkingHours[idx],
          [field as WorkingHourFields]: type === "checkbox" ? (target as HTMLInputElement).checked : value,
        };
        setFormData((prev) => ({ ...prev, workingHours: newWorkingHours }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: name === "capacity" ? Number(value) || 0 : value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      console.log("New Branch Data:", formData);
      // Replace with actual API call: e.g., await fetch(`/api/branches`, { method: "POST", body: JSON.stringify(formData) });
      alert("Branch added successfully! (Simulated)");
    } catch (err) {
      setError("Failed to add branch. Please try again.");
    } finally {
      setLoading(false);
    }
  };

   return (
    <div className="font-sans min-h-screen bg-gray-50">
      <header className="w-full bg-primary-600 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-center">Add New Branch</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-primary-600 mb-6">Add Branch for {departmentId}</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branch Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                  <input
                    type="number"
                    name="geoCoordinates.lat"
                    value={formData.geoCoordinates.lat}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    step="0.0001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                  <input
                    type="number"
                    name="geoCoordinates.lng"
                    value={formData.geoCoordinates.lng}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    step="0.0001"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    min="0"
                    required
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-md font-medium text-gray-700">Working Hours</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {formData.workingHours.map((hour, index) => (
                  <div
                    key={hour.day}
                    className="bg-gray-50 p-4 rounded-md shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 capitalize">{hour.day}</span>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name={`workingHours[${index}].isClosed`}
                          checked={hour.isClosed}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-600">Closed</span>
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="time"
                        name={`workingHours[${index}].openingTime`}
                        value={hour.openingTime}
                        onChange={handleChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:text-gray-400"
                        disabled={hour.isClosed}
                      />
                      <span className="text-sm text-gray-500">to</span>
                      <input
                        type="time"
                        name={`workingHours[${index}].closingTime`}
                        value={hour.closingTime}
                        onChange={handleChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:text-gray-400"
                        disabled={hour.isClosed}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="pt-2">
              <Button variant="primary" size="md" type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? "Adding..." : "Add Branch"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}