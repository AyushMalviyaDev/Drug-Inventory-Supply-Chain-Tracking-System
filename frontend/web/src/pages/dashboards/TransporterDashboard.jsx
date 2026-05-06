import React, { useEffect, useState } from "react";
import { getTransporterDashboard } from "../../api/dashboard";

export default function TransporterDashboard() {
  const [data, setData] = useState(null);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const res = await getTransporterDashboard();
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      await fetch(`http://127.0.0.1:8000/api/inventory/shipment/${id}/update-status/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access')}`
        },
        body: JSON.stringify({ status })
      });
      fetchData(); // refresh
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setUpdating(null);
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transporter Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card title="Total Shipments" value={data.total_shipments} />
        <Card title="Pending Shipments" value={data.pending_shipments} />
        <Card title="In Transit" value={data.in_transit_shipments} />
        <Card title="Delivered" value={data.delivered_shipments} />
      </div>
      <h2 className="text-xl font-semibold mb-2">Shipments</h2>
      <div className="space-y-2">
        {data.shipments.map((s) => (
          <div key={s.id} className="bg-white p-4 shadow rounded">
            <p>Tracking: {s.tracking_number}</p>
            <p>Drug: {s.drug}</p>
            <p>Quantity: {s.quantity}</p>
            <p>From: {s.from_user}</p>
            <p>To: {s.to_user}</p>
            <p>Status: {s.status}</p>
            <p>Shipped: {s.shipped_at}</p>
            <p>Delivered: {s.delivered_at || "N/A"}</p>
            {s.status === 'PENDING' && (
              <button
                onClick={() => updateStatus(s.id, 'IN_TRANSIT')}
                disabled={updating === s.id}
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
              >
                {updating === s.id ? 'Updating...' : 'Start Transit'}
              </button>
            )}
            {s.status === 'IN_TRANSIT' && (
              <button
                onClick={() => updateStatus(s.id, 'DELIVERED')}
                disabled={updating === s.id}
                className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
              >
                {updating === s.id ? 'Updating...' : 'Mark Delivered'}
              </button>
            )}
          </div>
        ))}
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