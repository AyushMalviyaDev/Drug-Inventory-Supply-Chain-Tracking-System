import React, { useState } from "react";

export default function Orders() {
  const [tab, setTab] = useState("outgoing");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Static Data
  const outgoing = [
    {
      id: 1,
      drug: "Paracetamol",
      quantity: 50,
      status: "PENDING",
    },
    {
      id: 2,
      drug: "Amoxicillin",
      quantity: 20,
      status: "APPROVED",
    },
    {
      id: 3,
      drug: "Ibuprofen",
      quantity: 35,
      status: "PENDING",
    },
  ];

  const incoming = [
    {
      id: 4,
      drug: "Cetirizine",
      quantity: 40,
      status: "PENDING",
    },
    {
      id: 5,
      drug: "Azithromycin",
      quantity: 15,
      status: "APPROVED",
    },
    {
      id: 6,
      drug: "Vitamin C",
      quantity: 60,
      status: "PENDING",
    },
  ];

  const requests = tab === "outgoing" ? outgoing : incoming;

  const filteredRequests = requests.filter(
    (r) =>
      r.drug.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "" || r.status === statusFilter)
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Orders / Requests</h1>

      {/* Search + Filter */}
      <div className="mb-6 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by drug..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-black"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white outline-none"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setTab("outgoing")}
          className={`px-5 py-2 rounded-lg font-medium transition cursor-pointer ${
            tab === "outgoing"
              ? "bg-black text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Outgoing
        </button>

        <button
          onClick={() => setTab("incoming")}
          className={`px-5 py-2 rounded-lg font-medium transition cursor-pointer ${
            tab === "incoming"
              ? "bg-black text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Incoming
        </button>
      </div>

      {/* Cards */}
      {filteredRequests.length === 0 ? (
        <div className="text-gray-500 text-lg">
          No {tab} requests found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRequests.map((r) => (
            <div
              key={r.id}
              className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold">{r.drug}</h2>

                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    r.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {r.status}
                </span>
              </div>

              <p className="text-gray-600 mb-4">
                Quantity Requested:{" "}
                <span className="font-semibold text-black">
                  {r.quantity}
                </span>
              </p>

              {tab === "incoming" && r.status === "PENDING" && (
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
                  Approve Request
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}