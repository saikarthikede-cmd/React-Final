import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();
  const canManageCampaigns = useCallback(() => {
    return user.role === "Admin" || user.role === "Super Admin";
  }, [user]);

  return (
    <aside className="bg-white shadow flex flex-row md:flex-col gap-1 p-2 md:w-48 md:min-h-[calc(100vh-56px)] overflow-x-auto">
      <Link
        to="/dashboard"
        className="text-gray-700 hover:bg-blue-50 hover:text-blue-700 px-3 py-2 rounded whitespace-nowrap"
      >
        Dashboard
      </Link>
      <Link
        to="/campaigns"
        className="text-gray-700 hover:bg-blue-50 hover:text-blue-700 px-3 py-2 rounded whitespace-nowrap"
      >
        Campaigns
      </Link>
      {canManageCampaigns() && (
        <Link
          to="/campaigns/new"
          className="text-gray-700 hover:bg-blue-50 hover:text-blue-700 px-3 py-2 rounded whitespace-nowrap"
        >
          Create Campaign
        </Link>
      )}
    </aside>
  );
}

export default Sidebar;
