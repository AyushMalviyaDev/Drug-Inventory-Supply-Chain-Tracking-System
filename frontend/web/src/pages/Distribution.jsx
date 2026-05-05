import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Distribution() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("inventory/dashboard/distributor/");
      setData(res.data);
    };
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Distribution</h1>

      <p>Incoming Requests: {data.incoming_requests}</p>
      <p>Pending Incoming: {data.pending_incoming}</p>
      <p>Approved Incoming: {data.approved_incoming}</p>
      <p>Outgoing Requests: {data.outgoing_requests}</p>
      <p>Total Stock: {data.total_stock}</p>
    </div>
  );
}