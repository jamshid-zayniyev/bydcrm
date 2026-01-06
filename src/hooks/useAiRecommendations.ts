import { api } from "@/api/axios";
import { AiRecommendation } from "@/types/aiRecommendations";
import { useEffect, useState } from "react";

const useAiRecommendations = () => {
  const [aiRecommendation, setAiRecommendation] =
    useState<AiRecommendation | null>(null);
  const [loading, setLoading] = useState(false);

  const getAiDailyStats = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/ai/ai-daily-stats/");
      setAiRecommendation(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAiDailyStats();
  }, []);
  return {
    aiRecommendation,
    loading,
  };
};

export default useAiRecommendations;
