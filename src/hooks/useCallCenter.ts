import { useState, useEffect } from "react";
import {
  CallCenter,
  CallStatistics,
  getCallCenter,
  getCallStatistics,
} from "../api/callCenter";

export const useCallCenter = () => {
  const [callCenter, setCallCenter] = useState<CallCenter[]>([]);
  const [callStatistics, setCallStatistics] = useState<CallStatistics>({
    general_calls: 0,
    average_duration: "",
    positives: 0,
    average_ai_score: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCallCenter = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCallCenter();
      setCallCenter(data);
    } catch (err) {
      setError("Mashinalarni yuklab boʻlmadi");
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCallStatistics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCallStatistics();
      setCallStatistics(data);
    } catch (err) {
      setError("Mashinalarni yuklab boʻlmadi");
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCallCenter();
    fetchCallStatistics();
  }, []);

  const refetch = () => {
    fetchCallCenter();
  };

  return {
    callCenter,
    callStatistics,
    loading,
    error,
    refetch,
  };
};
