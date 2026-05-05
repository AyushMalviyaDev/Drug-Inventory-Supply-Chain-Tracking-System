import React, { useEffect, useState } from "react";
import { api } from "../../api";

export default function DistributorDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("inventory/dashboard/distributor/");
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6 grid grid-cols-3 gap-4">

      <Card title="Incoming Requests" value={data.incoming_requests} />
      <Card title="Pending Incoming" value={data.pending_incoming} />
      <Card title="Approved Incoming" value={data.approved_incoming} />

      <Card title="Outgoing Requests" value={data.outgoing_requests} />
      <Card title="Pending Outgoing" value={data.pending_outgoing} />

      <Card title="Total Stock" value={data.total_stock} />

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow border">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}