import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Orders() {
  const [outgoing, setOutgoing] = useState([]);
  const [incoming, setIncoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("outgoing");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [outRes, inRes] = await Promise.all([
        api.get("inventory/drug-request/"),
        api.get("inventory/orders/")
      ]);
      setOutgoing(outRes.data);
      setIncoming(inRes.data);

    } catch (err) {
      console.error(err);
      setError("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const approve = async (id) => {
    try {
      await api.post(`inventory/approve-request/${id}/`);
      fetchData(); // refresh after approval
    } catch (err) {
      console.error(err);
      alert("Failed to approve request");
    }
  };

  if (loading) {
    return <div className="p-6">Loading requests...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  const requests = tab === "outgoing" ? outgoing : incoming;
  const filteredRequests = requests.filter(r =>
    r.drug.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === "" || r.status === statusFilter)
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Orders / Requests</h1>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by drug..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 border rounded"
        />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 border rounded">
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
        </select>
      </div>

      <div className="mb-4">
        <button
          onClick={() => setTab("outgoing")}
          className={`px-4 py-2 ${tab === "outgoing" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Outgoing
        </button>
        <button
          onClick={() => setTab("incoming")}
          className={`px-4 py-2 ${tab === "incoming" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Incoming
        </button>
      </div>

      {/* Empty state */}
      {filteredRequests.length === 0 ? (
        <div className="text-gray-500">No {tab} requests found</div>
      ) : (
        <div className="space-y-3">
          {filteredRequests.map((r) => (
            <div
              key={r.id}
              className="border bg-white p-4 rounded-lg shadow-sm"
            >
              <p><b>Drug:</b> {r.drug}</p>
              <p><b>Qty:</b> {r.quantity}</p>
              <p>
                <b>Status:</b>{" "}
                <span
                  className={
                    r.status === "PENDING"
                      ? "text-yellow-500"
                      : r.status === "APPROVED"
                      ? "text-green-600"
                      : "text-gray-500"
                  }
                >
                  {r.status}
                </span>
              </p>

              {tab === "incoming" && r.status === "PENDING" && (
                <button
                  onClick={() => approve(r.id)}
                  className="mt-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}