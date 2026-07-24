import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCampaigns } from "../context/CampaignContext";
import { useToast } from "../context/ToastContext";

function CampaignList() {
  const { user } = useAuth();
  const { campaigns, toggleStatus, deleteCampaign, resetCampaigns } = useCampaigns();
  const { showToast } = useToast();

  const canToggleStatus = useCallback(() => {
    return user.role === "Admin" || user.role === "Super Admin";
  }, [user]);

  const canDelete = useCallback(() => {
    return user.role === "Super Admin";
  }, [user]);

  const canCreate = useCallback(() => {
    return user.role === "Admin" || user.role === "Super Admin";
  }, [user]);

  const handleDelete = (id) => {
    deleteCampaign(id);
    showToast("Campaign deleted");
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h1 className="text-2xl font-bold text-blue-700">Campaigns</h1>
        <div className="flex gap-2">
          {canCreate() && (
            <Link
              to="/campaigns/new"
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded text-sm"
            >
              + Create Campaign
            </Link>
          )}
          {user.role === "Super Admin" && (
            <button
              onClick={() => {
                if (window.confirm("This will delete all campaigns. Continue?")) {
                  resetCampaigns();
                }
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-blue-50 text-left text-gray-600">
              <th className="p-3">Banner</th>
              <th className="p-3">Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Platform</th>
              <th className="p-3">Audience</th>
              <th className="p-3">Budget</th>
              {canToggleStatus() && <th className="p-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="border-t border-gray-100">
                <td className="p-3">
                  <img
                    src={campaign.banner}
                    alt={campaign.name}
                    className="w-16 h-10 object-cover rounded"
                  />
                </td>
                <td className="p-3">
                  <Link
                    to={`/campaigns/${campaign.id}`}
                    className="text-blue-700 hover:underline"
                  >
                    {campaign.name}
                  </Link>
                </td>
                <td className="p-3">
                  <span
                    className={
                      campaign.status === "Active"
                        ? "bg-green-100 text-green-700 px-2 py-1 rounded text-xs"
                        : "bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs"
                    }
                  >
                    {campaign.status}
                  </span>
                </td>
                <td className="p-3">{campaign.platform}</td>
                <td className="p-3">{campaign.audience}</td>
                <td className="p-3">₹{campaign.budget}</td>
                {canToggleStatus() && (
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleStatus(campaign.id)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded text-xs"
                      >
                        {campaign.status === "Active" ? "Pause" : "Resume"}
                      </button>
                      {canDelete() && (
                        <button
                          onClick={() => handleDelete(campaign.id)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded text-xs"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {campaigns.length === 0 && (
          <p className="text-gray-400 text-sm p-4 text-center">No campaigns yet.</p>
        )}
      </div>
    </div>
  );
}

export default CampaignList;
