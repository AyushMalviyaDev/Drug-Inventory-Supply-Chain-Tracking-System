import Sidebar from "../components/Sidebar";
import Notifications from "../components/Notifications";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../components/Loader";

export default function MainLayout() {
  return (
    <div className="h-screen flex bg-[#F8FAFC] text-[#111827]">
      
      <Sidebar />

      {/* Only this scrolls */}
      <main className="flex-1 overflow-y-auto">
        
          <Outlet />
      
      </main>

      <Notifications />
    </div>
  );
}