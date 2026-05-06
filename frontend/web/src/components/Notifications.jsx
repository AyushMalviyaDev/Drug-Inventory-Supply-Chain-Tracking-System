import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // check every minute
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("inventory/notifications/");
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {notifications.length > 0 && (
        <div className="bg-yellow-500 text-white p-3 rounded shadow max-w-sm">
          <p className="font-bold">Notifications ({notifications.length})</p>
          <ul className="mt-2 space-y-1">
            {notifications.slice(0, 5).map((n, i) => (
              <li key={i} className="text-sm">{n.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}