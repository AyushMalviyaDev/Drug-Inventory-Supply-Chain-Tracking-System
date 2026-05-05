import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Inventory() {
  const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("inventory/drugs/");
      setDrugs(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Inventory</h1>

      {drugs.map((d) => (
        <div key={d.id} className="border p-3 mt-2 rounded">
          <p>Name: {d.name}</p>
          <p>Quantity: {d.quantity}</p>
          <p>Expiry: {d.expiry_date}</p>
        </div>
      ))}
    </div>
  );
}