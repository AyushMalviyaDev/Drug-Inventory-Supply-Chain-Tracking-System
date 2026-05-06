import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Distribution() {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [transporters, setTransporters] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState("");
  const [selectedTransporter, setSelectedTransporter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // Fetch approved incoming requests
      const res = await api.get("inventory/orders/");
      setApprovedRequests(res.data.filter(r => r.status === "APPROVED"));
      // Assume transporters are fetched somehow, placeholder
      setTransporters([{ id: 1, name: "Transporter 1" }]);
    };
    fetchData();
  }, []);

  const createShipment = async () => {
    try {
      const res = await api.post("inventory/shipments/", {
        drug_request: selectedRequest,
        transporter: selectedTransporter
      });
      alert(`Shipment created! Tracking: ${res.data.tracking_number}`);
      setSelectedRequest("");
      setSelectedTransporter("");
    } catch (err) {
      alert("Failed to create shipment: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Distribution</h1>

      <h2 className="text-lg font-semibold mb-2">Create Shipment</h2>
      <select value={selectedRequest} onChange={e => setSelectedRequest(e.target.value)}>
        <option value="">Select Approved Request</option>
        {approvedRequests.map(r => (
          <option key={r.id} value={r.id}>{r.drug} - {r.quantity}</option>
        ))}
      </select>
      <select value={selectedTransporter} onChange={e => setSelectedTransporter(e.target.value)}>
        <option value="">Select Transporter</option>
        {transporters.map(t => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>
      <button onClick={createShipment} className="ml-4 bg-blue-500 text-white px-4 py-2 rounded">
        Create Shipment
      </button>
    </div>
  );
}