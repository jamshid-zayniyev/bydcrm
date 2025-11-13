import { useState, useEffect } from "react";
import { getWeekStatistics, Week } from "../api/weekStatistics";

export const useWeekStatistics = () => {
  const [weekStatistics, setWeekStatistics] = useState<Week[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeekStatistics();
      setWeekStatistics(data);
    } catch (err) {
      setError("Mashinalarni yuklab boʻlmadi");
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const refetch = () => {
    fetchCars();
  };

  return {
    weekStatistics,
    loading,
    error,
    refetch,
  };
};
