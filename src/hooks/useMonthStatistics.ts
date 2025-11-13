import { useState, useEffect } from "react";
import { getMonthStatistics, Month } from "../api/monthStatistics";

export const useMonthStatistics = () => {
  const [monthStatistics, setMonthStatistics] = useState<Month[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMonthStatistics();
      setMonthStatistics(data);
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
    monthStatistics,
    loading,
    error,
    refetch,
  };
};
