import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const linkClass = ({ isActive }) =>
  isActive
    ? "bg-blue-700 text-white px-3 py-2 rounded whitespace-nowrap"
    : "text-gray-700 hover:bg-blue-50 hover:text-blue-700 px-3 py-2 rounded whitespace-nowrap";

function Sidebar() {
  const { user } = useAuth();
  const canManageCampaigns = useCallback(() => {
    return user.role === "Admin" || user.role === "Super Admin";
  }, [user]);

  return (
    <aside className="bg-white shadow flex flex-row md:flex-col gap-1 p-2 md:w-48 md:min-h-[calc(100vh-56px)] overflow-x-auto">
      <NavLink to="/dashboard" className={linkClass}>
        Dashboard
      </NavLink>
      <NavLink to="/campaigns" end className={linkClass}>
        Campaigns
      </NavLink>
      {canManageCampaigns() && (
        <NavLink to="/campaigns/new" className={linkClass}>
          Create Campaign
        </NavLink>
      )}
    </aside>
  );
}

export default Sidebar;
