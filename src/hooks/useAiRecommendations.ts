import { api } from "@/api/axios";
import {
  AiRecommendation,
  Effectiveness,
  getAiRecommendation,
} from "@/types/aiRecommendations";

import { useEffect, useState } from "react";

const useAiRecommendations = () => {
  const [aiRecommendation, setAiRecommendation] =
    useState<AiRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [getAiRecommendation, setGetAiRecommendation] = useState<
    getAiRecommendation[]
  >([]);
  const [effectiveness, setEffectiveness] = useState<Effectiveness>();
  // const [isActive, setIsActive] = useState<boolean>(false);

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

  const getAiRecommendations = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/ai/recommendations/");
      setGetAiRecommendation(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getAiEffectiveness = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/ai/effectiveness/");
      setEffectiveness(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(isActive);
  const activeRecommendation = async (id: number, isActive: boolean) => {
    let newObj = {
      is_accepted: isActive,
    };

    await api.put(`ai/recommendations/${id}/action/`, newObj);

    getAiRecommendations();
  };

  useEffect(() => {
    getAiDailyStats();
    getAiRecommendations();
    getAiEffectiveness();
  }, []);
  return {
    aiRecommendation,
    loading,
    getAiRecommendation,
    effectiveness,

    activeRecommendation,
  };
};

export default useAiRecommendations;
