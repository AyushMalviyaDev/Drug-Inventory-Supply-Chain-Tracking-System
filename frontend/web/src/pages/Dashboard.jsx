import React from "react";
import { useAuth } from "../context/AuthContext";
import ManufacturerDashboard from "./dashboards/ManufacturerDashboard";
import DistributorDashboard from "./dashboards/DistributorDashboard";
import PharmacyDashboard from "./dashboards/PharmacyDashboard";
import TransporterDashboard from "./dashboards/TransporterDashboard";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-6 text-gray-600">Loading dashboard...</div>;
  if (!user) return <div>Please log in</div>;

  const role = user.role;

  if (role === "manufacturer") return <ManufacturerDashboard />;
  if (role === "distributor") return <DistributorDashboard />;
  if (role === "pharmacist") return <PharmacyDashboard />;
  if (role === "transporter") return <TransporterDashboard />;

  return <div>Unknown role</div>;
}