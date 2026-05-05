import React, { useEffect, useState } from "react";
import { getManufacturerDashboard } from "../../api/dashboard";

export default function ManufacturerDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getManufacturerDashboard()
      .then((res) => setData(res.data))
      .catch(console.error);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6 grid grid-cols-4 gap-4">
      <Card title="Total Drugs" value={data.total_drugs} />
      <Card title="Total Stock" value={data.total_stock} />
      <Card title="Pending Requests" value={data.pending_requests} />
      <Card title="Approved Requests" value={data.approved_requests} />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}