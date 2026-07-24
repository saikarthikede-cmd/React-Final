import { useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCampaigns } from "../context/CampaignContext";

function CampaignDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { campaigns, toggleStatus } = useCampaigns();

  const campaign = campaigns.find((c) => String(c.id) === id);

  const canToggleStatus = useCallback(() => {
    return user.role === "Admin" || user.role === "Super Admin";
  }, [user]);

  if (!campaign) {
    return (
      <div className="p-4 max-w-2xl mx-auto">
        <p className="text-gray-500">Campaign not found.</p>
        <Link to="/campaigns" className="text-blue-700 hover:underline">
          Back to campaigns
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Link to="/campaigns" className="text-blue-700 hover:underline text-sm">
        &larr; Back to campaigns
      </Link>

      <div className="bg-white shadow rounded-lg overflow-hidden mt-3">
        <img src={campaign.banner} alt={campaign.name} className="w-full h-48 object-cover" />

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-blue-700">{campaign.name}</h1>
            <span
              className={
                campaign.status === "Active"
                  ? "bg-green-100 text-green-700 px-3 py-1 rounded text-sm"
                  : "bg-gray-200 text-gray-600 px-3 py-1 rounded text-sm"
              }
            >
              {campaign.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-gray-500">Platform</p>
              <p className="font-semibold">{campaign.platform}</p>
            </div>
            <div>
              <p className="text-gray-500">Target Age Group</p>
              <p className="font-semibold">{campaign.audience}</p>
            </div>
            <div>
              <p className="text-gray-500">Budget</p>
              <p className="font-semibold">₹{campaign.budget}</p>
            </div>
          </div>

          {canToggleStatus() && (
            <button
              onClick={() => toggleStatus(campaign.id)}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded text-sm"
            >
              {campaign.status === "Active" ? "Pause Campaign" : "Resume Campaign"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CampaignDetail;
