import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Orders() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("inventory/drug-request/");
      setRequests(res.data);

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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Orders / Requests</h1>

      {/* Empty state */}
      {requests.length === 0 ? (
        <div className="text-gray-500">No requests found</div>
      ) : (
        <div className="space-y-3">
          {requests.map((r) => (
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

              {r.status === "PENDING" && (
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