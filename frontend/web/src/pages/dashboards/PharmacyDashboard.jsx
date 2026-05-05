import React, { useEffect, useState } from "react";
import { api } from "../../api";

export default function PharmacyDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("inventory/dashboard/pharmacy/");
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6">

      <div className="grid grid-cols-3 gap-4">

        <Card title="Total Orders" value={data.total_orders} />
        <Card title="Pending Orders" value={data.pending_orders} />
        <Card title="Approved Orders" value={data.approved_orders} />

      </div>

      {/* Stock Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-3">Stock Inventory</h2>

        <div className="grid gap-3">
          {data.stock.map((item, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded shadow border flex justify-between"
            >
              <span>{item.drug}</span>
              <span className="font-bold">{item.quantity}</span>
            </div>
          ))}
        </div>
      </div>

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