import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCampaigns } from "../context/CampaignContext";
import { useToast } from "../context/ToastContext";
import { bannerOptions, platformOptions, ageGroupOptions } from "../data/mockCampaigns";

function CampaignCreate() {
  const { addCampaign } = useCampaigns();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [platform, setPlatform] = useState(platformOptions[0]);
  const [audience, setAudience] = useState(ageGroupOptions[0]);
  const [budget, setBudget] = useState("");
  const [banner, setBanner] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Campaign name is required");
      return;
    }
    if (!budget || Number(budget) <= 0) {
      setError("Budget must be greater than ₹0");
      return;
    }
    if (Number(budget) > 9999999) {
      setError("Budget cannot be more than ₹9999999");
      return;
    }
    if (!banner) {
      setError("Please select a banner picture");
      return;
    }

    addCampaign({
      name,
      platform,
      audience,
      budget: Number(budget),
      banner,
    });

    showToast("Campaign created successfully");
    navigate("/campaigns");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Create Campaign</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 flex flex-col gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Campaign Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {platformOptions.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Target Age Group</label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {ageGroupOptions.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Budget (₹)</label>
          <input
            type="number"
            min="1"
            max="9999999"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">Select a Banner Picture</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {bannerOptions.map((img) => (
              <img
                key={img}
                src={img}
                alt="banner option"
                onClick={() => setBanner(img)}
                className={
                  banner === img
                    ? "rounded cursor-pointer border-4 border-blue-600"
                    : "rounded cursor-pointer border-4 border-transparent"
                }
              />
            ))}
          </div>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white py-2 rounded"
        >
          Save Campaign
        </button>
      </form>
    </div>
  );
}

export default CampaignCreate;
