import { useCampaigns } from "../context/CampaignContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const { campaigns } = useCampaigns();

  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter((c) => c.status === "Active").length;
  const totalBudget = campaigns.reduce((sum, c) => sum + Number(c.budget), 0);

  const topActiveCampaigns = campaigns
    .filter((c) => c.status === "Active")
    .sort((a, b) => b.budget - a.budget)
    .slice(0, 5);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-gray-500 text-sm">Total Campaigns</p>
          <p className="text-3xl font-bold text-blue-700">{totalCampaigns}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-gray-500 text-sm">Active Campaigns</p>
          <p className="text-3xl font-bold text-blue-700">{activeCampaigns}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-gray-500 text-sm">Total Budget Allocated</p>
          <p className="text-3xl font-bold text-blue-700">₹{totalBudget}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Top 5 Active Campaigns by Budget
        </h2>
        {topActiveCampaigns.length === 0 ? (
          <p className="text-gray-400 text-sm">No active campaigns yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topActiveCampaigns}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="budget" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
