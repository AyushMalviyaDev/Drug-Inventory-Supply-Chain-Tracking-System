import React, { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Inventory() {
  const { user } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user.role === "manufacturer") {
        // For manufacturer, fetch dashboard for total_stock
        const res = await api.get("inventory/dashboard/manufacturer/");
        setData([{ drug: "Total Stock", quantity: res.data.total_stock }]);
      } else if (user.role === "pharmacist") {
        // For pharmacy, fetch dashboard for stock
        const res = await api.get("inventory/dashboard/pharmacy/");
        setData(res.data.stock || []);
      } else if (user.role === "distributor") {
        // Distributor
        const res = await api.get("inventory/dashboard/distributor/");
        setData([{ drug: "Total Stock", quantity: res.data.total_stock }]);
      } else {
        setData([]);
      }
    };
    if (user) fetchData();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Inventory</h1>

      {data.length === 0 ? (
        <p>No inventory data available.</p>
      ) : (
        data.map((item, index) => (
          <div key={index} className="border p-3 mt-2 rounded">
            <p>Drug: {item.drug || item.name}</p>
            <p>Quantity: {item.quantity}</p>
            {item.expiry_date && <p>Expiry: {item.expiry_date}</p>}
          </div>
        ))
      )}
    </div>
  );
}