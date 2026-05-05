import { api } from "../api";

export const getManufacturerDashboard = () =>
  api.get("inventory/dashboard/manufacturer/");

export const getDistributorDashboard = () =>
  api.get("inventory/dashboard/distributor/");

export const getPharmacyDashboard = () =>
  api.get("inventory/dashboard/pharmacy/");