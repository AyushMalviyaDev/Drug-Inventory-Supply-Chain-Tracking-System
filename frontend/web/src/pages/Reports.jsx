import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Reports() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("inventory/dashboard/manufacturer/");
      setData(res.data);
    };
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Reports</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}