import React, { useEffect, useState } from "react";
import { getManufacturerDashboard } from "../../api/dashboard";
import CreateDrugForm from "../../components/CreateDrugForm";

export default function ManufacturerDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const res = await getManufacturerDashboard();
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manufacturer Dashboard</h1>
      <CreateDrugForm onCreated={fetchData} />
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card title="Total Drugs" value={data.total_drugs} />
        <Card title="Total Stock" value={data.total_stock} />
        <Card title="Pending Requests" value={data.pending_requests} />
        <Card title="Approved Requests" value={data.approved_requests} />
      </div>
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