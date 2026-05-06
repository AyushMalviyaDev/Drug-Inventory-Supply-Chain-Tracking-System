import React, { useEffect, useState } from "react";
import { api } from "../api";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

export default function Reports() {
  const [data, setData] = useState(null);

  const [trends, setTrends] = useState({ labels: [], data: [] });

  useEffect(() => {
    const fetchData = async () => {
      // Fetch various dashboards for aggregated data
      const [manuf, dist, pharm, trans, trendsRes] = await Promise.all([
        api.get("inventory/dashboard/manufacturer/"),
        api.get("inventory/dashboard/distributor/"),
        api.get("inventory/dashboard/pharmacy/"),
        api.get("inventory/dashboard/transporter/"),
        api.get("inventory/shipment-trends/")
      ]);
      setData({
        manufacturer: manuf.data,
        distributor: dist.data,
        pharmacy: pharm.data,
        transporter: trans.data
      });
      setTrends(trendsRes.data);
    };
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  const barData = {
    labels: ['Manufacturers', 'Distributors', 'Pharmacies', 'Transporters'],
    datasets: [
      {
        label: 'Total Stock/Requests',
        data: [
          data.manufacturer.total_stock || 0,
          data.distributor.total_stock || 0,
          data.pharmacy.stock?.length || 0,
          data.transporter.total_shipments || 0
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const lineData = {
    labels: trends.labels,
    datasets: [
      {
        label: 'Shipments Over Time',
        data: trends.data,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-2">Stock Levels</h2>
          <Bar data={barData} />
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-2">Shipment Trends</h2>
          <Line data={lineData} />
        </div>
      </div>

      <div className="mt-6 bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-2">Summary</h2>
        <p>Total Drugs Created: {data.manufacturer.total_drugs}</p>
        <p>Pending Requests: {data.manufacturer.pending_requests + data.distributor.pending_incoming}</p>
        <p>Active Shipments: {data.transporter.in_transit_shipments}</p>
      </div>
    </div>
  );
}