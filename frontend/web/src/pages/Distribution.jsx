import React, { useState } from "react";

export default function Distribution() {
  const [selectedRequest, setSelectedRequest] = useState("");
  const [selectedTransporter, setSelectedTransporter] = useState("");

  // Static Approved Requests
  const approvedRequests = [
    {
      id: 1,
      drug: "Paracetamol",
      quantity: 100,
      hospital: "City Hospital",
    },
    {
      id: 2,
      drug: "Amoxicillin",
      quantity: 50,
      hospital: "Apollo Clinic",
    },
    {
      id: 3,
      drug: "Vitamin C",
      quantity: 75,
      hospital: "Sunrise Medical",
    },
  ];

  // Static Transporters
  const transporters = [
    {
      id: 1,
      name: "Blue Dart Logistics",
    },
    {
      id: 2,
      name: "SafeMed Transport",
    },
    {
      id: 3,
      name: "QuickShip Pharma",
    },
  ];

  const createShipment = () => {
    if (!selectedRequest || !selectedTransporter) {
      alert("Please select request and transporter");
      return;
    }

    const trackingId =
      "TRK-" + Math.floor(Math.random() * 1000000);

    alert(`Shipment Created Successfully!\nTracking ID: ${trackingId}`);

    setSelectedRequest("");
    setSelectedTransporter("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Distribution Management
      </h1>

      {/* Shipment Form */}
      <div className="bg-white shadow-sm rounded-2xl p-6 border max-w-2xl">
        <h2 className="text-lg font-semibold mb-5">
          Create Shipment
        </h2>

        {/* Request Dropdown */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            Approved Request
          </label>

          <select
            value={selectedRequest}
            onChange={(e) => setSelectedRequest(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black bg-white"
          >
            <option value="">Select Approved Request</option>

            {approvedRequests.map((r) => (
              <option key={r.id} value={r.id}>
                {r.drug} - {r.quantity} units ({r.hospital})
              </option>
            ))}
          </select>
        </div>

        {/* Transporter Dropdown */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Transporter
          </label>

          <select
            value={selectedTransporter}
            onChange={(e) => setSelectedTransporter(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black bg-white"
          >
            <option value="">Select Transporter</option>

            {transporters.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Button */}
        <button
          onClick={createShipment}
          className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition cursor-pointer"
        >
          Create Shipment
        </button>
      </div>

      {/* Approved Requests Preview */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">
          Approved Requests
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {approvedRequests.map((r) => (
            <div
              key={r.id}
              className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold">
                  {r.drug}
                </h3>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  APPROVED
                </span>
              </div>

              <p className="text-gray-600 mb-2">
                Quantity:{" "}
                <span className="font-semibold text-black">
                  {r.quantity}
                </span>
              </p>

              <p className="text-gray-600">
                Hospital:{" "}
                <span className="font-medium text-black">
                  {r.hospital}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}