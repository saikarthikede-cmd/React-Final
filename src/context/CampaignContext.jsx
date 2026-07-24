import { createContext, useContext, useCallback, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { defaultCampaigns } from "../data/mockCampaigns";

const CampaignContext = createContext(null);

export function CampaignProvider({ children }) {
  const [campaigns, setCampaigns] = useLocalStorage("campaigns", []);

  // add the starting campaigns only once, ever - not a default that
  // comes back after a reset
  useEffect(() => {
    const alreadySeeded = localStorage.getItem("campaignsSeeded");
    if (!alreadySeeded) {
      setCampaigns(defaultCampaigns);
      localStorage.setItem("campaignsSeeded", "true");
    }
  }, []);

  const addCampaign = useCallback(
    (campaign) => {
      const newCampaign = { ...campaign, id: Date.now(), status: "Active" };
      setCampaigns((prev) => [...prev, newCampaign]);
    },
    [setCampaigns]
  );

  const toggleStatus = useCallback(
    (id) => {
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, status: c.status === "Active" ? "Paused" : "Active" }
            : c
        )
      );
    },
    [setCampaigns]
  );

  const deleteCampaign = useCallback(
    (id) => {
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
    },
    [setCampaigns]
  );

  const resetCampaigns = useCallback(() => {
    setCampaigns([]);
  }, [setCampaigns]);

  return (
    <CampaignContext.Provider
      value={{ campaigns, addCampaign, toggleStatus, deleteCampaign, resetCampaigns }}
    >
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaigns() {
  return useContext(CampaignContext);
}
