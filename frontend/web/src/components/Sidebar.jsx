import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Package,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Orders", icon: FileText, path: "/orders" },
    { name: "Market Distribution", icon: BarChart3, path: "/distribution" },
    { name: "Inventory", icon: Package, path: "/inventory" },
    { name: "Reports & Analytics", icon: BarChart3, path: "/reports" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div
      className={`h-screen bg-white text-black border-r border-gray-200
      flex flex-col justify-between
      transition-all duration-300 ease-in-out
      ${isCollapsed ? "w-20" : "w-72"}`}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between p-5">
          {!isCollapsed && (
            <Link to="/dashboard">
              <div className="text-xl font-semibold tracking-tight text-black">
                DIASCTS
              </div>
            </Link>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-600 hover:text-black"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group relative flex items-center gap-4 px-4 py-3 rounded-xl
                   transition-all duration-200
                   ${
                     isActive
                       ? "bg-gray-100 text-black"
                       : "text-gray-500 hover:bg-gray-100 hover:text-black"
                   }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={20}
                      className={`transition ${
                        isActive
                          ? "text-black"
                          : "text-gray-500 group-hover:text-black"
                      }`}
                    />

                    {!isCollapsed && (
                      <span className="text-sm font-medium">
                        {item.name}
                      </span>
                    )}

                    {isCollapsed && (
                      <span className="absolute left-16 bg-white text-black text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap border border-gray-200 shadow-sm">
                        {item.name}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="mb-6 px-3 space-y-2">
        {[
          {
            name: "Contact & Help",
            icon: HelpCircle,
            onClick: () => window.location.href = "/contact",
          },
          {
            name: "Logout",
            icon: LogOut,
            onClick: () => {
              localStorage.clear();
              window.location.href = "/login";
            },
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              onClick={item.onClick}
              className="group relative flex items-center gap-4 px-4 py-3 rounded-xl
                         text-gray-500 hover:bg-gray-100 hover:text-black transition w-full text-left"
            >
              <Icon
                size={20}
                className="text-gray-500 group-hover:text-black transition"
              />

              {!isCollapsed && (
                <span className="text-sm font-medium">
                  {item.name}
                </span>
              )}

              {isCollapsed && (
                <span className="absolute left-16 bg-white text-black text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap border border-gray-200 shadow-sm">
                  {item.name}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}