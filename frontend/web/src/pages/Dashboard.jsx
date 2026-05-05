import React, { useEffect, useState } from "react";

export default function Dashboard() {
const [data, setData] = useState(null);
const role = localStorage.getItem("role"); // "pharmacy"/ change to MANUFACTURER / DISTRIBUTOR

  const roleMap = {
    manufacturer: "manufacturer",
    distributor: "distributor",
    pharmacy: "pharmacy",
  };

  const dashboardConfig = {
    pharmacy: [
      { key: "total_orders", label: "Total Orders" },
      { key: "pending_orders", label: "Pending Orders" },
      { key: "approved_orders", label: "Approved Orders" },
    ],
    manufacturer: [
      { key: "incoming_requests", label: "Incoming Requests" },
      { key: "pending_incoming", label: "Pending Incoming" },
      { key: "outgoing_requests", label: "Outgoing Requests" },
      { key: "total_stock", label: "Total Stock" },
    ],
    distributor: [
      { key: "total_drugs", label: "Total Drugs" },
      { key: "pending_requests", label: "Pending Requests" },
      { key: "approved_requests", label: "Approved Requests" },
      { key: "total_stock", label: "Total Stock" },
    ],
  };

  useEffect(() => {
    const apiRole = roleMap[role];

    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/inventory/dashboard/${apiRole}/`
        );

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboard();
  }, [role]);

  if (!data) return <div className="p-6">Loading dashboard...</div>;

  const apiRole = roleMap[role];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-6 capitalize">
        {apiRole} Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardConfig[apiRole].map((item) => (
          <div
            key={item.key}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
          >
            <p className="text-gray-500 text-sm">{item.label}</p>
            <h2 className="text-2xl font-bold mt-2">
              {data[item.key] ?? 0}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}